"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PostEngagement } from "./PostEngagement";
import { PostContent } from "./PostContent";
import { Avatar } from "./Avatar";
import { ArticleToc } from "./ArticleToc";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import { documentOutline, readDocument, postExcerpt } from "@/lib/post-content";
import type { blogData } from "@/lib/blog-data";

type Data = NonNullable<Awaited<ReturnType<typeof blogData>>>;
export function BlogExplorer({ data, initialPostId, initialCategory = "all", embedded = false }: { data: Data; initialPostId?: string; initialCategory?: string; embedded?: boolean }) {
  const router = useRouter();
  const category = initialCategory;
  const [postId, setPostId] = useState(initialPostId || null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const post = data.posts.find((item) => item.id === postId);
  const filtered = data.posts.filter((item) => category === "all" || (category === "uncategorized" ? item.categoryId === null : item.categoryId === category));
  const categoryName = category === "all" ? "전체 글" : category === "uncategorized" ? "미분류" : data.categories.find((item) => item.id === category)?.name || "전체 글";
  const blogUrl = `/blog/${data.author.id}`;
  const listUrl = embedded ? `/mypage?tab=posts&category=${encodeURIComponent(category)}` : `${blogUrl}?category=${encodeURIComponent(category)}`;
  const postDoc = useMemo(() => post ? readDocument(post.content) : null, [post]);
  const outline = useMemo(() => postDoc?.attrs?.toc === "hidden" ? [] : documentOutline(postDoc, `post-${post?.id}`), [postDoc, post?.id]);
  function categoryLink(id: string, label: string, count: number) {
    return <Link href={embedded ? `/mypage?tab=posts&category=${encodeURIComponent(id)}#post-list` : `${blogUrl}?category=${encodeURIComponent(id)}#post-list`} className={`blog-category ${(post ? (post.categoryId || "uncategorized") === id : category === id) ? "active" : ""}`} aria-current={(post ? (post.categoryId || "uncategorized") === id : category === id) ? "page" : undefined}><span>{label}</span><small>{count}</small></Link>;
  }
  async function deletePost() {
    if (!post || deleting) return;
    setDeleting(true); setError("");
    try {
      const response = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "글을 삭제하지 못했습니다.");
      setDeleteOpen(false); setPostId(null);
      router.push(`${listUrl}#post-list`);
      router.refresh();
    } catch (error) { setError(error instanceof Error ? error.message : "요청에 실패했습니다."); }
    finally { setDeleting(false); }
  }
  return <div className="blog-explorer">
    <aside className="blog-sidebar">
      <Link href={blogUrl} className="blog-owner"><Avatar src={data.author.image} name={data.author.name} size={64} /><strong>{data.author.name || "개발자"}</strong><small>{data.author.nickname ? `${data.author.nickname}#${data.author.tag}` : "Developer Blog"}</small></Link>
      <nav aria-label="작성자 카테고리"><span className="blog-sidebar-label">CATEGORIES</span>{categoryLink("all", "전체 글", data.posts.length)}{data.categories.map((item) => item.isDivider ? <hr key={item.id} /> : <div key={item.id}>{categoryLink(item.id, item.name, data.posts.filter((post) => post.categoryId === item.id).length)}</div>)}{categoryLink("uncategorized", "미분류", data.posts.filter((post) => post.categoryId === null).length)}</nav>
      <ArticleToc items={outline} />
      {data.isOwner && <Link href="/write" className="button button-accent w-full mt-6"><Icon name="pen" width={16} height={16} />새 글 작성</Link>}
    </aside>
    <section className="blog-reading" aria-label={post ? "글 본문" : "글 목록"}>
      {post ? <article>
        <div className="blog-reading-toolbar"><Link href={`${listUrl}#post-list`} className="nav-link"><Icon name="back" width={15} height={15} />목록으로</Link>{data.isOwner && <div className="flex gap-3"><Link href={`/posts/${post.id}/edit`} className="button button-secondary">수정</Link><button type="button" className="button button-secondary" onClick={() => setDeleteOpen(true)}>삭제</button></div>}</div>
        <div className="blog-post-meta"><span>{post.visibility === "PUBLIC" ? "전체 공개" : post.visibility === "FRIENDS" ? "친구 공개" : "나만 보기"}</span></div>
        <h1 id="post-start" tabIndex={-1} className="blog-post-title">{post.title}</h1>
        <div className="blog-post-date"><Link href={blogUrl} className="post-byline"><Avatar src={data.author.image} name={data.author.name} size={32} /><strong>{data.author.name || "개발자"}</strong></Link><time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</time>{embedded && <Link href={`/posts/${post.id}`}>글 페이지 열기</Link>}</div>
        <div className="post-tags article-tags">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
        <PostContent content={post.content} idPrefix={`post-${post.id}`} />
        <PostEngagement key={post.id} postId={post.id} />
      </article> : <>
        <div className="section-heading"><h2 id="post-list" tabIndex={-1}>{categoryName}</h2><span>{filtered.length}개의 글</span></div>
        {data.isOwner && category === "all" && data.drafts.length > 0 && <div className="blog-drafts"><h3>이어서 작성하기</h3>{data.drafts.map((draft) => <Link key={draft.id} href={draft.key === "new" ? "/write" : `/posts/${draft.key}/edit`}><span>{draft.title || "제목 없는 임시 글"}</span><small>{draft.key === "new" ? "임시저장" : "수정 중"}</small></Link>)}</div>}
        {filtered.length ? <div className="blog-post-list">{filtered.map((item) => <Link href={embedded ? `${listUrl}&post=${item.id}#post-start` : `/posts/${item.id}#post-start`} key={item.id} className="blog-post-item"><div className="blog-post-meta"><span>{data.categories.find((cat) => cat.id === item.categoryId)?.name || "미분류"}</span><time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString("ko-KR")}</time>{item.visibility !== "PUBLIC" && <span>{item.visibility === "PRIVATE" ? "나만 보기" : "친구 공개"}</span>}</div><h3>{item.title}</h3><p className="line-clamp-2">{postExcerpt(item.content)}</p><div className="post-tags">{item.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div></Link>)}</div> : <div className="empty-state"><div className="empty-icon"><Icon name="file" /></div><h3>아직 글이 없습니다</h3><p>{data.isOwner ? "이 카테고리에 첫 번째 이야기를 남겨보세요." : "공개된 글이 아직 없습니다."}</p></div>}
      </>}
    </section>
    <Modal open={deleteOpen} onClose={() => { if (!deleting) setDeleteOpen(false); }} title="글 삭제"><div className="modal-form"><p>이 글을 삭제할까요? 수정 중인 임시 글도 삭제됩니다. 다른 글이나 임시저장에서 사용 중인 이미지는 유지됩니다.</p>{error && <p role="alert" className="composer-error">{error}</p>}<div className="modal-actions"><button type="button" className="button button-secondary" disabled={deleting} onClick={() => setDeleteOpen(false)}>취소</button><button type="button" className="button button-primary" disabled={deleting} onClick={deletePost}>{deleting ? "삭제 중..." : "삭제하기"}</button></div></div></Modal>
  </div>;
}
