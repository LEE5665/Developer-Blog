"use client";

import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { useRef, useState, useCallback } from "react";
import { imageGroupWidths } from "@/lib/post-content";

function ImageGroupView({ node, updateAttributes, editor, getPos }: NodeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<number[] | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [dragPercent, setDragPercent] = useState<number | null>(null);
  const activePercentRef = useRef<number | null>(null);

  const images = Array.from({ length: node.childCount }, (_, i) => node.child(i).toJSON());
  const widths = draft || imageGroupWidths(node.attrs.widths, images.length);
  const mode = node.attrs.mode === "natural" ? "natural" : "fill";
  const initialWidth = (typeof node.attrs.width === "string" ? node.attrs.width : null) || "100%";
  const currentWidth = dragPercent !== null ? `${dragPercent}%` : initialWidth;

  const handlePointerDown = useCallback((direction: "left" | "right") => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const box = containerRef.current;
    if (!box) return;

    const startX = e.clientX;
    const startWidth = box.getBoundingClientRect().width;
    const parent = (box.closest(".composer-body") as HTMLElement) || box.parentElement || document.body;
    const parentWidth = parent.clientWidth || 800;

    setIsResizing(true);
    let latest = Math.min(100, Math.max(15, Math.round((startWidth / parentWidth) * 100)));
    activePercentRef.current = latest;
    setDragPercent(latest);

    const onPointerMove = (moveEvent: PointerEvent) => {
      moveEvent.preventDefault();
      const deltaX = moveEvent.clientX - startX;
      const change = direction === "right" ? deltaX * 2 : -deltaX * 2;
      const targetWidth = Math.max(120, Math.min(parentWidth, startWidth + change));
      latest = Math.min(100, Math.max(15, Math.round((targetWidth / parentWidth) * 100)));
      activePercentRef.current = latest;
      setDragPercent(latest);
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      setIsResizing(false);
      if (activePercentRef.current !== null) {
        updateAttributes({ width: `${activePercentRef.current}%` });
        activePercentRef.current = null;
      }
      setDragPercent(null);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }, [updateAttributes]);

  const setPreset = useCallback((percent: number) => {
    updateAttributes({ width: `${percent}%` });
  }, [updateAttributes]);

  function replace(content: typeof images) {
    const pos = getPos();
    if (typeof pos !== "number") return;
    editor.chain().focus().insertContentAt({ from: pos, to: pos + node.nodeSize }, content.length === 1 ? content : { type: "imageGroup", content }).run();
  }
  function resize(index: number, delta: number, base = widths) {
    const next = [...base];
    const total = base[index] + base[index + 1];
    next[index] = Math.max(15, Math.min(total - 15, base[index] + delta));
    next[index + 1] = total - next[index];
    return next;
  }
  return <NodeViewWrapper className="image-group-editor" contentEditable={false}>
    {/* Keep ProseMirror's child DOM in an explicit hidden host. The grid below
        renders these same images; without a host Tiptap appends them visibly. */}
    <NodeViewContent hidden aria-hidden="true" style={{ display: "none" }} />
    <div className="image-group-actions">
      <div
        className="resize-btn resize-drag-btn"
        data-drag-handle
        title="마우스로 끌어서 원하는 위치(위/아래)로 이동"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="9" cy="6" r="1.8" /><circle cx="15" cy="6" r="1.8" />
          <circle cx="9" cy="12" r="1.8" /><circle cx="15" cy="12" r="1.8" />
          <circle cx="9" cy="18" r="1.8" /><circle cx="15" cy="18" r="1.8" />
        </svg>
        <span>이동</span>
      </div>
      <span>이미지 {images.length}장</span>
      <div className="resize-toolbar-divider" />
      <button type="button" className={`resize-btn ${mode === "fill" ? "active" : ""}`} onClick={() => updateAttributes({ mode: "fill" })} title="모든 사진의 높이를 동일하게 맞춥니다">높이 맞춤</button>
      <button type="button" className={`resize-btn ${mode === "natural" ? "active" : ""}`} onClick={() => updateAttributes({ mode: "natural" })} title="사진의 원본 비율을 보존하며 중앙 정렬합니다">원본 비율</button>
      <div className="resize-toolbar-divider" />
      <span className="resize-toolbar-size">
        {isResizing ? `${dragPercent}%` : initialWidth}
      </span>
      <div className="resize-toolbar-divider" />
      <button type="button" className={`resize-btn ${initialWidth === "25%" ? "active" : ""}`} onMouseDown={e => e.preventDefault()} onClick={() => setPreset(25)}>25%</button>
      <button type="button" className={`resize-btn ${initialWidth === "50%" ? "active" : ""}`} onMouseDown={e => e.preventDefault()} onClick={() => setPreset(50)}>50%</button>
      <button type="button" className={`resize-btn ${initialWidth === "75%" ? "active" : ""}`} onMouseDown={e => e.preventDefault()} onClick={() => setPreset(75)}>75%</button>
      <button type="button" className={`resize-btn ${initialWidth === "100%" ? "active" : ""}`} onMouseDown={e => e.preventDefault()} onClick={() => setPreset(100)}>100%</button>
      <div className="resize-toolbar-divider" />
      <button type="button" onClick={() => updateAttributes({ widths: null })}>같은 너비</button>
      <button type="button" onClick={() => {
        const pos = getPos();
        if (typeof pos === "number") editor.chain().focus().insertContentAt({ from: pos, to: pos + node.nodeSize }, images).run();
      }}>묶음 해제</button>
      {images.length < 3 && <button type="button" onClick={() => {
        const pos = getPos();
        if (typeof pos !== "number") return;
        const next = editor.state.doc.nodeAt(pos + node.nodeSize);
        if (next?.type.name === "image") editor.chain().focus().insertContentAt({ from: pos, to: pos + node.nodeSize + next.nodeSize }, { type: "imageGroup", content: [...images, next.toJSON()] }).run();
      }}>다음 사진 합치기</button>}
    </div>
    <div
      ref={containerRef}
      className={`resizable-image-box image-group-resizable-box ${isResizing ? "is-resizing" : ""}`}
      style={{ width: currentWidth, margin: "0 auto", position: "relative" }}
    >
      <div ref={row} className={`image-group ${mode === "fill" ? "image-group-fill" : "image-group-natural"}`} style={{ gridTemplateColumns: widths.map(w => `${w}fr`).join(" ") }}>
        {images.map((img, index) => <div className="image-group-cell" key={index}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.attrs?.src} alt={img.attrs?.alt || ""} draggable={false} />
          <div className="image-group-actions">
            <button type="button" disabled={index === 0} aria-label={`${index + 1}번째 사진 앞으로`} onClick={() => { const copy = [...images]; [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]]; replace(copy); }}>←</button>
            <button type="button" disabled={index === images.length - 1} aria-label={`${index + 1}번째 사진 뒤로`} onClick={() => { const copy = [...images]; [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]]; replace(copy); }}>→</button>
            <button type="button" onClick={() => replace(images.filter((_, i) => i !== index))}>삭제</button>
            <button type="button" onClick={() => {
              const pos = getPos();
              if (typeof pos !== "number") return;
              const remaining = images.filter((_, i) => i !== index);
              editor.chain().focus().insertContentAt({ from: pos, to: pos + node.nodeSize }, [remaining.length === 1 ? remaining[0] : { type: "imageGroup", content: remaining }, img]).run();
            }}>따로 놓기</button>
          </div>
          {index < images.length - 1 && <div className="image-group-divider" role="separator" aria-label={`${index + 1}번째 사진 너비`} aria-orientation="vertical" aria-valuenow={Math.round(widths[index])} aria-valuemin={15} aria-valuemax={Math.round(widths[index] + widths[index + 1] - 15)} tabIndex={0}
            onKeyDown={event => { if (["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); updateAttributes({ widths: resize(index, event.key === "ArrowLeft" ? -2 : 2).join(",") }); } }}
            onPointerDown={event => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); const start = event.clientX; const base = [...widths]; const available = (row.current?.clientWidth || 1) - (images.length - 1) * 16; let latest = base;
              const target = event.currentTarget;
              const move = (e: PointerEvent) => { latest = resize(index, (e.clientX - start) / available * 100, base); setDraft(latest); };
              const finish = () => { target.removeEventListener("pointermove", move); target.removeEventListener("pointerup", finish); target.removeEventListener("pointercancel", finish); updateAttributes({ widths: latest.join(",") }); setDraft(null); };
              target.addEventListener("pointermove", move); target.addEventListener("pointerup", finish); target.addEventListener("pointercancel", finish);
            }} />}
        </div>)}
      </div>

      <div
        className="resize-handle resize-handle-left"
        title="드래그하여 묶음 전체 크기 조절 (더블 클릭 시 100%)"
        onPointerDown={handlePointerDown("left")}
        onDoubleClick={() => setPreset(100)}
      >
        <div className="resize-handle-bar" />
      </div>
      <div
        className="resize-handle resize-handle-right"
        title="드래그하여 묶음 전체 크기 조절 (더블 클릭 시 100%)"
        onPointerDown={handlePointerDown("right")}
        onDoubleClick={() => setPreset(100)}
      >
        <div className="resize-handle-bar" />
      </div>

      {isResizing && (
        <div className="resize-badge">
          {dragPercent}%
        </div>
      )}
    </div>
  </NodeViewWrapper>;
}

export const ImageGroup = Node.create({
  name: "imageGroup", group: "block", content: "image{2,3}", atom: true, draggable: true,
  addAttributes() {
    return {
      widths: { default: null, parseHTML: element => element.getAttribute("data-widths"), renderHTML: attrs => ({ "data-widths": attrs.widths }) },
      mode: { default: "fill", parseHTML: element => element.getAttribute("data-mode") || "fill", renderHTML: attrs => ({ "data-mode": attrs.mode || "fill" }) },
      width: { default: "100%", parseHTML: element => element.getAttribute("data-width") || "100%", renderHTML: attrs => ({ "data-width": attrs.width || "100%" }) },
    };
  },
  parseHTML() { return [{ tag: 'div[data-image-group]' }]; },
  renderHTML({ HTMLAttributes }) { return ["div", mergeAttributes(HTMLAttributes, { "data-image-group": "" }), 0]; },
  addNodeView() { return ReactNodeViewRenderer(ImageGroupView); },
});
