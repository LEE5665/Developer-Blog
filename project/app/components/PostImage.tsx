"use client";

import { useState } from "react";
import { Modal } from "./Modal";

export function PostImage({ src, alt, title, width }: { src: string; alt: string; title?: string; width?: string }) {
  const [open, setOpen] = useState(false);
  return <>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} title={title} style={width ? { width } : undefined} loading="lazy" referrerPolicy="no-referrer" role="button" tabIndex={0} aria-label={alt ? `${alt} 크게 보기` : "이미지 크게 보기"} onClick={() => setOpen(true)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setOpen(true); } }} />
    <Modal open={open} onClose={() => setOpen(false)} title="이미지 크게 보기" wide>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="post-image-expanded" referrerPolicy="no-referrer" />
    </Modal>
  </>;
}
