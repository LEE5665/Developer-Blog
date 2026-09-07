import { timingSafeEqual } from "node:crypto";
import { cleanupImages } from "@/lib/image-cleanup";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  const provided = request.headers.get("authorization") || "";
  const expected = `Bearer ${secret}`;
  if (!secret || Buffer.byteLength(provided) !== Buffer.byteLength(expected) || !timingSafeEqual(Buffer.from(provided), Buffer.from(expected))) return new Response(null, { status: 401 });
  try { return Response.json(await cleanupImages()); }
  catch (error) { console.error("이미지 정리 오류:", error); return Response.json({ error: "정리 작업에 실패했습니다." }, { status: 500 }); }
}
