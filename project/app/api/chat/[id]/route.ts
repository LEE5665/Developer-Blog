import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkMutation, limitAction } from "@/lib/engagement";
import { conversationFor, lockPair, pairWhere, requireFriends } from "@/lib/chat";
import { PostError, postFailure } from "@/lib/post-service";
import { publishUserEvents } from "@/lib/realtime";

type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, { params }: Context) {
  try {
    const userId = (await auth())?.user?.id;
    if (!userId) throw new PostError("로그인이 필요합니다.", 401);
    const { id } = await params;
    const room = await conversationFor(id, userId);
    const query = new URL(request.url).searchParams;
    const before = query.get("before"), after = query.get("after");
    if ((before && after) || [before, after].some((value) => value !== null && (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < 1))) throw new PostError("잘못된 메시지 위치입니다.");
    const messages = await prisma.message.findMany({ where: { conversationId: id, ...(before ? { id: { lt: Number(before) } } : after ? { id: { gt: Number(after) } } : {}) }, orderBy: { id: after ? "asc" : "desc" }, take: 51 });
    const page = messages.slice(0, 50);
    if (!after) page.reverse();
    const canSend = !!await prisma.friendship.findFirst({ where: { ...pairWhere(room.userAId, room.userBId), status: "ACCEPTED" }, select: { id: true } });
    return Response.json({ messages: page, hasMore: messages.length > 50, peer: room.userAId === userId ? room.userB : room.userA, peerRead: room.userAId === userId ? room.readB : room.readA, canSend }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) { return postFailure(error); }
}

export async function POST(request: Request, { params }: Context) {
  try {
    checkMutation(request);
    const userId = (await auth())?.user?.id;
    if (!userId) throw new PostError("로그인이 필요합니다.", 401);
    const { id } = await params;
    const room = await conversationFor(id, userId);
    const body = await request.json();
    if (typeof body?.content !== "string" || !body.content.trim() || body.content.length > 2000) throw new PostError("메시지는 1~2,000자로 입력해주세요.");
    if (typeof body.clientId !== "string" || !/^[a-f0-9-]{36}$/i.test(body.clientId)) throw new PostError("잘못된 메시지 식별자입니다.");
    await limitAction(request, "chat-send", userId, 120, 1);
    const message = await prisma.$transaction(async (tx) => {
      await lockPair(tx, room.userAId, room.userBId);
      await requireFriends(room.userAId, room.userBId, tx);
      const existing = await tx.message.findUnique({ where: { senderId_clientId: { senderId: userId, clientId: body.clientId } } });
      if (existing) {
        if (existing.conversationId !== id || existing.content !== body.content.trim()) throw new PostError("다른 메시지에 사용된 식별자입니다.", 409);
        return existing;
      }
      const message = await tx.message.create({ data: { conversationId: id, senderId: userId, content: body.content.trim(), clientId: body.clientId } });
      await tx.conversation.update({ where: { id }, data: { updatedAt: new Date() } });
      return message;
    });
    await publishUserEvents([room.userAId, room.userBId], { type: "chat", conversationId: id });
    return Response.json({ message }, { status: 201 });
  } catch (error) { return postFailure(error); }
}

export async function PATCH(request: Request, { params }: Context) {
  try {
    checkMutation(request);
    const userId = (await auth())?.user?.id;
    if (!userId) throw new PostError("로그인이 필요합니다.", 401);
    const { id } = await params;
    const room = await conversationFor(id, userId);
    const body = await request.json();
    if (!Number.isSafeInteger(body?.messageId) || body.messageId < 1) throw new PostError("잘못된 메시지 위치입니다.");
    if (!await prisma.message.findFirst({ where: { id: body.messageId, conversationId: id }, select: { id: true } })) throw new PostError("메시지를 찾을 수 없습니다.", 404);
    const result = room.userAId === userId
      ? await prisma.conversation.updateMany({ where: { id, readA: { lt: body.messageId } }, data: { readA: body.messageId } })
      : await prisma.conversation.updateMany({ where: { id, readB: { lt: body.messageId } }, data: { readB: body.messageId } });
    if (result.count) await publishUserEvents([room.userAId, room.userBId], { type: "chat", conversationId: id });
    return Response.json({ success: true });
  } catch (error) { return postFailure(error); }
}
