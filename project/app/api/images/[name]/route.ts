import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { imageOwner, readImage } from "@/lib/image-storage";
import { imageSources, readDocument } from "@/lib/post-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, max-age=300, stale-while-revalidate=60", "X-Content-Type-Options": "nosniff" };

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  try {
    const ownerId = await imageOwner(name);
    if (!ownerId) return new Response(null, { status: 404, headers });
    const session = await auth();
    const viewerId = session?.user?.id;
    let allowed = viewerId === ownerId;
    if (!allowed) {
      const url = `/api/images/${name}`;
      const posts = await prisma.post.findMany({ where: { authorId: ownerId, content: { contains: url }, visibility: { in: viewerId ? ["PUBLIC", "FRIENDS"] : ["PUBLIC"] } }, select: { content: true, visibility: true } });
      const matching = posts.filter((post) => {
        const doc = readDocument(post.content);
        return doc && imageSources(doc).includes(url);
      });
      allowed = matching.some((post) => post.visibility === "PUBLIC");
      if (!allowed && viewerId && matching.some((post) => post.visibility === "FRIENDS")) {
        allowed = Boolean(await prisma.friendship.findFirst({ where: { status: "ACCEPTED", OR: [{ userId: ownerId, friendId: viewerId }, { userId: viewerId, friendId: ownerId }] }, select: { id: true } }));
      }
    }
    if (!allowed) return new Response(null, { status: 404, headers });
    return new Response(new Uint8Array(await readImage(name)), { headers: { ...headers, "Content-Type": "image/webp", "Content-Disposition": `inline; filename="${name}"` } });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return new Response(null, { status: 404, headers });
    console.error("이미지 조회 실패:", error);
    return new Response(null, { status: 500, headers });
  }
}
