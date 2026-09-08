import { randomUUID, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkMutation, fingerprint, readablePost } from "@/lib/engagement";
import { postFailure } from "@/lib/post-service";
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    checkMutation(request);
    const { id } = await params;
    let userId: string | undefined;
    try {
      userId = (await auth())?.user?.id;
    } catch {
      userId = undefined;
    }
    const post = await readablePost(id, userId);
    if (userId !== post.authorId) {
      let identity = "user:" + userId;
      if (!userId) {
        const jar = await cookies();
        const parts = jar.get("blog-visitor")?.value.split(".") || [];
        let visitor = parts[0];
        const signature = parts[1];
        const expected = visitor ? fingerprint("visitor:" + visitor) : "";
        if (!/^[0-9a-f-]{36}$/.test(visitor || "") || !/^[0-9a-f]{64}$/.test(signature || "") || signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
          visitor = randomUUID();
          jar.set("blog-visitor", visitor + "." + fingerprint("visitor:" + visitor), { httpOnly: true, sameSite: "lax", secure: new URL(process.env.AUTH_URL || request.url).protocol === "https:", path: "/", maxAge: 31536000 });
        }
        identity = "visitor:" + visitor;
      }
      await prisma.postView.createMany({ data: [{ postId: id, viewerHash: fingerprint(identity), day: new Date().toISOString().slice(0, 10) }], skipDuplicates: true });
    }
    return Response.json({ views: await prisma.postView.count({ where: { postId: id } }) });
  } catch (error) { return postFailure(error); }
}
