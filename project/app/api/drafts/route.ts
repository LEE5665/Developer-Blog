import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PostError, mediaTransaction, postFailure, refreshOrphans, setDraftImages, validatePost } from "@/lib/post-service";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const key = new URL(request.url).searchParams.get("key") || "new";
  const draft = await prisma.postDraft.findUnique({ where: { userId_key: { userId: session.user.id, key } } });
  return Response.json({ draft }, { headers: { "Cache-Control": "private, no-store" } });
}
export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const userId = session.user.id;
  try {
    const body = await request.json();
    const key = typeof body.key === "string" ? body.key : "new";
    const draft = await mediaTransaction(async (tx) => {
      if (key !== "new" && !await tx.post.findFirst({ where: { id: key, authorId: userId } })) throw new PostError("수정할 글을 찾을 수 없습니다.", 404);
      const existing = await tx.postDraft.findUnique({ where: { userId_key: { userId, key } } });
      if ((existing?.version ?? null) !== (body.version ?? null)) throw new PostError("다른 창에서 임시 글이 변경되었습니다. 새로고침 후 이어서 작성해주세요.", 409);
      const { data, names } = await validatePost(tx, body, userId, true);
      const draft = existing ? await tx.postDraft.update({ where: { id: existing.id }, data: { ...data, version: { increment: 1 } } }) : await tx.postDraft.create({ data: { ...data, userId, key, postId: key === "new" ? null : key } });
      await setDraftImages(tx, draft.id, names);
      await refreshOrphans(tx);
      return draft;
    });
    return Response.json({ draft });
  } catch (error) { return postFailure(error); }
}
export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const userId = session.user.id;
  try {
    const body = await request.json();
    await mediaTransaction(async (tx) => {
      const draft = await tx.postDraft.findUnique({ where: { userId_key: { userId, key: body.key || "new" } } });
      if (draft && body.version !== draft.version) throw new PostError("다른 창에서 임시 글이 변경되었습니다. 새로고침 후 확인해주세요.", 409);
      if (draft) await tx.postDraft.delete({ where: { id: draft.id } });
      await refreshOrphans(tx);
    });
    return Response.json({ success: true });
  } catch (error) { return postFailure(error); }
}
