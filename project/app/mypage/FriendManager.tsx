"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "../components/Avatar";
import { Modal } from "../components/Modal";

export type FriendProfile = { id: string; name: string | null; nickname: string | null; tag: string | null; image: string | null; bio: string | null };

export function FriendManager({ friends }: { friends: FriendProfile[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<FriendProfile | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const filtered = friends.filter((friend) => `${friend.name || ""} ${friend.nickname || ""}#${friend.tag || ""}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  async function remove() {
    if (!selected || busy) return;
    setBusy(true); setError("");
    try {
      const response = await fetch(`/api/friends/${selected.id}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: "{}" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "친구를 삭제하지 못했습니다.");
      setSelected(null);
      router.refresh();
    } catch (error) { setError(error instanceof Error ? error.message : "요청에 실패했습니다."); }
    finally { setBusy(false); }
  }
  return <section aria-label="친구관리">
    <div className="section-heading"><h2>친구관리 <span>{friends.length}</span></h2><button type="button" className="text-link" onClick={() => window.dispatchEvent(new Event("open-notifications"))}>받은 친구 요청</button></div>
    {friends.length > 0 && <input type="search" aria-label="친구 검색" placeholder="이름 또는 닉네임으로 검색" value={query} onChange={(event) => setQuery(event.target.value)} className="friend-search" />}
    {filtered.length ? <div className="friend-grid">{filtered.map((friend) => <article key={friend.id} className="friend-card">
      <Link href={`/blog/${friend.id}`} className="friend-profile"><Avatar src={friend.image} name={friend.name} size={44} /><div><strong>{friend.name || friend.nickname || "개발자"}</strong>{friend.nickname && <small>{friend.nickname}{friend.tag ? `#${friend.tag}` : ""}</small>}</div></Link>
      {friend.bio && <p className="line-clamp-2 friend-bio">{friend.bio}</p>}
      <div className="friend-card-actions"><button type="button" className="friend-action friend-action-message" onClick={() => window.dispatchEvent(new CustomEvent("open-chat", { detail: { userId: friend.id } }))}>메시지</button><Link href={`/blog/${friend.id}`} className="friend-action friend-action-blog">블로그 보기</Link><button type="button" className="friend-action friend-action-remove" onClick={() => { setSelected(friend); setError(""); }}>친구 삭제</button></div>
    </article>)}</div> : <div className="empty-state"><h3>{friends.length ? "검색 결과가 없습니다" : "아직 등록된 친구가 없습니다"}</h3><p>{friends.length ? "다른 이름이나 닉네임으로 검색해보세요." : "다른 사람의 블로그에서 친구 요청을 보내보세요."}</p></div>}
    <Modal open={!!selected} onClose={() => { if (!busy) setSelected(null); }} title="친구 삭제"><div className="modal-form"><p>{selected?.name || selected?.nickname || "이 사용자"}님을 친구에서 삭제할까요? 서로의 친구 공개 글을 볼 수 없게 됩니다.</p>{error && <p role="alert" className="composer-error">{error}</p>}<div className="modal-actions"><button type="button" className="button button-secondary" disabled={busy} onClick={() => setSelected(null)}>취소</button><button type="button" className="button button-primary" disabled={busy} onClick={() => void remove()}>{busy ? "삭제 중..." : "친구 삭제"}</button></div></div></Modal>
  </section>;
}
