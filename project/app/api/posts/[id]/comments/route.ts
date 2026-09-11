import { publishUserEvents } from "@/lib/realtime";
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
    const post = await readablePost(id, userId);
    const body = await request.json();
    const anonymous = !userId;
    const content = commentContent(body.content);
    const parentId = typeof body.parentId === "string" && body.parentId ? body.parentId : null;
    const parent = parentId ? await prisma.comment.findFirst({ where: { id: parentId, postId: id }, select: { id: true, authorId: true } }) : null;
    if (parentId && !parent) throw new PostError("답글을 달 댓글을 찾을 수 없습니다.", 404);
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
      nickname = user.nickname || "개발자";
    }
    const recipients = [...new Set([post.authorId, parent?.authorId].filter((recipient): recipient is string => !!recipient && recipient !== userId))];
    const comment = await prisma.comment.create({ data: { postId: id, parentId, authorId: anonymous ? null : userId, anonymous, nickname, passwordHash, content,
      ...(recipients.length ? { notifications: { create: recipients.map((recipientId) => ({ recipientId })) } } : {}),
    }, select: { id: true } });
    if (recipients.length) await publishUserEvents(recipients, { type: "notifications" });
    return Response.json({ comment }, { status: 201 });
  } catch (error) { return postFailure(error); }
}
