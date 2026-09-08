import { createHmac } from "node:crypto";
import prisma from "./prisma";
import { visiblePosts } from "./post-access";
import { PostError } from "./post-service";

export async function readablePost(id: string, viewerId?: string) {
  const post = await prisma.post.findUnique({ where: { id }, select: { id: true, authorId: true } });
  if (!post || !await prisma.post.findFirst({ where: { id, ...await visiblePosts(post.authorId, viewerId) }, select: { id: true } })) throw new PostError("글을 찾을 수 없습니다.", 404);
  return post;
}
export function checkMutation(request: Request) {
  const origin = request.headers.get("origin");
  const expected = new URL(process.env.AUTH_URL || request.url).origin;
  if ((origin && origin !== expected) || request.headers.get("sec-fetch-site") === "cross-site") throw new PostError("허용되지 않은 요청입니다.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new PostError("JSON 요청이 필요합니다.", 415);
}
export function fingerprint(value: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is required");
  return createHmac("sha256", secret).update(value).digest("hex");
}
export async function limitAction(request: Request, action: string, identity = "", max = 20, minutes = 10) {
  // Only trust forwarded addresses when the deployment proxy overwrites them.
  const address = process.env.TRUST_PROXY === "true" ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown" : "shared";
  const key = fingerprint(action + ":" + (identity || address));
  const resetAt = new Date(Date.now() + minutes * 60_000);
  const [row] = await prisma.$queryRaw<{ count: number }[]>`INSERT INTO "ActionLimit" ("key", "count", "resetAt") VALUES (${key}, 1, ${resetAt})
    ON CONFLICT ("key") DO UPDATE SET "count" = CASE WHEN "ActionLimit"."resetAt" <= NOW() THEN 1 ELSE "ActionLimit"."count" + 1 END,
    "resetAt" = CASE WHEN "ActionLimit"."resetAt" <= NOW() THEN EXCLUDED."resetAt" ELSE "ActionLimit"."resetAt" END RETURNING "count"`;
  if (row.count > max) throw new PostError("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.", 429);
  await prisma.actionLimit.deleteMany({ where: { resetAt: { lt: new Date(Date.now() - 86400_000) } } });
}
export function commentContent(value: unknown) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > 2000) throw new PostError("댓글은 1~2,000자로 입력해주세요.");
  return value.trim();
}
export function commentPassword(value: unknown) {
  if (typeof value !== "string" || value.length < 4 || Buffer.byteLength(value, "utf8") > 72) throw new PostError("댓글 비밀번호는 4자 이상, 72바이트 이하로 입력해주세요.");
  return value;
}
