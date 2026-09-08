import Link from "next/link";
import prisma from "@/lib/prisma";
import { allVisiblePosts } from "@/lib/post-access";
import { postExcerpt } from "@/lib/post-content";
export async function LikedPosts({ userId }: { userId: string }) {
  const likes = await prisma.postLike.findMany({ where: { userId, post: await allVisiblePosts(userId) }, orderBy: { createdAt: "desc" }, include: { post: { include: { author: { select: { name: true } }, category: { select: { name: true } } } } } });
  return <section aria-label="내가 좋아요 한 글"><div className="section-heading"><h2>내가 좋아요 한 글 <span>{likes.length}</span></h2><span>최근 좋아요순</span></div>{likes.length ? <div className="blog-post-list">{likes.map(({ post }) => <Link key={post.id} href={"/posts/" + post.id + "#post-start"} className="blog-post-item"><div className="blog-post-meta"><span>{post.author.name || "개발자"}</span><span>{post.category?.name || "미분류"}</span><time dateTime={post.createdAt.toISOString()}>{post.createdAt.toLocaleDateString("ko-KR")}</time></div><h3>{post.title}</h3><p className="line-clamp-2">{postExcerpt(post.content)}</p><div className="post-tags">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div></Link>)}</div> : <div className="empty-state"><h3>아직 좋아요 한 글이 없습니다</h3><p>마음에 드는 글에 좋아요를 눌러 모아보세요.</p><Link href="/" className="button button-secondary">이야기 둘러보기</Link></div>}</section>;
}
