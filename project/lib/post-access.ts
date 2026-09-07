import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export async function visiblePosts(authorId: string, viewerId?: string): Promise<Prisma.PostWhereInput> {
  if (viewerId === authorId) return { authorId };
  const friendship = viewerId && await prisma.friendship.findFirst({ where: { status: "ACCEPTED", OR: [{ userId: authorId, friendId: viewerId }, { userId: viewerId, friendId: authorId }] }, select: { id: true } });
  return { authorId, visibility: { in: friendship ? ["PUBLIC", "FRIENDS"] : ["PUBLIC"] } };
}
