import prisma from "./prisma";
export async function weeklyPopularPosts() {
  const ranked = await prisma.postView.groupBy({ by: ["postId"], where: { createdAt: { gte: new Date(Date.now() - 7 * 86400_000) }, post: { visibility: "PUBLIC" } }, _count: { _all: true }, orderBy: [{ _count: { postId: "desc" } }, { postId: "asc" }], take: 5 });
  const posts = await prisma.post.findMany({ where: { id: { in: ranked.map((item) => item.postId) }, visibility: "PUBLIC" }, select: { id: true, title: true, author: { select: { name: true } } } });
  return ranked.flatMap((item) => { const post = posts.find((post) => post.id === item.postId); return post ? [{ ...post, weeklyViews: item._count._all }] : []; });
}
