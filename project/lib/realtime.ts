import { createClient } from "redis";

export type RealtimeEvent = { type: "notifications" | "chat" | "friends"; conversationId?: string };
export function redisClient() {
  const client = createClient({ url: process.env.REDIS_URL || "redis://127.0.0.1:6379", disableOfflineQueue: true, socket: { connectTimeout: 2000, reconnectStrategy: false } });
  client.on("error", () => { /* The caller handles failure without exposing connection credentials. */ });
  return client;
}
const shared = globalThis as unknown as { realtimePublisher?: ReturnType<typeof redisClient>; realtimeConnecting?: Promise<unknown> };
export function userChannel(userId: string) { return `${process.env.REDIS_CHANNEL_PREFIX || "developer-blog"}:user:${userId}`; }
export async function publishUserEvents(userIds: string[], event: RealtimeEvent) {
  try {
    const client = shared.realtimePublisher ??= redisClient();
    if (!client.isReady) {
      shared.realtimeConnecting ??= client.connect().finally(() => { shared.realtimeConnecting = undefined; });
      await shared.realtimeConnecting;
    }
    await Promise.all([...new Set(userIds)].map((id) => client.publish(userChannel(id), JSON.stringify(event))));
  } catch {
    // PostgreSQL is authoritative; clients reconcile on reconnect and periodically.
    console.warn("Realtime delivery unavailable; persisted data will be reconciled.");
  }
}
