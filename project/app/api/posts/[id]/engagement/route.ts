import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { readablePost } from "@/lib/engagement";
import { PostError, postFailure } from "@/lib/post-service";
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    let userId: string | undefined;
    try {
      userId = (await auth())?.user?.id;
    } catch {
      userId = undefined;
    }
    const post = await readablePost(id, userId);
    const cursor = new URL(request.url).searchParams.get("cursor");
    const cursorComment = cursor ? await prisma.comment.findFirst({ where: { id: cursor, postId: id }, select: { id: true } }) : null;
    if (cursor && !cursorComment) throw new PostError("댓글 목록이 변경되었습니다. 새로고침해주세요.", 400);
    const [likes, liked, views, totalComments, rows] = await Promise.all([
      prisma.postLike.count({ where: { postId: id } }),
      userId ? prisma.postLike.findUnique({ where: { postId_userId: { postId: id, userId } }, select: { postId: true } }) : null,
      prisma.postView.count({ where: { postId: id } }),
      prisma.comment.count({ where: { postId: id } }),
      prisma.comment.findMany({ where: { postId: id }, ...(cursorComment ? { cursor: { id: cursorComment.id }, skip: 1 } : {}), orderBy: [{ createdAt: "asc" }, { id: "asc" }], take: 31,
        select: { id: true, content: true, nickname: true, anonymous: true, authorId: true, createdAt: true, updatedAt: true, author: { select: { name: true, nickname: true, image: true } } } }),
    ]);
    const comments = rows.slice(0, 30).map((comment) => ({ id: comment.id, content: comment.content, nickname: comment.anonymous ? comment.nickname : comment.author?.nickname || comment.author?.name || comment.nickname, anonymous: comment.anonymous, image: comment.anonymous ? null : comment.author?.image || null, authorId: comment.anonymous ? null : comment.authorId, createdAt: comment.createdAt, updatedAt: comment.updatedAt, canEdit: comment.anonymous || (!!userId && comment.authorId === userId), canDelete: comment.anonymous || (!!userId && (comment.authorId === userId || post.authorId === userId)), canModerate: !!userId && post.authorId === userId }));
    return Response.json({ loggedIn: !!userId, likes, liked: !!liked, views, totalComments, comments, nextCursor: rows.length > 30 ? comments.at(-1)?.id : null }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) { return postFailure(error); }
}
