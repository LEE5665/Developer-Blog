"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RealtimeEvents() {
  const router = useRouter();
  useEffect(() => {
    const events = new EventSource("/api/events");
    const reconcile = () => {
      window.dispatchEvent(new Event("notifications-changed"));
      window.dispatchEvent(new Event("chat-changed"));
    };
    events.addEventListener("ready", reconcile);
    events.addEventListener("update", (event) => {
      try {
        const payload = JSON.parse((event as MessageEvent).data);
        if (payload.type === "notifications") window.dispatchEvent(new Event("notifications-changed"));
        if (payload.type === "chat") window.dispatchEvent(new CustomEvent("chat-changed", { detail: payload }));
        if (payload.type === "friends") { reconcile(); router.refresh(); }
      } catch { /* Ignore malformed events; HTTP remains the source of truth. */ }
    });
    const fallback = window.setInterval(() => { if (document.visibilityState === "visible") reconcile(); }, 30000);
    window.addEventListener("focus", reconcile);
    return () => { events.close(); clearInterval(fallback); window.removeEventListener("focus", reconcile); };
  }, [router]);
  return null;
}
