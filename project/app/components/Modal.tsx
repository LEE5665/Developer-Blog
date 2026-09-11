"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Modal({ open, onClose, title, children, wide = false, closable = true }: { open: boolean; onClose?: () => void; title: string; children: ReactNode; wide?: boolean; closable?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog?.open) dialog?.showModal();
    if (!open && dialog?.open) dialog?.close();
  }, [open]);
  return <dialog ref={ref} className={`editor-modal ${wide ? "editor-modal-wide" : ""}`} aria-label={title} onCancel={(event) => { event.preventDefault(); if (closable) onClose?.(); }} onClose={closable ? onClose : undefined}>
    <div className="modal-heading"><h2>{title}</h2>{closable && onClose && <button type="button" onClick={onClose} aria-label="닫기"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button>}</div>
    {open && children}
  </dialog>;
}
