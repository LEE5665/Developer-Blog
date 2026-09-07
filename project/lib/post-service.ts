import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { imageOwner, IMAGE_NAME_PATTERN } from "./image-storage";
import { MAX_CONTENT_LENGTH, RICH_CONTENT_PREFIX, hasDocumentContent, imageSources, readDocument, serializeDocument } from "./post-content";

export class PostError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
export type Transaction = Prisma.TransactionClient;

// Serialize changes to image references and deletion, including across server instances.
export async function mediaTransaction<T>(fn: (tx: Transaction) => Promise<T>) {
  return prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(74209136)`;
    return fn(tx);
  }, { maxWait: 15000, timeout: 30000 });
}

export async function ensureImages(tx: Transaction, content: string, userId: string) {
  const doc = readDocument(content);
  const names = [...new Set((doc ? imageSources(doc) : []).filter((src) => src.startsWith("/api/images/")).map((src) => src.slice(12)))];
  for (const name of names) {
    if (!IMAGE_NAME_PATTERN.test(name) || await imageOwner(name) !== userId) throw new PostError("직접 업로드한 이미지를 사용해주세요. 삭제된 이미지는 다시 삽입해주세요.");
    await tx.imageAsset.upsert({ where: { name }, create: { name, ownerId: userId }, update: {} });
  }
  return names;
}

export async function refreshOrphans(tx: Transaction) {
  await tx.imageAsset.updateMany({ where: { orphanedAt: null, posts: { none: {} }, drafts: { none: {} } }, data: { orphanedAt: new Date() } });
  await tx.imageAsset.updateMany({ where: { orphanedAt: { not: null }, OR: [{ posts: { some: {} } }, { drafts: { some: {} } }] }, data: { orphanedAt: null } });
}

export async function setPostImages(tx: Transaction, postId: string, names: string[]) {
  await tx.postImage.deleteMany({ where: { postId } });
  if (names.length) await tx.postImage.createMany({ data: names.map((name) => ({ postId, name })) });
}
export async function setDraftImages(tx: Transaction, draftId: string, names: string[]) {
  await tx.draftImage.deleteMany({ where: { draftId } });
  if (names.length) await tx.draftImage.createMany({ data: names.map((name) => ({ draftId, name })) });
}

export async function validatePost(tx: Transaction, input: Record<string, unknown>, userId: string, draft = false) {
  const title = typeof input.title === "string" ? input.title.trim() : "";
  let content = typeof input.content === "string" ? input.content.trim() : "";
  if ((!draft && !title) || !content || title.length > 200 || content.length > MAX_CONTENT_LENGTH) throw new PostError("제목과 본문을 확인해주세요. 제목은 200자까지 입력할 수 있습니다.");
  if (content.startsWith(RICH_CONTENT_PREFIX)) {
    const doc = readDocument(content);
    if (!doc || (!draft && !hasDocumentContent(doc))) throw new PostError("본문을 입력하거나 이미지를 추가해주세요.");
    try { content = serializeDocument(doc); } catch { throw new PostError("이미지는 파일 업로드 또는 URL로 삽입해주세요."); }
  }
  const categoryId = input.categoryId && input.categoryId !== "none" ? input.categoryId : null;
  if (categoryId !== null && (typeof categoryId !== "string" || !await tx.category.findFirst({ where: { id: categoryId, userId, isDivider: false } }))) throw new PostError("카테고리가 삭제되었거나 사용할 수 없습니다. 다시 선택해주세요.");
  const visibility = input.visibility;
  if (visibility !== "PUBLIC" && visibility !== "FRIENDS" && visibility !== "PRIVATE") throw new PostError("공개 범위를 확인해주세요.");
  const names = await ensureImages(tx, content, userId);
  return { data: { title, content, categoryId: categoryId as string | null, visibility: visibility as "PUBLIC" | "FRIENDS" | "PRIVATE" }, names };
}

export async function consumeDraft(tx: Transaction, userId: string, key: string, version: unknown) {
  const draft = await tx.postDraft.findUnique({ where: { userId_key: { userId, key } } });
  if (!draft) {
    if (version !== undefined && version !== null) throw new PostError("임시 글이 다른 창에서 삭제되거나 발행되었습니다. 새로고침 후 확인해주세요.", 409);
    return;
  }
  if (version !== draft.version) throw new PostError("다른 창에서 임시 글이 변경되었습니다. 새로고침 후 확인해주세요.", 409);
  await tx.postDraft.delete({ where: { id: draft.id } });
}

export function postFailure(error: unknown) {
  if (error instanceof PostError) return Response.json({ error: error.message }, { status: error.status });
  if (error instanceof SyntaxError) return Response.json({ error: "요청 형식을 확인해주세요." }, { status: 400 });
  console.error("글 처리 오류:", error);
  return Response.json({ error: "요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
}
