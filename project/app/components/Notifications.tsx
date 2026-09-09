"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "./Avatar";

type Inbox = {
  requests: { id: string; createdAt: string; user: { id: string; name: string | null; nickname: string | null; image: string | null } }[];
  comments: { id: string; createdAt: string; comment: { id: string; parentId: string | null; nickname: string; content: string; post: { id: string; title: string } } }[];
};
export function Notifications() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Inbox | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const version = useRef(0);
  const dropdown = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !dropdown.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  const load = useCallback(async () => {
    const current = ++version.current;
    try {
      const response = await fetch("/api/notifications", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "알림을 불러오지 못했습니다.");
      if (version.current === current) { setData(result); setError(""); }
    } catch (error) { if (version.current === current) setError(error instanceof Error ? error.message : "알림을 불러오지 못했습니다."); }
  }, []);
  useEffect(() => {
    const refresh = () => { if (document.visibilityState === "visible") void load(); };
    const show = () => { setOpen(true); void load(); };
    const requestVersion = version;
    const initialLoad = window.setTimeout(refresh, 0);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("notifications-changed", refresh);
    window.addEventListener("open-notifications", show);
    return () => {
      ++requestVersion.current;
      clearTimeout(initialLoad);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("notifications-changed", refresh);
      window.removeEventListener("open-notifications", show);
    };
  }, [load]);
  async function mutate(url: string, method: string, body: object) {
    if (busy) return;
    setBusy(true); setError(""); ++version.current;
    try {
      const response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "알림을 처리하지 못했습니다.");
      await load();
      router.refresh();
    } catch (error) { setError(error instanceof Error ? error.message : "알림을 처리하지 못했습니다."); }
    finally { setBusy(false); }
  }
  const count = (data?.requests.length || 0) + (data?.comments.length || 0);
  return <div ref={dropdown} className="notification-dropdown" onBlur={(event) => {
    if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <button ref={trigger} type="button" className="nav-link notification-trigger" title="알림" aria-label={`알림 ${count}개`} aria-expanded={open} aria-controls="notification-panel" onClick={() => { setOpen(!open); if (!open) void load(); }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM9 21h6" /></svg>
      {count > 0 && <span className="notification-count" aria-hidden="true">{count > 99 ? "99+" : count}</span>}
    </button>
    {open && <section id="notification-panel" className="notification-panel" aria-label="알림">
      <div className="notification-panel-heading"><h2>알림</h2><button type="button" className="nav-link" aria-label="알림 닫기" onClick={() => { setOpen(false); trigger.current?.focus(); }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button></div>
      <div className="notification-inbox">
        {error && <p role="alert" className="composer-error">{error} <button type="button" className="text-link" onClick={() => void load()}>다시 불러오기</button></p>}
        {!data && !error && <p role="status">알림을 불러오는 중...</p>}
        {!!data?.requests.length && <section aria-label="친구 요청" className="notification-requests">
          <h3>친구 요청 <span>{data.requests.length}</span></h3>
          {data.requests.map((request) => <article key={request.id} className="notification-item">
            <Link href={`/blog/${request.user.id}`} className="notification-person" onClick={() => setOpen(false)}><Avatar src={request.user.image} name={request.user.name} size={32} /><strong>{request.user.nickname || request.user.name || "개발자"}</strong></Link>
            <p>친구 요청을 보냈습니다.</p>
            <div className="notification-actions"><button type="button" className="button button-primary" disabled={busy} onClick={() => void mutate(`/api/friend-requests/${request.id}`, "PATCH", { action: "accept" })}>수락</button><button type="button" className="button button-secondary" disabled={busy} onClick={() => void mutate(`/api/friend-requests/${request.id}`, "PATCH", { action: "reject" })}>거절</button></div>
          </article>)}
        </section>}
        <section aria-label="댓글 알림">
          <div className="notification-heading"><h3>댓글 알림</h3><button type="button" className="text-link" disabled={busy || !data?.comments.length} onClick={() => void mutate("/api/notifications", "DELETE", { all: true })}>전체 삭제</button></div>
          {data?.comments.map((notification) => <article key={notification.id} className="notification-item">
            <Link href={`/posts/${notification.comment.post.id}#comments`} onClick={() => setOpen(false)}>
              <p><strong>{notification.comment.nickname}</strong>님이 {notification.comment.parentId ? "답글" : "댓글"}을 남겼습니다.</p>
            </Link>
            <p className="notification-post-title">{notification.comment.post.title}</p>
            <p className="line-clamp-2">{notification.comment.content}</p>
            <div className="notification-actions"><time dateTime={notification.createdAt}>{new Date(notification.createdAt).toLocaleString("ko-KR")}</time><button type="button" className="text-link" disabled={busy} aria-label={`${notification.comment.nickname}님의 댓글 알림 삭제`} onClick={() => void mutate("/api/notifications", "DELETE", { id: notification.id })}>삭제</button></div>
          </article>)}
          {data && !data.comments.length && <p className="comment-hint">댓글 알림이 없습니다.</p>}
        </section>
      </div>
    </section>}
  </div>;
}
