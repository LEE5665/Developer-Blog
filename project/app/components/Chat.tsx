"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar";

type Peer = { id: string; name: string | null; nickname: string | null; image: string | null };
type Message = { id: number; senderId: string; content: string; createdAt: string };
type Conversation = { id: string; peer: Peer; lastMessage: Message | null; unread: number };
type Page = { messages: Message[]; peer: Peer; peerRead: number; canSend: boolean; hasMore: boolean };
function messageId() {
  // getRandomValues also works on local-network HTTP development addresses.
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
async function api<T>(url: string, method = "GET", body?: object): Promise<T> {
  const response = await fetch(url, { method, cache: "no-store", ...(body ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {}) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "메시지를 불러오지 못했습니다.");
  return result;
}
function ChatIcon() { return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5A8.5 8.5 0 0 1 10.5 3h2a8.5 8.5 0 0 1 8.5 8.5ZM7 9h10M7 13h7" /></svg>; }
function CloseIcon() { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>; }

export function Chat({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const sequence = useRef(0);
  const opening = useRef(0);
  const load = useCallback(async () => {
    const version = ++sequence.current;
    try {
      const result = await api<{ conversations: Conversation[] }>("/api/chat");
      if (sequence.current === version) { setConversations(result.conversations); setError(""); }
    } catch (error) { if (sequence.current === version) setError(error instanceof Error ? error.message : "대화를 불러오지 못했습니다."); }
  }, []);
  useEffect(() => {
    const refresh = () => { void load(); };
    const start = async (event: Event) => {
      const peerId = (event as CustomEvent<{ userId?: string }>).detail?.userId;
      if (!peerId) return;
      const version = ++opening.current;
      setOpen(true); setRoomId(null); setLoading(true); setError("");
      try {
        const result = await api<{ conversation: { id: string } }>("/api/chat", "POST", { userId: peerId });
        if (version === opening.current) { setRoomId(result.conversation.id); void load(); }
      } catch (error) { if (version === opening.current) setError(error instanceof Error ? error.message : "대화를 시작하지 못했습니다."); }
      finally { if (version === opening.current) setLoading(false); }
    };
    const timer = setTimeout(refresh, 0);
    window.addEventListener("chat-changed", refresh);
    window.addEventListener("chat-list-changed", refresh);
    window.addEventListener("open-chat", start);
    return () => { clearTimeout(timer); window.removeEventListener("chat-changed", refresh); window.removeEventListener("chat-list-changed", refresh); window.removeEventListener("open-chat", start); };
  }, [load]);
  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { ++opening.current; setOpen(false); trigger.current?.focus(); } };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  const count = conversations.reduce((sum, room) => sum + room.unread, 0);
  return <>
    <button ref={trigger} type="button" title="메시지" className="nav-link notification-trigger" aria-label={`메시지 ${count}개 읽지 않음`} aria-expanded={open} aria-controls="chat-panel" onClick={() => { ++opening.current; setOpen(!open); setLoading(false); if (!open) void load(); }}><ChatIcon />{count > 0 && <span className="notification-count" aria-hidden="true">{count > 99 ? "99+" : count}</span>}</button>
    {open && createPortal(<section ref={panel} tabIndex={-1} id="chat-panel" className="chat-panel" role="dialog" aria-label="메시지">
      <div className="chat-heading"><div className="flex items-center gap-3">{roomId && <button type="button" aria-label="대화 목록으로" className="text-link" onClick={() => { setRoomId(null); void load(); }}>←</button>}<h2>메시지</h2></div><button type="button" aria-label="메시지 닫기" onClick={() => { ++opening.current; setOpen(false); trigger.current?.focus(); }}><CloseIcon /></button></div>
      {roomId ? <ChatRoom key={roomId} id={roomId} userId={userId} /> : <div className="chat-conversations">
        {loading && <p role="status" className="comment-hint">대화를 여는 중...</p>}
        {error && <p role="alert" className="composer-error">{error} <button type="button" className="text-link" onClick={() => void load()}>다시 불러오기</button></p>}
        {!conversations.length && !loading && !error && <div className="empty-state"><h3>친구와 이야기를 나눠보세요</h3><p>친구관리 또는 친구 블로그에서 메시지를 보낼 수 있습니다.</p><Link href="/mypage?tab=friends" className="button button-secondary" onClick={() => setOpen(false)}>친구관리</Link></div>}
        {conversations.map((room) => <button type="button" key={room.id} className="chat-conversation" disabled={loading} onClick={() => setRoomId(room.id)}><Avatar src={room.peer.image} name={room.peer.name} size={40} /><span className="chat-conversation-text"><strong>{room.peer.nickname || room.peer.name || "개발자"}</strong><span>{room.lastMessage?.content || "새로운 대화를 시작하세요."}</span></span><span className="chat-conversation-meta">{room.lastMessage && <time dateTime={room.lastMessage.createdAt}>{new Date(room.lastMessage.createdAt).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" })}</time>}{room.unread > 0 && <b>{room.unread}</b>}</span></button>)}
      </div>}
    </section>, document.body)}
  </>;
}

function ChatRoom({ id, userId }: { id: string; userId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [peerRead, setPeerRead] = useState(0);
  const [canSend, setCanSend] = useState(false);
  const [hasOlder, setHasOlder] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [olderLoading, setOlderLoading] = useState(false);
  const [error, setError] = useState("");
  const [sendError, setSendError] = useState("");
  const scroll = useRef<HTMLDivElement>(null);
  const newest = useRef(0);
  const lastRead = useRef(0);
  const bottom = useRef(true);
  const pendingSend = useRef<{ content: string; clientId: string } | null>(null);
  const compose = useRef<HTMLTextAreaElement>(null);
  const url = `/api/chat/${id}`;
  useEffect(() => {
    let cancelled = false, running = false, queued = false;
    const refresh = async () => {
      if (running) { queued = true; return; }
      running = true;
      try {
        do {
          queued = false;
          const initial = newest.current === 0;
          let page: Page;
          const incoming: Message[] = [];
          let cursor = newest.current;
          do {
            page = await api<Page>(url + (cursor ? `?after=${cursor}` : ""));
            if (cancelled) return;
            incoming.push(...page.messages);
            if (page.messages.length) cursor = page.messages.at(-1)!.id;
          } while (!initial && page.hasMore && page.messages.length);
          if (initial) setHasOlder(page.hasMore);
          newest.current = cursor;
          setPeer(page.peer); setPeerRead(page.peerRead); setCanSend(page.canSend); setError("");
          setMessages((current) => [...new Map([...current, ...incoming].map((message) => [message.id, message])).values()].sort((a, b) => a.id - b.id));
          if (cursor > lastRead.current && document.visibilityState === "visible" && document.hasFocus() && bottom.current) {
            await api(url, "PATCH", { messageId: cursor });
            lastRead.current = cursor;
          }
        } while (queued && !cancelled);
      } catch (error) { if (!cancelled) setError(error instanceof Error ? error.message : "메시지를 불러오지 못했습니다."); }
      finally { running = false; }
    };
    const update = () => { void refresh(); };
    const timer = setTimeout(update, 0);
    window.addEventListener("chat-changed", update);
    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", update);
    return () => { cancelled = true; clearTimeout(timer); window.removeEventListener("chat-changed", update); window.removeEventListener("focus", update); document.removeEventListener("visibilitychange", update); };
  }, [url]);
  useEffect(() => { if (bottom.current && scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight; }, [messages]);
  async function older() {
    if (!messages.length || olderLoading) return;
    setOlderLoading(true);
    const container = scroll.current;
    const height = container?.scrollHeight || 0;
    const top = container?.scrollTop || 0;
    try {
      const page = await api<Page>(`${url}?before=${messages[0].id}`);
      bottom.current = false;
      setMessages((current) => [...new Map([...page.messages, ...current].map((message) => [message.id, message])).values()].sort((a, b) => a.id - b.id));
      setHasOlder(page.hasMore);
      requestAnimationFrame(() => { if (container) container.scrollTop = top + container.scrollHeight - height; });
    } catch (error) { setError(error instanceof Error ? error.message : "이전 메시지를 불러오지 못했습니다."); }
    finally { setOlderLoading(false); }
  }
  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (sending || !draft.trim() || !canSend) return;
    setSending(true); setSendError("");
    const content = draft.trim();
    try {
      if (pendingSend.current?.content !== content) pendingSend.current = { content, clientId: messageId() };
      const result = await api<{ message: Message }>(url, "POST", pendingSend.current);
      pendingSend.current = null;
      setDraft("");
      bottom.current = true;
      setMessages((current) => {
        const next = new Map(current.map((message) => [message.id, message]));
        next.set(result.message.id, result.message);
        newest.current = Math.max(newest.current, result.message.id);
        return [...next.values()].sort((a, b) => a.id - b.id);
      });
      requestAnimationFrame(() => compose.current?.focus());
      window.dispatchEvent(new Event("chat-list-changed"));
    } catch (error) { setSendError(error instanceof Error ? error.message : "메시지를 보내지 못했습니다."); }
    finally { setSending(false); }
  }
  return <>
    {peer && <Link className="chat-peer" href={`/blog/${peer.id}`}><Avatar src={peer.image} name={peer.name} size={30} /><strong>{peer.nickname || peer.name || "개발자"}</strong></Link>}
    <div ref={scroll} className="chat-messages" onScroll={() => {
      const element = scroll.current;
      if (!element) return;
      const wasBottom = bottom.current;
      bottom.current = element.scrollHeight - element.scrollTop - element.clientHeight < 48;
      if (bottom.current && !wasBottom) window.dispatchEvent(new Event("chat-changed"));
    }}>
      {hasOlder && <button type="button" className="text-link chat-older" disabled={olderLoading} onClick={() => void older()}>{olderLoading ? "불러오는 중..." : "이전 메시지 더 보기"}</button>}
      {!peer && !error && <p role="status" className="comment-hint">메시지를 불러오는 중...</p>}
      {messages.map((message) => <div key={message.id} className={`chat-message ${message.senderId === userId ? "chat-message-mine" : ""}`}><p>{message.content}</p><span>{message.senderId === userId && (message.id <= peerRead ? "읽음 · " : "안 읽음 · ")}<time dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleString("ko-KR", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</time></span></div>)}
      {peer && !messages.length && <p className="comment-hint">첫 메시지를 보내보세요.</p>}
      {error && <p role="alert" className="composer-error">{error} <button type="button" className="text-link" onClick={() => window.dispatchEvent(new Event("chat-changed"))}>다시 불러오기</button></p>}
    </div>
    {peer && !canSend && <p className="chat-disabled">현재 친구가 아니므로 메시지를 보낼 수 없습니다.</p>}
    {sendError && <p role="alert" className="composer-error chat-send-error">{sendError}</p>}
    <form className="chat-compose" onSubmit={send}><textarea ref={compose} aria-label="메시지 내용" placeholder="메시지 입력 (Enter 전송, Shift+Enter 줄바꿈)" rows={2} maxLength={2000} value={draft} readOnly={sending || !canSend} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} /><button type="submit" className="button button-primary" disabled={sending || !canSend || !draft.trim()}>{sending ? "전송 중" : "전송"}</button></form>
  </>;
}
