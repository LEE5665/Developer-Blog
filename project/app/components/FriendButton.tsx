"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./Icon";

type Friendship = { userId: string; status: "PENDING" | "ACCEPTED" } | null;
export function FriendButton({ authorId, viewerId, friendship }: { authorId: string; viewerId?: string; friendship: Friendship }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  if (authorId === viewerId) return null;
  if (!viewerId) return <Link href="/login" className="button button-secondary w-full"><Icon name="users" width={16} height={16} />친구 추가</Link>;
  async function send() {
    if (busy) return;
    setBusy(true); setError("");
    try {
      const response = await fetch(`/api/friends/${authorId}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "친구 요청을 보내지 못했습니다.");
      router.refresh();
      window.dispatchEvent(new Event("notifications-changed"));
    } catch (error) { setError(error instanceof Error ? error.message : "요청에 실패했습니다."); }
    finally { setBusy(false); }
  }
  return <div className="friend-control">
    {friendship?.status === "ACCEPTED" ? <span className="button button-secondary w-full"><Icon name="users" width={16} height={16} />친구</span>
      : friendship && friendship.userId !== viewerId ? <button type="button" className="button button-secondary w-full" onClick={() => window.dispatchEvent(new Event("open-notifications"))}>받은 친구 요청 확인</button>
      : <button type="button" className="button button-secondary w-full" disabled={busy || !!friendship} onClick={send}><Icon name="users" width={16} height={16} />{friendship ? "친구 요청 중" : busy ? "요청 중..." : "친구 추가"}</button>}
    {friendship?.status === "ACCEPTED" && <button type="button" className="button button-primary w-full mt-2" onClick={() => window.dispatchEvent(new CustomEvent("open-chat", { detail: { userId: authorId } }))}>메시지 보내기</button>}
    {error && <p role="alert" className="composer-error">{error}</p>}
  </div>;
}
