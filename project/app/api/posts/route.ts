import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { consumeDraft, mediaTransaction, postFailure, refreshOrphans, setPostImages, validatePost } from "@/lib/post-service";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const userId = session.user.id;
  try {
    const body = await request.json();
    const post = await mediaTransaction(async (tx) => {
      const { data, names } = await validatePost(tx, body, userId);
      await consumeDraft(tx, userId, "new", body.draftVersion);
      const post = await tx.post.create({ data: { ...data, authorId: userId } });
      await setPostImages(tx, post.id, names);
      await refreshOrphans(tx);
      return post;
    });
    return Response.json({ post }, { status: 201 });
  } catch (error) { return postFailure(error); }
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const posts = await prisma.post.findMany({ where: { authorId: session.user.id }, orderBy: { createdAt: "desc" } });
  return Response.json({ posts });
}
