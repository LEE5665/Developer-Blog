import { publishUserEvents } from "@/lib/realtime";
﻿import { auth } from "@/lib/auth";
import { PostError, consumeDraft, mediaTransaction, postFailure, refreshOrphans, setPostImages, validatePost } from "@/lib/post-service";

type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, { params }: Context) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const userId = session.user.id;
  const { id } = await params;
  try {
    const body = await request.json();
    const post = await mediaTransaction(async (tx) => {
      const current = await tx.post.findFirst({ where: { id, authorId: userId } });
      if (!current) throw new PostError("글을 찾을 수 없습니다.", 404);
      if (body.updatedAt !== current.updatedAt.toISOString()) throw new PostError("다른 창에서 글이 수정되었습니다. 새로고침 후 확인해주세요.", 409);
      const { data, names } = await validatePost(tx, body, userId);
      await consumeDraft(tx, userId, id, body.draftVersion);
      const post = await tx.post.update({ where: { id }, data });
      await setPostImages(tx, id, names);
      await refreshOrphans(tx);
      return post;
    });
    return Response.json({ post });
  } catch (error) { return postFailure(error); }
}
export async function DELETE(_request: Request, { params }: Context) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const { id } = await params;
  try {
    await mediaTransaction(async (tx) => {
      const post = await tx.post.findFirst({ where: { id, authorId: session.user!.id } });
      if (!post) throw new PostError("글을 찾을 수 없습니다.", 404);
      await tx.post.delete({ where: { id } });
      await refreshOrphans(tx);
    });
    await publishUserEvents([session.user.id], { type: "notifications" });
    return Response.json({ success: true });
  } catch (error) { return postFailure(error); }
}
