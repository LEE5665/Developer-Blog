"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "./Avatar";
import { Modal } from "./Modal";
interface CommentItem { id: string; content: string; nickname: string; anonymous: boolean; image: string | null; authorId: string | null; createdAt: string; updatedAt: string; canEdit: boolean; canDelete: boolean; canModerate: boolean }
interface Engagement { loggedIn: boolean; liked: boolean; likes: number; views: number; totalComments: number; comments: CommentItem[]; nextCursor: string | null }
const jsonHeaders = { "Content-Type": "application/json" };
async function requestJson(url: string, init?: RequestInit) {
  const response = await fetch(url, { cache: "no-store", ...init });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "요청에 실패했습니다.");
  return result;
}
export function PostEngagement({ postId }: { postId: string }) {
  const router = useRouter();
  const base = "/api/posts/" + postId;
  const [data, setData] = useState<Engagement | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [notice, setNotice] = useState("");
  const [action, setAction] = useState<{ comment: CommentItem; remove: boolean } | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [actionError, setActionError] = useState("");
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const result: Engagement = await requestJson(base + "/engagement");
        if (cancelled) return;
        setData(result);
        const viewed = await requestJson(base + "/views", { method: "POST", headers: jsonHeaders, body: "{}" });
        if (!cancelled) setData((current) => current ? { ...current, views: viewed.views } : current);
      } catch (error) { if (!cancelled) setError(error instanceof Error ? error.message : "댓글을 불러오지 못했습니다."); }
    }
    void load();
    return () => { cancelled = true; };
  }, [base]);
  async function reload(more = false) {
    const result: Engagement = await requestJson(base + "/engagement" + (more && data?.nextCursor ? "?cursor=" + data.nextCursor : ""));
    setData((current) => more && current ? { ...result, comments: [...current.comments, ...result.comments.filter((item) => !current.comments.some((previous) => previous.id === item.id))] } : result);
  }
  async function like() {
    if (!data || busy) return;
    setBusy(true); setError("");
    try { const result = await requestJson(base + "/likes", { method: data.liked ? "DELETE" : "PUT", headers: jsonHeaders, body: "{}" }); setData({ ...data, ...result }); router.refresh(); }
    catch (error) { setError(error instanceof Error ? error.message : "좋아요를 변경하지 못했습니다."); }
    finally { setBusy(false); }
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault(); if (busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      await requestJson(base + "/comments", { method: "POST", headers: jsonHeaders, body: JSON.stringify({ content, anonymous: !data?.loggedIn || anonymous, nickname, password }) });
      setContent(""); setPassword(""); setNotice("댓글이 등록되었습니다."); await reload();
    } catch (error) { setError(error instanceof Error ? error.message : "댓글을 등록하지 못했습니다."); }
    finally { setBusy(false); }
  }
  function openAction(comment: CommentItem, remove: boolean) { setAction({ comment, remove }); setEditContent(comment.content); setEditPassword(""); setActionError(""); }
  async function changeComment(event: React.FormEvent) {
    event.preventDefault(); if (!action || busy) return;
    setBusy(true); setActionError("");
    try {
      await requestJson(base + "/comments/" + action.comment.id, { method: action.remove ? "DELETE" : "PATCH", headers: jsonHeaders, body: JSON.stringify({ content: editContent, password: editPassword }) });
      setAction(null); setEditPassword(""); setNotice(action.remove ? "댓글이 삭제되었습니다." : "댓글이 수정되었습니다.");
      try { await reload(); } catch (error) { setError(error instanceof Error ? error.message : "댓글 목록을 새로 불러오지 못했습니다."); }
    } catch (error) { setActionError(error instanceof Error ? error.message : "댓글을 변경하지 못했습니다."); }
    finally { setBusy(false); }
  }
  const isAnonymous = !data?.loggedIn || anonymous;
  return <section className="post-engagement" aria-label="좋아요와 댓글">
    <div className="engagement-summary">{data?.loggedIn ? <button type="button" className="button button-secondary like-button" aria-pressed={data.liked} disabled={busy} onClick={like}><Heart filled={data.liked} />좋아요 {data.likes}</button> : <Link href="/login" className="button button-secondary" aria-label="로그인하고 좋아요"><Heart filled={false} />좋아요 {data?.likes || 0}</Link>}<span>조회 {data?.views ?? "—"}</span></div>
    <h2 className="comments-heading">댓글 <span>{data?.totalComments ?? 0}</span></h2>
    {data && <form className="comment-form" onSubmit={submit}>
      {data.loggedIn && <label className="comment-anonymous-toggle"><input type="checkbox" checked={anonymous} disabled={busy} onChange={(event) => setAnonymous(event.target.checked)} />익명으로 작성</label>}
      {isAnonymous && <><div className="comment-credentials"><input aria-label="댓글 닉네임" placeholder="닉네임" required minLength={2} maxLength={30} value={nickname} disabled={busy} onChange={(event) => setNickname(event.target.value)} /><input type="password" aria-label="댓글 비밀번호" placeholder="비밀번호 (4자 이상)" required minLength={4} maxLength={72} autoComplete="new-password" value={password} disabled={busy} onChange={(event) => setPassword(event.target.value)} /></div><p className="comment-hint">프로필 없이 닉네임만 표시됩니다. 수정·삭제할 때 이 비밀번호가 필요합니다.</p></>}
      <textarea aria-label="댓글 내용" placeholder="이 글에 대한 생각을 남겨주세요." required maxLength={2000} rows={4} value={content} disabled={busy} onChange={(event) => setContent(event.target.value)} />
      <div className="comment-form-footer"><small>{content.length}/2,000</small><button type="submit" className="button button-accent" disabled={busy || !content.trim()}>댓글 등록</button></div>
    </form>}
    {error && <p role="alert" className="composer-error">{error}<button type="button" className="text-link" disabled={busy} onClick={async () => { try { await reload(); setError(""); } catch { /* Keep the original error visible. */ } }}>다시 불러오기</button></p>}
    {notice && <p role="status" className="comment-hint">{notice}</p>}
    {!data && !error && <p role="status" className="comment-hint">댓글을 불러오고 있습니다.</p>}
    <div className="comment-list">{data?.comments.map((comment) => <article key={comment.id} className="comment-item"><div className="comment-byline">{!comment.anonymous && <Avatar src={comment.image} name={comment.nickname} size={28} />}{comment.authorId && !comment.anonymous ? <Link href={"/blog/" + comment.authorId}><strong>{comment.nickname}</strong></Link> : <strong>{comment.nickname}</strong>}{comment.anonymous && <span>익명</span>}<time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" })}</time>{comment.updatedAt !== comment.createdAt && <span>수정됨</span>}</div><p>{comment.content}</p><div className="comment-actions">{comment.canEdit && <button type="button" disabled={busy} onClick={() => openAction(comment, false)}>수정</button>}{comment.canDelete && <button type="button" disabled={busy} onClick={() => openAction(comment, true)}>삭제</button>}</div></article>)}</div>
    {data && !data.comments.length && <p className="comment-hint">첫 댓글을 남겨보세요.</p>}
    {data?.nextCursor && <button type="button" className="button button-secondary" disabled={busy} onClick={async () => { setBusy(true); try { await reload(true); } catch (error) { setError(error instanceof Error ? error.message : "댓글을 불러오지 못했습니다."); } finally { setBusy(false); } }}>댓글 더 보기</button>}
    <Modal open={!!action} onClose={() => { if (!busy) setAction(null); }} title={action?.remove ? "댓글 삭제" : "댓글 수정"}><form className="modal-form" onSubmit={changeComment}>{action?.remove ? <p>이 댓글을 삭제할까요?</p> : <><label htmlFor="edit-comment">댓글 내용</label><textarea id="edit-comment" required maxLength={2000} rows={5} value={editContent} disabled={busy} onChange={(event) => setEditContent(event.target.value)} /></>}{action?.comment.anonymous && !(action.remove && action.comment.canModerate) && <><label htmlFor="comment-password">작성할 때 입력한 비밀번호</label><input id="comment-password" type="password" required minLength={4} maxLength={72} autoComplete="off" value={editPassword} disabled={busy} onChange={(event) => setEditPassword(event.target.value)} /></>}{actionError && <p role="alert" className="composer-error">{actionError}</p>}<div className="modal-actions"><button type="button" className="button button-secondary" disabled={busy} onClick={() => setAction(null)}>취소</button><button type="submit" className="button button-primary" disabled={busy}>{action?.remove ? "삭제" : "저장"}</button></div></form></Modal>
  </section>;
}
function Heart({ filled }: { filled: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>; }
