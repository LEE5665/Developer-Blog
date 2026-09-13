"use client";
import { UserName } from "@/app/components/UserName";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BulkPostManager } from "../mypage/BulkPostManager";
import { FriendButton } from "./FriendButton";
import { PostCard } from "../PostCard";
import { PostEngagement } from "./PostEngagement";
import { PostContent } from "./PostContent";
import { ArticleToc } from "./ArticleToc";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import { postExcerpt, readDocument, imageSources, documentOutline } from "@/lib/post-content";
import type { blogData } from "@/lib/blog-data";
type Data = NonNullable<Awaited<ReturnType<typeof blogData>>>;
export function BlogExplorer({ data, initialPostId, initialCategory = "all", embedded = false }: { data: Data; initialPostId?: string; initialCategory?: string; embedded?: boolean }) {
  const [managing, setManaging] = useState(false);
  const category = initialCategory; const postId = initialPostId || null; const [deleteOpen, setDeleteOpen] = useState(false); const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const post = data.posts.find((item) => item.id === postId); const filtered = data.posts; const totalPages = Math.max(1, Math.ceil(data.totalPosts / data.pageSize));
  const blogUrl = "/blog/" + data.author.id; const listUrl = embedded ? "/mypage?tab=posts&category=" + encodeURIComponent(category) : blogUrl + "?category=" + encodeURIComponent(category);
  const postDoc = useMemo(() => (post ? readDocument(post.content) : null), [post]);
  const outline = useMemo(() => (postDoc?.attrs?.toc === "hidden" ? [] : documentOutline(postDoc, `post-${post?.id}`)), [postDoc, post?.id]);
  async function deletePost() {
    if (!post || deleting) return;
    setDeleting(true); setDeleteError(null);
    try {
      const response = await fetch("/api/posts/" + post.id, { method: "DELETE" });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "글을 삭제하지 못했습니다. 다시 시도해주세요.");
      }
      // Request a fresh list and replace the deleted detail URL in browser history.
      // Refreshing the current /posts/[id] route would correctly return a 404.
      window.location.replace(listUrl + "#post-list");
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "서버와 연결하지 못했습니다. 다시 시도해주세요.");
      setDeleting(false);
    }
  }
  const categoryCount = (id: string) => data.categoryCounts.find((item) => (item.categoryId || "uncategorized") === id)?.count || 0;
  return <div className="blog-explorer"><aside className="blog-sidebar"><Link href={blogUrl} className="blog-owner"><Avatar src={data.author.image} name={data.author.nickname} size={64} /><strong><UserName user={data.author} /></strong>{data.author.bio && <p className="blog-owner-bio">{data.author.bio}</p>}</Link><FriendButton authorId={data.author.id} viewerId={data.viewerId} friendship={data.friendship} /><nav aria-label="작성자 카테고리"><span className="blog-sidebar-label">CATEGORIES</span><Link href={(embedded ? "/mypage?tab=posts" : blogUrl) + "#post-list"} aria-current={category === "all" ? "page" : undefined} className="blog-category"><span>전체 글</span><small>{data.totalPosts}</small></Link>{data.categories.map((item) => item.isDivider ? <hr key={item.id} /> : <Link key={item.id} href={(embedded ? "/mypage?tab=posts&category=" : blogUrl + "?category=") + encodeURIComponent(item.id) + "#post-list"} aria-current={category === item.id ? "page" : undefined} className="blog-category"><span>{item.name}</span><small>{categoryCount(item.id)}</small></Link>)}<Link href={(embedded ? "/mypage?tab=posts&category=uncategorized" : blogUrl + "?category=uncategorized") + "#post-list"} aria-current={category === "uncategorized" ? "page" : undefined} className="blog-category"><span>미분류</span><small>{categoryCount("uncategorized")}</small></Link></nav><ArticleToc items={outline} />{data.isOwner && <Link href="/write" className="button button-accent w-full mt-6"><Icon name="pen" width={16} height={16} />글 작성</Link>}</aside><section className="blog-reading">{post ? <article><div className="blog-reading-toolbar"><Link href={listUrl + "#post-list"} className="nav-link"><Icon name="back" width={15} height={15} />목록으로</Link>{data.isOwner && <div className="flex gap-2"><Link href={"/posts/" + post.id + "/edit"} className="button button-secondary">수정</Link><button type="button" className="button button-secondary" onClick={() => setDeleteOpen(true)}>삭제</button></div>}</div><h1 className="blog-post-title">{post.title}</h1><div className="blog-post-date"><Link href={blogUrl} className="post-byline"><Avatar src={data.author.image} name={data.author.nickname} size={32} /><strong><UserName user={data.author} /></strong></Link><time>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</time></div><PostContent content={post.content} idPrefix={"post-" + post.id} /><PostEngagement key={post.id} postId={post.id} /></article> : <><div className="section-heading"><h2 id="post-list">{category === "all" ? "전체 글" : "글 목록"}</h2><span>{data.totalPosts}개의 글</span></div>{embedded && data.isOwner && <div className="mb-4"><button type="button" className="button button-secondary" aria-pressed={managing} onClick={() => setManaging(!managing)}>{managing ? "글 목록 보기" : "여러 글 변경"}</button></div>}{embedded && data.isOwner && managing ? <BulkPostManager posts={filtered} categories={data.categories} /> : filtered.length ? <div className="home-post-grid">{filtered.map((item) => { const doc = readDocument(item.content); return <PostCard key={item.id} currentUserId={data.viewerId} views={item._count.views} href={(embedded ? listUrl + "&post=" + item.id : "/posts/" + item.id) + "#post-start"} post={{ ...item, authorId: data.author.id, author: data.author, category: data.categories.find((cat) => cat.id === item.categoryId) || null, excerpt: postExcerpt(item.content), thumbnail: doc ? imageSources(doc)[0] || null : null, likes: item._count.likes, liked: item.likes.length > 0 }} />; })}</div> : <div className="empty-state"><h3>아직 글이 없습니다</h3></div>}{totalPages > 1 && <nav className="feed-pagination"><Link href={data.page > 1 ? listUrl + "&page=" + (data.page - 1) + "#post-list" : "#post-list"}>이전</Link><span>{data.page} / {totalPages}</span><Link href={data.page < totalPages ? listUrl + "&page=" + (data.page + 1) + "#post-list" : "#post-list"}>다음</Link></nav>}</>}</section><Modal open={deleteOpen} onClose={() => { if (!deleting) setDeleteOpen(false); }} title="글 삭제"><div className="modal-form"><p>이 글을 삭제할까요?</p>{deleteError && <p role="alert" className="composer-error">{deleteError}</p>}<div className="modal-actions"><button className="button button-secondary" disabled={deleting} onClick={() => setDeleteOpen(false)}>취소</button><button className="button button-primary" disabled={deleting} onClick={() => void deletePost()}>삭제</button></div></div></Modal></div>;
}
