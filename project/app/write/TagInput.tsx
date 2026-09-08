"use client";
import { useState } from "react";
export function TagInput({ tags, onChange, disabled }: { tags: string[]; onChange: (tags: string[]) => void; disabled: boolean }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  function add() {
    const tag = value.trim().replace(/^#+/, "");
    if (!tag) return;
    if (tag.length > 24 || tags.length >= 10) { setError("태그는 24자 이내로 최대 10개까지 추가할 수 있어요."); return; }
    onChange([...new Set([...tags, tag])]); setValue(""); setError("");
  }
  return <div className="tag-editor"><div className="post-tags">{tags.map((tag) => <button type="button" disabled={disabled} key={tag} onClick={() => onChange(tags.filter((item) => item !== tag))} aria-label={tag + " 태그 삭제"}>#{tag}<span aria-hidden="true"> ×</span></button>)}</div><div className="tag-entry"><input aria-label="태그" placeholder="태그 입력 후 Enter" value={value} disabled={disabled} maxLength={24} onChange={(event) => { setValue(event.target.value); setError(""); }} onBlur={add} onKeyDown={(event) => { if (!event.nativeEvent.isComposing && (event.key === "Enter" || event.key === ",")) { event.preventDefault(); add(); } }} /><button type="button" disabled={disabled || !value.trim()} onClick={add}>추가</button><small>{tags.length}/10</small></div>{error && <p role="alert">{error}</p>}</div>;
}
