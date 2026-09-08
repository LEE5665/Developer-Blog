import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkMutation, readablePost, limitAction, commentContent, commentPassword } from "@/lib/engagement";
import { PostError, postFailure } from "@/lib/post-service";
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    checkMutation(request);
    const { id } = await params;
    const userId = (await auth())?.user?.id;
    await readablePost(id, userId);
    const body = await request.json();
    const anonymous = !userId;
    const content = commentContent(body.content);
    let nickname: string;
    let passwordHash: string | null = null;
    await limitAction(request, "comment-create", userId, 20);
    if (anonymous) {
      if (typeof body.nickname !== "string" || body.nickname.trim().length < 2 || body.nickname.trim().length > 30) throw new PostError("닉네임은 2~30자로 입력해주세요.");
      nickname = body.nickname.trim();
      passwordHash = await bcrypt.hash(commentPassword(body.password), 12);
    } else {
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true, nickname: true } });
      if (!user) throw new PostError("다시 로그인해주세요.", 401);
      nickname = user.nickname || user.name || "개발자";
    }
    const comment = await prisma.comment.create({ data: { postId: id, authorId: anonymous ? null : userId, anonymous, nickname, passwordHash, content }, select: { id: true } });
    return Response.json({ comment }, { status: 201 });
  } catch (error) { return postFailure(error); }
}
