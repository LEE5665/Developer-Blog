import { auth } from "@/lib/auth";
import { redisClient, userChannel } from "@/lib/realtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = (await auth())?.user?.id;
  if (!userId) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const subscriber = redisClient();
  try { await subscriber.connect(); }
  catch { if (subscriber.isOpen) subscriber.destroy(); return Response.json({ error: "실시간 연결을 다시 시도합니다." }, { status: 503 }); }
  const encoder = new TextEncoder();
  let cleanup = () => {};
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let closed = false;
      let heartbeat: ReturnType<typeof setInterval> | undefined;
      let lifetime: ReturnType<typeof setTimeout> | undefined;
      const send = (text: string) => { if (!closed) controller.enqueue(encoder.encode(text)); };
      cleanup = () => {
        if (closed) return;
        closed = true;
        clearInterval(heartbeat); clearTimeout(lifetime);
        request.signal.removeEventListener("abort", cleanup);
        if (subscriber.isOpen) subscriber.destroy();
        try { controller.close(); } catch { /* Already cancelled by the browser. */ }
      };
      request.signal.addEventListener("abort", cleanup, { once: true });
      subscriber.on("error", cleanup);
      if (request.signal.aborted) { cleanup(); return; }
      void subscriber.subscribe(userChannel(userId), (message) => send(`event: update\ndata: ${message}\n\n`)).then(() => {
        if (closed) return;
        send("retry: 3000\nevent: ready\ndata: {}\n\n");
        heartbeat = setInterval(() => send(": heartbeat\n\n"), 15000);
        // Reconnect periodically to revalidate the session and reconcile missed events.
        lifetime = setTimeout(cleanup, 240000);
      }).catch(cleanup);
    },
    cancel() { cleanup(); },
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "private, no-cache, no-transform", "X-Accel-Buffering": "no" } });
}
