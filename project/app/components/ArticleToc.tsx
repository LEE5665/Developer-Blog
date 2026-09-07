"use client";

import { useEffect, useState } from "react";
import type { OutlineItem } from "@/lib/post-content";

export function ArticleToc({ items }: { items: OutlineItem[] }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = (document.querySelector(".site-header")?.getBoundingClientRect().height || 80) + 36;
      let current = items[0]?.id || "";
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= offset) current = item.id;
      }
      setActive(current);
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    scroll();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); };
  }, [items]);
  if (!items.length) return null;
  return <nav className="article-toc" aria-label="글 목차"><span className="blog-sidebar-label">목차</span><ol>{items.map((item) => <li key={item.id} style={{ paddingLeft: (item.level - 2) * 12 }}><a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={(event) => {
    event.preventDefault();
    const target = document.getElementById(item.id);
    if (!target) return;
    window.history.replaceState(window.history.state, "", `#${item.id}`);
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    setActive(item.id);
  }}>{item.text}</a></li>)}</ol></nav>;
}
