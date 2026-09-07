import { imageOwner, storedImages, removeImage } from "./image-storage";
import { imageSources, readDocument } from "./post-content";
import { mediaTransaction, refreshOrphans, setDraftImages, setPostImages } from "./post-service";

const GRACE_MS = 24 * 60 * 60 * 1000;

export async function cleanupImages() {
  return mediaTransaction(async (tx) => {
    // Import files created before the registry existed. Start their grace period now.
    for (const name of await storedImages()) {
      if (await tx.imageAsset.findUnique({ where: { name }, select: { name: true } })) continue;
      const ownerId = await imageOwner(name);
      if (ownerId && await tx.user.findUnique({ where: { id: ownerId }, select: { id: true } })) {
        await tx.imageAsset.create({ data: { name, ownerId } });
      }
    }
    // Reconcile legacy content and category cascades before any deletion.
    const assets = new Map((await tx.imageAsset.findMany({ select: { name: true, ownerId: true } })).map((asset) => [asset.name, asset.ownerId]));
    const namesFor = (content: string, owner: string) => {
      const doc = readDocument(content);
      return [...new Set((doc ? imageSources(doc) : []).filter((url) => url.startsWith("/api/images/")).map((url) => url.slice(12)).filter((name) => assets.get(name) === owner))];
    };
    for (const post of await tx.post.findMany({ select: { id: true, authorId: true, content: true } })) await setPostImages(tx, post.id, namesFor(post.content, post.authorId));
    for (const draft of await tx.postDraft.findMany({ select: { id: true, userId: true, content: true } })) await setDraftImages(tx, draft.id, namesFor(draft.content, draft.userId));
    await refreshOrphans(tx);
    const unused = await tx.imageAsset.findMany({ where: { orphanedAt: { lte: new Date(Date.now() - GRACE_MS) }, posts: { none: {} }, drafts: { none: {} } }, take: 100 });
    let deleted = 0;
    for (const asset of unused) {
      await removeImage(asset.name);
      await tx.imageAsset.delete({ where: { name: asset.name } });
      deleted += 1;
    }
    return { deleted };
  });
}

export function startImageCleanup() {
  const state = globalThis as typeof globalThis & { imageCleanupTimer?: ReturnType<typeof setInterval> };
  if (state.imageCleanupTimer) return;
  let running = false;
  const run = async () => {
    if (running) return;
    running = true;
    try { await cleanupImages(); } catch (error) { console.error("이미지 정리 실패:", error); }
    finally { running = false; }
  };
  setTimeout(() => void run(), 60000).unref();
  state.imageCleanupTimer = setInterval(() => void run(), 60 * 60 * 1000);
  state.imageCleanupTimer.unref();
}
