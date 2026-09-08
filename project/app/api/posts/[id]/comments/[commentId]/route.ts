import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkMutation, readablePost, limitAction, commentContent, commentPassword } from "@/lib/engagement";
import { PostError, postFailure } from "@/lib/post-service";
async function change(request: Request, params: Promise<{ id: string; commentId: string }>, remove: boolean) {
  try {
    checkMutation(request);
    const { id, commentId } = await params;
    const userId = (await auth())?.user?.id;
    const post = await readablePost(id, userId);
    const comment = await prisma.comment.findFirst({ where: { id: commentId, postId: id } });
    if (!comment) throw new PostError("댓글을 찾을 수 없습니다.", 404);
    const body = await request.json();
    const moderator = remove && !!userId && post.authorId === userId;
    if (!moderator) {
      if (comment.anonymous) {
        await limitAction(request, "comment-password:" + comment.id, "", 10);
        if (!comment.passwordHash || !await bcrypt.compare(commentPassword(body.password), comment.passwordHash)) throw new PostError("댓글 비밀번호가 일치하지 않습니다.", 403);
      } else if (!userId || comment.authorId !== userId) throw new PostError("본인의 댓글만 변경할 수 있습니다.", 403);
    }
    if (remove) await prisma.comment.delete({ where: { id: commentId } });
    else await prisma.comment.update({ where: { id: commentId }, data: { content: commentContent(body.content) } });
    return Response.json({ success: true });
  } catch (error) { return postFailure(error); }
}
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string; commentId: string }> }) { return change(request, params, false); }
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string; commentId: string }> }) { return change(request, params, true); }
