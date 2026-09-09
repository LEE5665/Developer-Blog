import prisma from "./prisma";
import type { Prisma } from "@/generated/prisma/client";
import { PostError } from "./post-service";

export const chatProfile = { id: true, name: true, nickname: true, image: true } as const;
export function pairWhere(a: string, b: string) { return { OR: [{ userId: a, friendId: b }, { userId: b, friendId: a }] }; }
export async function lockPair(tx: Prisma.TransactionClient, a: string, b: string) {
  const pair = JSON.stringify([a, b].sort());
  await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtextextended(${pair}, 0))::text`;
}
export async function requireFriends(a: string, b: string, db: Pick<Prisma.TransactionClient, "friendship"> = prisma) {
  if (a === b || !await db.friendship.findFirst({ where: { ...pairWhere(a, b), status: "ACCEPTED" }, select: { id: true } })) throw new PostError("친구끼리만 메시지를 보낼 수 있습니다.", 403);
}
export async function conversationFor(id: string, userId: string) {
  const conversation = await prisma.conversation.findFirst({ where: { id, OR: [{ userAId: userId }, { userBId: userId }] }, include: { userA: { select: chatProfile }, userB: { select: chatProfile } } });
  if (!conversation) throw new PostError("대화를 찾을 수 없습니다.", 404);
  return conversation;
}
