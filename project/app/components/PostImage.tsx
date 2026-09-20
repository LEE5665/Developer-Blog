"use client";

import { useState, useRef, useEffect, useCallback, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Modal } from "./Modal";

export function PostImage({ src, alt, title, width }: { src: string; alt: string; title?: string; width?: string }) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetTransform = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    resetTransform();
  }, [resetTransform]);

  const updateScale = useCallback((delta: number) => {
    setScale((prev) => {
      const next = Math.max(0.5, Math.min(5, Number((prev + delta).toFixed(2))));
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // 네이티브 wheel 이벤트로 부드러운 마우스 휠 확대/축소 (기본 스크롤 방지)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !open) return;

    const onWheel = (e: globalThis.WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.2 : 0.833;
      setScale((prev) => {
        const next = Math.max(0.5, Math.min(5, Number((prev * zoomFactor).toFixed(2))));
        if (next <= 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [open]);

  // 마우스 드래그로 화면 이동 (Pan)
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    hasMoved.current = false;
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: globalThis.MouseEvent) => {
      const nextX = e.clientX - dragStart.current.x;
      const nextY = e.clientY - dragStart.current.y;
      if (Math.abs(nextX - position.x) > 4 || Math.abs(nextY - position.y) > 4) {
        hasMoved.current = true;
      }
      setPosition({ x: nextX, y: nextY });
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, position.x, position.y]);

  // 이미지 클릭 시 (드래그가 아닐 때만) 1배 <-> 2배 토글
  const handleClick = () => {
    if (hasMoved.current) return;
    if (scale <= 1) {
      setScale(2);
    } else {
      resetTransform();
    }
  };

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        title={title}
        style={{ width: width || "100%" }}
        loading="lazy"
        referrerPolicy="no-referrer"
        role="button"
        tabIndex={0}
        aria-label={alt ? `${alt} 원본 보기` : "이미지 원본 보기"}
        onClick={() => {
          resetTransform();
          setOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            resetTransform();
            setOpen(true);
          }
        }}
      />
      {open &&
        createPortal(
          <Modal
            open={open}
            onClose={handleClose}
            title={alt ? `${alt} · 이미지 뷰어` : "이미지 원본 보기"}
            wide
            className="editor-modal-image"
            actions={
              <div className="image-viewer-actions" role="toolbar" aria-label="이미지 확대/축소 도구">
                <button
                  type="button"
                  className="image-viewer-btn"
                  onClick={() => updateScale(-0.5)}
                  disabled={scale <= 0.5}
                  title="축소"
                  aria-label="축소"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="image-viewer-scale">{Math.round(scale * 100)}%</span>
                <button
                  type="button"
                  className="image-viewer-btn"
                  onClick={() => updateScale(0.5)}
                  disabled={scale >= 5}
                  title="확대"
                  aria-label="확대"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                {(scale !== 1 || position.x !== 0 || position.y !== 0) && (
                  <button
                    type="button"
                    className="image-viewer-btn"
                    onClick={resetTransform}
                    title="원본 100% 맞춤으로 초기화"
                  >
                    100%
                  </button>
                )}
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="image-viewer-btn"
                  title="새 탭에서 원본 보기"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  새 탭
                </a>
              </div>
            }
          >
            <div
              ref={containerRef}
              className="post-image-modal-body"
              onMouseDown={handleMouseDown}
              onDoubleClick={resetTransform}
              style={{
                cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
              }}
              title={
                scale > 1
                  ? "드래그하여 이동 · 마우스 휠로 배율 조절 · 더블클릭시 100%"
                  : "클릭 또는 마우스 휠로 확대"
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="post-image-expanded"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.12s ease-out",
                  maxWidth: "100%",
                  maxHeight: "calc(100svh - 180px)",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                  pointerEvents: "auto",
                }}
                onClick={handleClick}
                referrerPolicy="no-referrer"
                draggable={false}
              />
            </div>
          </Modal>,
          document.body
        )}
    </>
  );
}
