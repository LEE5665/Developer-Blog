import prisma from "./prisma";
import { lockPair } from "./chat";
import { PostError } from "./post-service";
import { publishUserEvents } from "./realtime";

export async function sendFriendRequest(senderId: string, recipientId: string) {
  if (senderId === recipientId) throw new PostError("자신에게 친구 요청을 보낼 수 없습니다.");
  const friendship = await prisma.$transaction(async tx => {
    await lockPair(tx, senderId, recipientId);
    if (!await tx.user.findUnique({ where: { id: recipientId }, select: { id: true } })) throw new PostError("사용자를 찾을 수 없습니다.", 404);
    const existing = await tx.friendship.findFirst({ where: { OR: [{ userId: senderId, friendId: recipientId }, { userId: recipientId, friendId: senderId }] } });
    if (existing) return existing;
    return tx.friendship.create({ data: { userId: senderId, friendId: recipientId } });
  });
  await publishUserEvents([senderId, recipientId], { type: "friends" });
  return friendship;
}
