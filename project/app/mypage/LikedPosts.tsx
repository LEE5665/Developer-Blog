import Link from "next/link";
import { PostCard } from "../PostCard";
import prisma from "@/lib/prisma";
import { allVisiblePosts } from "@/lib/post-access";
import { postExcerpt, readDocument, imageSources } from "@/lib/post-content";
export async function LikedPosts({ userId }: { userId: string }) {
  const likes = await prisma.postLike.findMany({ where: { userId, post: await allVisiblePosts(userId) }, orderBy: { createdAt: "desc" }, include: { post: { include: { author: { select: { name: true, image: true, nickname: true, tag: true } }, _count: { select: { likes: true, views: true } }, category: { select: { name: true } } } } } });
  return <section aria-label="내가 좋아요 한 글"><div className="section-heading"><h2>내가 좋아요 한 글 <span>{likes.length}</span></h2><span>최근 좋아요순</span></div>{likes.length ? <div className="home-post-grid">{likes.map(({ post }) => {
    const doc = readDocument(post.content);
    return <PostCard key={post.id} currentUserId={userId} views={post._count.views} post={{ ...post, createdAt: post.createdAt.toISOString(), excerpt: postExcerpt(post.content), thumbnail: doc ? imageSources(doc)[0] || null : null, likes: post._count.likes, liked: true }} />;
  })}</div> : <div className="empty-state"><h3>아직 좋아요 한 글이 없습니다</h3><p>마음에 드는 글에 좋아요를 눌러 모아보세요.</p><Link href="/" className="button button-secondary">이야기 둘러보기</Link></div>}</section>;
}
