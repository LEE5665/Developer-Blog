import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkMutation } from "@/lib/engagement";
import { chatProfile, lockPair, requireFriends } from "@/lib/chat";
import { PostError, postFailure } from "@/lib/post-service";

export async function GET() {
  try {
    const userId = (await auth())?.user?.id;
    if (!userId) throw new PostError("로그인이 필요합니다.", 401);
    const rows = await prisma.conversation.findMany({ where: { OR: [{ userAId: userId }, { userBId: userId }] }, orderBy: [{ updatedAt: "desc" }, { id: "desc" }], include: { userA: { select: chatProfile }, userB: { select: chatProfile }, messages: { orderBy: { id: "desc" }, take: 1 } } });
    const conversations = await Promise.all(rows.map(async (row) => ({ id: row.id, peer: row.userAId === userId ? row.userB : row.userA, lastMessage: row.messages[0] || null,
      unread: await prisma.message.count({ where: { conversationId: row.id, senderId: { not: userId }, id: { gt: row.userAId === userId ? row.readA : row.readB } } }),
    })));
    return Response.json({ conversations }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) { return postFailure(error); }
}

export async function POST(request: Request) {
  try {
    checkMutation(request);
    const userId = (await auth())?.user?.id;
    if (!userId) throw new PostError("로그인이 필요합니다.", 401);
    const body = await request.json();
    if (typeof body?.userId !== "string") throw new PostError("대화할 친구를 선택해주세요.");
    const [userAId, userBId] = [userId, body.userId].sort();
    const conversation = await prisma.$transaction(async (tx) => {
      await lockPair(tx, userAId, userBId);
      await requireFriends(userAId, userBId, tx);
      return tx.conversation.upsert({ where: { userAId_userBId: { userAId, userBId } }, create: { userAId, userBId }, update: {}, select: { id: true } });
    });
    return Response.json({ conversation });
  } catch (error) { return postFailure(error); }
}
