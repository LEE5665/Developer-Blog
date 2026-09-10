"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Post = { id: string; title: string; updatedAt: string; visibility: string; categoryId: string | null };
type Category = { id: string; name: string; isDivider: boolean };
const visibilityLabels: Record<string, string> = { PUBLIC: "전체 공개", FRIENDS: "친구 공개", PRIVATE: "비공개" };

export function BulkPostManager({ posts, categories }: { posts: Post[]; categories: Category[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [visibility, setVisibility] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [saving, setSaving] = useState(false);
  const [refreshing, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const busy = saving || refreshing;
  const selectedPosts = posts.filter((post) => selected.includes(post.id));
  const allSelected = posts.length > 0 && selectedPosts.length === posts.length;

  async function apply() {
    if (busy || !selectedPosts.length || (!visibility && !categoryId)) return;
    setSaving(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/posts/bulk", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts: selectedPosts.map(({ id, updatedAt }) => ({ id, updatedAt })),
          ...(visibility ? { visibility } : {}), ...(categoryId ? { categoryId: categoryId === "none" ? null : categoryId } : {}) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "변경 사항을 저장하지 못했습니다.");
      setSelected([]); setVisibility(""); setCategoryId("");
      setMessage(`${result.count}개 글의 설정을 변경했습니다.`);
      startTransition(() => router.refresh());
    } catch (error) { setError(error instanceof Error ? error.message : "변경 사항을 저장하지 못했습니다. 다시 시도해주세요."); }
    finally { setSaving(false); }
  }

  return <div className="space-y-4">
    <p className="text-sm text-zinc-500">현재 페이지의 글을 선택해 설정을 한 번에 변경하세요. 페이지나 카테고리를 이동하면 선택이 해제됩니다.</p>
    <fieldset disabled={busy} className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2"><input type="checkbox" checked={allSelected} disabled={!posts.length} onChange={() => setSelected(allSelected ? [] : posts.map((post) => post.id))} />현재 페이지 전체 선택</label>
        <span className="text-sm">{selectedPosts.length}개 선택</span>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-sm">공개 범위<select className="rounded-lg border p-2 bg-white dark:bg-zinc-900" value={visibility} onChange={(event) => setVisibility(event.target.value)}><option value="">변경하지 않음</option>{Object.entries(visibilityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label className="flex flex-col gap-1 text-sm">이동할 카테고리<select className="max-w-full rounded-lg border p-2 bg-white dark:bg-zinc-900" value={categoryId} onChange={(event) => setCategoryId(event.target.value)}><option value="">변경하지 않음</option><option value="none">미분류</option>{categories.filter((category) => !category.isDivider).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
        <button type="button" className="button button-primary" disabled={busy || !selectedPosts.length || (!visibility && !categoryId)} onClick={() => void apply()}>{busy ? "변경 중…" : "선택한 글에 적용"}</button>
      </div>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">{posts.map((post) => <label key={post.id} className="flex items-center gap-3 py-4 cursor-pointer">
        <input type="checkbox" checked={selected.includes(post.id)} onChange={(event) => setSelected(event.target.checked ? [...selected, post.id] : selected.filter((id) => id !== post.id))} />
        <span className="min-w-0"><span className="block break-words font-medium">{post.title}</span><span className="text-sm text-zinc-500">{visibilityLabels[post.visibility]} · {categories.find((category) => category.id === post.categoryId)?.name || "미분류"}</span></span>
      </label>)}</div>
    </fieldset>
    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    {message && <p role="status" className="text-sm text-emerald-600">{message}</p>}
  </div>;
}
