import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkMutation, readablePost } from "@/lib/engagement";
import { PostError, postFailure } from "@/lib/post-service";
async function change(request: Request, params: Promise<{ id: string }>, like: boolean) {
  try {
    checkMutation(request);
    const userId = (await auth())?.user?.id;
    if (!userId) throw new PostError("좋아요는 로그인 후 이용할 수 있습니다.", 401);
    const { id } = await params;
    await readablePost(id, userId);
    if (like) await prisma.postLike.createMany({ data: [{ postId: id, userId }], skipDuplicates: true });
    else await prisma.postLike.deleteMany({ where: { postId: id, userId } });
    return Response.json({ liked: like, likes: await prisma.postLike.count({ where: { postId: id } }) });
  } catch (error) { return postFailure(error); }
}
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) { return change(request, params, true); }
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) { return change(request, params, false); }
