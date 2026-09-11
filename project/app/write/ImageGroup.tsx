"use client";

import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { useRef, useState } from "react";
import { imageGroupWidths } from "@/lib/post-content";

function ImageGroupView({ node, updateAttributes, editor, getPos }: NodeViewProps) {
  const row = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<number[] | null>(null);
  const images = Array.from({ length: node.childCount }, (_, i) => node.child(i).toJSON());
  const widths = draft || imageGroupWidths(node.attrs.widths, images.length);
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
      <span>이미지 {images.length}장 · 경계로 너비 조절</span>
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
    <div ref={row} className="image-group" style={{ gridTemplateColumns: widths.map(w => `${w}fr`).join(" ") }}>
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
  </NodeViewWrapper>;
}

export const ImageGroup = Node.create({
  name: "imageGroup", group: "block", content: "image{2,3}", atom: true, draggable: true,
  addAttributes() { return { widths: { default: null, parseHTML: element => element.getAttribute("data-widths"), renderHTML: attrs => ({ "data-widths": attrs.widths }) } }; },
  parseHTML() { return [{ tag: 'div[data-image-group]' }]; },
  renderHTML({ HTMLAttributes }) { return ["div", mergeAttributes(HTMLAttributes, { "data-image-group": "" }), 0]; },
  addNodeView() { return ReactNodeViewRenderer(ImageGroupView); },
});
