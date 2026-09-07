import { auth } from "@/lib/auth";
import { ImageUploadError, MAX_IMAGE_BYTES, saveImage, removeImage } from "@/lib/image-storage";
import { mediaTransaction } from "@/lib/post-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  if (request.headers.get("sec-fetch-site") === "cross-site") return Response.json({ error: "허용되지 않은 요청입니다." }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data;")) return Response.json({ error: "이미지 파일을 선택해주세요." }, { status: 400 });
  try {
    // Enforce the limit while reading, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return Response.json({ error: "이미지 파일이 없습니다." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_IMAGE_BYTES + 64 * 1024) {
        await reader.cancel();
        return Response.json({ error: "10MB 이하의 이미지를 선택해주세요." }, { status: 413 });
      }
      chunks.push(value);
    }
    let form: FormData;
    try { form = await new Response(Buffer.concat(chunks), { headers: { "Content-Type": request.headers.get("content-type")! } }).formData(); }
    catch { return Response.json({ error: "올바른 이미지 파일을 선택해주세요." }, { status: 400 }); }
    const file = form.get("file");
    if (!(file instanceof File)) return Response.json({ error: "이미지 파일이 없습니다." }, { status: 400 });
    const bytes = new Uint8Array(await file.arrayBuffer());
    const result = await mediaTransaction(async (tx) => {
      const result = await saveImage(bytes, session.user!.id!);
      try { await tx.imageAsset.create({ data: { name: result.url.slice(12), ownerId: session.user!.id! } }); }
      catch (error) { await removeImage(result.url.slice(12)); throw error; }
      return result;
    });
    return Response.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof ImageUploadError) return Response.json({ error: error.message }, { status: 400 });
    console.error("이미지 업로드 실패:", error);
    return Response.json({ error: "이미지를 저장하지 못했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
