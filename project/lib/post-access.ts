import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export async function visiblePosts(authorId: string, viewerId?: string): Promise<Prisma.PostWhereInput> {
  if (viewerId === authorId) return { authorId };
  const friendship = viewerId && await prisma.friendship.findFirst({ where: { status: "ACCEPTED", OR: [{ userId: authorId, friendId: viewerId }, { userId: viewerId, friendId: authorId }] }, select: { id: true } });
  return { authorId, visibility: { in: friendship ? ["PUBLIC", "FRIENDS"] : ["PUBLIC"] } };
}

export async function allVisiblePosts(viewerId?: string): Promise<Prisma.PostWhereInput> {
  if (!viewerId) return { visibility: "PUBLIC" };
  const friendships = await prisma.friendship.findMany({ where: { status: "ACCEPTED", OR: [{ userId: viewerId }, { friendId: viewerId }] }, select: { userId: true, friendId: true } });
  const friends = friendships.map((item) => item.userId === viewerId ? item.friendId : item.userId);
  return { OR: [{ visibility: "PUBLIC" }, { authorId: viewerId }, { visibility: "FRIENDS", authorId: { in: friends } }] };
}
