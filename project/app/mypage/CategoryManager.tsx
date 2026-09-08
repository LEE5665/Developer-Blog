"use client";

import { Icon } from "@/app/components/Icon";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface CategoryItem {
  id: string;
  name: string;
  isDivider: boolean;
  order: number;
  _count?: {
    posts: number;
  };
}

export function CategoryManager({ categories: initialCategories }: { categories: CategoryItem[] }) {
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialCategories.length > 0 ? initialCategories[0].id : null
  );

  // 수정용 상태
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Adjust local state when refreshed server data changes.
  const [previousCategories, setPreviousCategories] = useState(initialCategories);
  if (previousCategories !== initialCategories) {
    setPreviousCategories(initialCategories);
    setCategories(initialCategories);
    if (!initialCategories.some((category) => category.id === selectedId)) {
      setSelectedId(initialCategories[0]?.id ?? null);
    }
  }

  const selectedCategory = categories.find((category) => category.id === selectedId);
  const selectionKey = JSON.stringify([selectedCategory?.id, selectedCategory?.name]);
  const [previousSelection, setPreviousSelection] = useState("");
  if (selectionKey !== previousSelection) {
    setPreviousSelection(selectionKey);
    setEditName(selectedCategory ? (selectedCategory.isDivider ? "--" : selectedCategory.name) : "");
    setSaveSuccess(false);
    setError(null);
  }

  // 1. 새 카테고리 추가
  const handleAddCategory = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "새 카테고리", isDivider: false }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "카테고리 추가 실패");
      } else if (data.category) {
        const newCat = { ...data.category, _count: { posts: 0 } };
        setCategories((prev) => [...prev, newCat]);
        setSelectedId(newCat.id);
        setEditName(newCat.name);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("서버 통신 실패");
    } finally {
      setLoading(false);
    }
  };

  // 2. 구분선 추가
  const handleAddDivider = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "--", isDivider: true }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "구분선 추가 실패");
      } else if (data.category) {
        const newDiv = { ...data.category, _count: { posts: 0 } };
        setCategories((prev) => [...prev, newDiv]);
        setSelectedId(newDiv.id);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("서버 통신 실패");
    } finally {
      setLoading(false);
    }
  };

  // 3. 선택된 항목 위/아래 이동
  const handleMove = async (direction: "up" | "down") => {
    if (!selectedId) return;

    const index = categories.findIndex((c) => c.id === selectedId);
    if (index === -1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const newCategories = [...categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[targetIndex];
    newCategories[targetIndex] = temp;

    setCategories(newCategories);

    try {
      const categoryIds = newCategories.map((c) => c.id);
      await fetch("/api/categories/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryIds }),
      });
      router.refresh();
    } catch (err) {
      console.error("순서 변경 실패:", err);
      setCategories(initialCategories);
    }
  };

  // 4. 선택된 항목 이름 수정 저장 (PATCH /api/categories)
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || selectedCategory.isDivider) return;

    const trimmed = editName.trim();
    if (!trimmed) {
      setError("카테고리 이름을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/categories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedCategory.id,
          name: trimmed,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "카테고리 수정 실패");
      } else {
        setCategories((prev) =>
          prev.map((c) => (c.id === selectedCategory.id ? { ...c, name: trimmed } : c))
        );
        setSaveSuccess(true);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("서버 통신 오류");
    } finally {
      setLoading(false);
    }
  };

  // 5. 선택된 카테고리/구분선 삭제 (DELETE /api/categories?id=...)
  const handleDelete = async (cat: CategoryItem) => {
    const postCount = cat._count?.posts ?? 0;
    const message = cat.isDivider
      ? "구분선을 삭제하시겠습니까?"
      : `[경고] "${cat.name}" 카테고리를 삭제하면 포함된 모든 게시글(${postCount}개)이 영구적으로 삭제됩니다!\n\n정말로 삭제하시겠습니까?`;

    if (!window.confirm(message)) return;

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/categories?id=${cat.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "카테고리 삭제 실패");
      } else {
        const remaining = categories.filter((item) => item.id !== cat.id);
        setCategories(remaining);
        setSelectedId(remaining.length > 0 ? remaining[0].id : null);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("서버 통신 실패");
    } finally {
      setLoading(false);
    }
  };

  const selectedIndex = categories.findIndex((c) => c.id === selectedId);

  return (
    <div className="space-y-6">
      {/* 타이틀 및 설명 */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
          카테고리 관리
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          왼쪽 목록에서 카테고리 위치를 정렬하고, 오른쪽에서 카테고리 세부 정보를 수정하세요.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-sm font-medium">
          {error}
        </div>
      )}

      {/* 2단 분할 레이아웃 (왼쪽: 메뉴 목록 / 오른쪽: 수정 페이지) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* ── [왼쪽] 카테고리 메뉴 목록 (5 cols) ── */}
        <div className="md:col-span-5 space-y-3">
          {/* 상단 컴팩트 툴바 */}
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleAddCategory}
                disabled={loading}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition shadow-xs"
              >
                + 카테고리 추가
              </button>
              <button
                type="button"
                onClick={handleAddDivider}
                disabled={loading}
                className="px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
              >
                + 구분선 추가
              </button>
            </div>

            {/* 순서 이동 버튼 (▲, ▼) */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleMove("up")}
                disabled={selectedIndex <= 0 || loading}
                className="w-7 h-7 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-25 text-zinc-600 dark:text-zinc-400 text-xs transition"
                title="위로 이동"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => handleMove("down")}
                disabled={selectedIndex === -1 || selectedIndex >= categories.length - 1 || loading}
                className="w-7 h-7 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-25 text-zinc-600 dark:text-zinc-400 text-xs transition"
                title="아래로 이동"
              >
                ▼
              </button>
            </div>
          </div>

          {/* 카테고리 목록 상자 (구분 실선 없이 심플하고 컴팩트함) */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/60 p-2 min-h-[320px] max-h-[460px] overflow-y-auto space-y-1">
            {categories.length > 0 ? (
              categories.map((cat) => {
                const isSelected = cat.id === selectedId;

                // ── 구분선 항목인 경우: 글자 없이 순수 실선으로 표시 ──
                if (cat.isDivider) {
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedId(cat.id)}
                      className={`py-2.5 px-3 rounded-lg cursor-pointer transition ${
                        isSelected
                          ? "bg-zinc-200/80 dark:bg-zinc-800/80 ring-1 ring-zinc-400 dark:ring-zinc-600"
                          : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                      }`}
                      title="구분선 (클릭하여 선택)"
                    >
                      <hr
                        className={`border-t transition ${
                          isSelected
                            ? "border-zinc-900 dark:border-white border-t-2"
                            : "border-zinc-300 dark:border-zinc-700"
                        }`}
                      />
                    </div>
                  );
                }

                // ── 일반 카테고리 항목인 경우: 간결하고 콤팩트한 행 ──
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedId(cat.id)}
                    className={`py-2 px-3 rounded-xl text-xs sm:text-sm flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold shadow-xs"
                        : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon name="folder" className="shrink-0" width={16} height={16} />
                      <span className="truncate">{cat.name}</span>
                    </div>

                    <span
                      className={`text-xs font-mono ml-2 shrink-0 ${
                        isSelected
                          ? "text-zinc-300 dark:text-zinc-600"
                          : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    >
                      ({cat._count?.posts ?? 0})
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-zinc-400">
                카테고리가 없습니다.
                <br />
                상단의 [+ 카테고리 추가] 버튼을 눌러보세요.
              </div>
            )}
          </div>
        </div>

        {/* ── [오른쪽] 카테고리 수정 페이지 (7 cols) ── */}
        <div className="md:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 min-h-[320px] shadow-xs flex flex-col justify-between">
          {selectedCategory ? (
            selectedCategory.isDivider ? (
              /* 구분선 상세 정보 및 삭제 */
              <div className="space-y-6">
                <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span>구분선 설정</span>
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    블로그 카테고리 목록 사이에 삽입되는 구분선입니다.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  왼쪽의 <strong>▲ / ▼ 버튼</strong>을 클릭하여 구분선의 위치를 원하는 카테고리 사이로 이동할 수 있습니다.
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedCategory)}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 transition"
                  >
                    구분선 삭제
                  </button>
                </div>
              </div>
            ) : (
              /* 일반 카테고리 수정 폼 */
              <form onSubmit={handleUpdateName} className="space-y-6">
                <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span>카테고리 수정</span>
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    선택한 카테고리의 이름을 변경하거나 삭제할 수 있습니다.
                  </p>
                </div>

                {saveSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                    카테고리 이름이 성공적으로 변경되었습니다.
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      카테고리명 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => {
                        setEditName(e.target.value);
                        setSaveSuccess(false);
                      }}
                      placeholder="카테고리 이름"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      포함된 글 수
                    </div>
                    <div className="text-sm font-bold font-mono text-zinc-900 dark:text-white">
                      {selectedCategory._count?.posts ?? 0}개의 게시글
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      카테고리 삭제 시 속한 게시글도 모두 함께 삭제됩니다.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedCategory)}
                    disabled={loading}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 transition"
                  >
                    카테고리 삭제
                  </button>

                  <button
                    type="submit"
                    disabled={loading || !editName.trim()}
                    className="px-5 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition shadow-xs"
                  >
                    {loading ? "저장 중..." : "수정 저장"}
                  </button>
                </div>
              </form>
            )
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-zinc-400 space-y-2">
              <Icon name="folder" className="mx-auto text-muted" width={28} height={28} />
              <p className="text-xs">
                왼쪽 목록에서 카테고리를 선택하거나,
                <br />
                <strong>[+ 카테고리 추가]</strong>를 눌러보세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
