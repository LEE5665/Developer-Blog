"use client";

import { useState } from "react";

export function Avatar({ src, name, size = 32 }: { src?: string | null; name?: string | null; size?: number }) {
  const [failed, setFailed] = useState<string | null>(null);
  return <span className="profile-photo" style={{ width: size, height: size }}>
    {src && src !== failed ? (
      // Profile providers may use rotating URLs; load directly with a visible fallback.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={`${name || "작성자"} 프로필 사진`} width={size} height={size} referrerPolicy="no-referrer" onError={() => setFailed(src)} />
    ) : <span aria-label={`${name || "작성자"} 기본 프로필`}>{(name || "D").slice(0, 1)}</span>}
  </span>;
}
