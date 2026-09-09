import prisma from "./prisma";
import { visiblePosts } from "./post-access";

export async function blogData(authorId: string, viewerId?: string) {
  const author = await prisma.user.findUnique({ where: { id: authorId }, select: { id: true, name: true, nickname: true, tag: true, image: true, bio: true } });
  if (!author) return null;
  const where = await visiblePosts(authorId, viewerId);
  const [categories, posts, drafts, friendship] = await Promise.all([
    prisma.category.findMany({ where: { userId: authorId }, orderBy: [{ order: "asc" }, { createdAt: "asc" }], select: { id: true, name: true, isDivider: true } }),
    prisma.post.findMany({ where, orderBy: { createdAt: "desc" }, select: { id: true, title: true, content: true, tags: true, visibility: true, categoryId: true, createdAt: true, updatedAt: true, _count: { select: { likes: true, views: true } }, likes: { where: { userId: viewerId ?? "" }, select: { userId: true } } } }),
    viewerId === authorId ? prisma.postDraft.findMany({ where: { userId: authorId }, orderBy: { updatedAt: "desc" }, select: { id: true, title: true, key: true, updatedAt: true } }) : Promise.resolve([]),
    viewerId && viewerId !== authorId ? prisma.friendship.findFirst({ where: { OR: [{ userId: viewerId, friendId: authorId }, { userId: authorId, friendId: viewerId }] }, select: { userId: true, status: true } }) : Promise.resolve(null),
  ]);
  return { author, categories, viewerId, friendship, posts: posts.map((post) => ({ ...post, createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() })), drafts: drafts.map((draft) => ({ ...draft, updatedAt: draft.updatedAt.toISOString() })), isOwner: viewerId === authorId };
}
