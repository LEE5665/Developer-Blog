import prisma from "./prisma";
import { imageSources, postExcerpt, readDocument } from "./post-content";
export async function popularRankings() {
  const now = Date.now();
  const [day, week, month] = await Promise.all([popularPosts(1, now), popularPosts(7, now), popularPosts(30, now)]);
  return { day, week, month };
}
export async function popularPosts(days: 1 | 7 | 30, now = Date.now()) {
  const ranked = await prisma.postView.groupBy({ by: ["postId"], where: { createdAt: { gte: new Date(now - days * 86400_000) }, post: { visibility: "PUBLIC" } }, _count: { _all: true }, orderBy: [{ _count: { postId: "desc" } }, { postId: "asc" }], take: 5 });
  const posts = await prisma.post.findMany({ where: { id: { in: ranked.map((item) => item.postId) }, visibility: "PUBLIC" }, select: { id: true, title: true, content: true, tags: true, visibility: true, createdAt: true, authorId: true, author: { select: { name: true, image: true, nickname: true, tag: true } }, category: { select: { name: true } }, _count: { select: { likes: true } } } });
  return ranked.flatMap((item) => {
    const post = posts.find((post) => post.id === item.postId);
    if (!post) return [];
    const { content, _count, createdAt, ...details } = post;
    const doc = readDocument(content);
    return [{ ...details, createdAt: createdAt.toISOString(), excerpt: postExcerpt(content).slice(0, 300), thumbnail: doc ? imageSources(doc)[0] || null : null, likes: _count.likes, views: item._count._all }];
  });
}
