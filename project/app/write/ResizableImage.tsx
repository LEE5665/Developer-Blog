"use client";

import { useRef, useState, useCallback } from "react";
import { NodeViewWrapper, type NodeViewProps, ReactNodeViewRenderer } from "@tiptap/react";
import ImageExtension from "@tiptap/extension-image";

export function ResizableImageComponent({ node, updateAttributes, selected, deleteNode }: NodeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [dragPercent, setDragPercent] = useState<number | null>(null);
  const activePercentRef = useRef<number | null>(null);

  const initialWidth = (typeof node.attrs.width === "string" ? node.attrs.width : null) || "100%";
  const currentWidth = dragPercent !== null ? `${dragPercent}%` : initialWidth;

  const handlePointerDown = useCallback((direction: "left" | "right") => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const img = imgRef.current;
    if (!img) return;

    const startX = e.clientX;
    const startWidth = img.getBoundingClientRect().width;
    const parent = (containerRef.current?.closest(".composer-body") as HTMLElement) || containerRef.current?.parentElement || document.body;
    const parentWidth = parent.clientWidth || 800;

    setIsResizing(true);
    let latest = Math.min(100, Math.max(15, Math.round((startWidth / parentWidth) * 100)));
    activePercentRef.current = latest;
    setDragPercent(latest);

    const onPointerMove = (moveEvent: PointerEvent) => {
      moveEvent.preventDefault();
      const deltaX = moveEvent.clientX - startX;
      const change = direction === "right" ? deltaX * 2 : -deltaX * 2;
      const targetWidth = Math.max(80, Math.min(parentWidth, startWidth + change));
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

  return (
    <NodeViewWrapper className="resizable-image-wrapper">
      <div
        ref={containerRef}
        className={`resizable-image-box ${selected ? "is-selected" : ""} ${isResizing ? "is-resizing" : ""}`}
        style={{ width: currentWidth }}
      >
        <img
          ref={imgRef}
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          title={node.attrs.title || undefined}
          draggable={false}
          className="resizable-image-element"
        />

        {selected && (
          <>
            <div
              className="resize-handle resize-handle-left"
              title="드래그하여 크기 조절 (더블 클릭 시 100%)"
              onPointerDown={handlePointerDown("left")}
              onDoubleClick={() => setPreset(100)}
            >
              <div className="resize-handle-bar" />
            </div>
            <div
              className="resize-handle resize-handle-right"
              title="드래그하여 크기 조절 (더블 클릭 시 100%)"
              onPointerDown={handlePointerDown("right")}
              onDoubleClick={() => setPreset(100)}
            >
              <div className="resize-handle-bar" />
            </div>

            <div className="resize-toolbar">
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
              <div className="resize-toolbar-divider" />
              <span className="resize-toolbar-size">
                {isResizing ? `${dragPercent}%` : initialWidth}
              </span>
              <div className="resize-toolbar-divider" />
              <button
                type="button"
                className={`resize-btn ${initialWidth === "25%" ? "active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setPreset(25)}
              >
                25%
              </button>
              <button
                type="button"
                className={`resize-btn ${initialWidth === "50%" ? "active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setPreset(50)}
              >
                50%
              </button>
              <button
                type="button"
                className={`resize-btn ${initialWidth === "75%" ? "active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setPreset(75)}
              >
                75%
              </button>
              <button
                type="button"
                className={`resize-btn ${initialWidth === "100%" ? "active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setPreset(100)}
              >
                100%
              </button>
              <div className="resize-toolbar-divider" />
              <button
                type="button"
                className="resize-btn resize-btn-danger"
                title="이미지 삭제"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => deleteNode()}
              >
                삭제
              </button>
            </div>
          </>
        )}

        {isResizing && (
          <div className="resize-badge">
            {dragPercent}%
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}

export const ResizableImage = ImageExtension.extend({
  name: "image",
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.style.width || element.getAttribute("width") || null,
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return {
            style: `width: ${attributes.width}`,
            width: attributes.width,
          };
        },
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});
