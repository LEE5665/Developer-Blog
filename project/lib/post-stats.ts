import prisma from "./prisma";
import { imageSources, postExcerpt, readDocument } from "./post-content";
export async function popularRankings(viewerId?: string) {
  const now = Date.now();
  const [day, week, month] = await Promise.all([popularPosts(1, now, viewerId), popularPosts(7, now, viewerId), popularPosts(30, now, viewerId)]);
  return { day, week, month };
}
export async function popularPosts(days: 1 | 7 | 30, now = Date.now(), viewerId?: string) {
  const ranked = await prisma.postView.groupBy({ by: ["postId"], where: { createdAt: { gte: new Date(now - days * 86400_000) }, post: { visibility: "PUBLIC" } }, _count: { _all: true }, orderBy: [{ _count: { postId: "desc" } }, { postId: "asc" }], take: 5 });
  const posts = await prisma.post.findMany({ where: { id: { in: ranked.map((item) => item.postId) }, visibility: "PUBLIC" }, select: { id: true, title: true, content: true, tags: true, visibility: true, createdAt: true, authorId: true, author: { select: { name: true, image: true, nickname: true, tag: true } }, category: { select: { name: true } }, likes: { where: { userId: viewerId ?? "" }, select: { userId: true } }, _count: { select: { likes: true } } } });
  return ranked.flatMap((item) => {
    const post = posts.find((post) => post.id === item.postId);
    if (!post) return [];
    const { content, _count, createdAt, ...details } = post;
    const doc = readDocument(content);
    return [{ ...details, createdAt: createdAt.toISOString(), excerpt: postExcerpt(content).slice(0, 300), thumbnail: doc ? imageSources(doc)[0] || null : null, likes: _count.likes, liked: post.likes.length > 0, views: item._count._all }];
  });
}
