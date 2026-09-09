import Link from "next/link";
import { Avatar } from "./components/Avatar";
import { Icon } from "./components/Icon";

export type PostCardData = {
  id: string; title: string; excerpt: string; thumbnail: string | null; tags: string[];
  visibility: "PUBLIC" | "PRIVATE" | "FRIENDS"; createdAt: string; authorId: string;
  author: { name: string | null; image: string | null; nickname: string | null; tag: string | null };
  category: { name: string } | null; likes: number; liked?: boolean;
};

export function PostCard({ post, currentUserId, rank, views, href }: { post: PostCardData; currentUserId?: string; rank?: number; views?: number; href?: string }) {
  return <article className="feed-post">
    <Link href={href || `/posts/${post.id}#post-start`} className="feed-post-link">
      {post.thumbnail && <div className="feed-post-thumbnail">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.thumbnail} alt="" loading="lazy" decoding="async" />
      </div>}
      <div className="feed-post-content">
        <div className="post-meta">
          {rank !== undefined && <span className="feed-rank">{rank}위</span>}
          {post.category && <span className="tag">{post.category.name}</span>}
          <span>{post.visibility === "PRIVATE" ? "나만 보기" : post.visibility === "FRIENDS" ? "친구 공개" : "전체 공개"}</span>
        </div>
        <h3>{post.title}</h3>
        <p className="post-body line-clamp-2">{post.excerpt}</p>
        <div className="post-tags">{post.tags.slice(0, 2).map((tag) => <span key={tag}>#{tag}</span>)}{post.tags.length > 2 && <span>+{post.tags.length - 2}</span>}</div>
      </div>
    </Link>
    <div className="post-author">
      <div className="feed-byline">
        <Avatar src={post.author.image} name={post.author.name} size={28} />
        <div className="feed-author-details">
          <Link href={`/blog/${post.authorId}`}><strong>{post.author.name || "개발자"}</strong></Link>
          <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric", timeZone: "Asia/Seoul" })}</time>
        </div>
      </div>
      <span className="feed-post-stats">
        {currentUserId === post.authorId && <span>내 글</span>}
        {views !== undefined && <span>조회 {views.toLocaleString("ko-KR")}</span>}
        <span className={post.liked ? "post-liked" : undefined} aria-label={`좋아요 ${post.likes}개`}><Icon name="heart" width={14} height={14} fill={post.liked ? "currentColor" : "none"} />{post.likes.toLocaleString("ko-KR")}</span>
      </span>
    </div>
  </article>;
}
