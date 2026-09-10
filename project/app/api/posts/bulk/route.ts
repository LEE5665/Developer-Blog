import { auth } from "@/lib/auth";
import { mediaTransaction, PostError, postFailure } from "@/lib/post-service";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  const userId = session.user.id;
  try {
    const body = await request.json();
    if (!body || !Array.isArray(body.posts) || !body.posts.length || body.posts.length > 100 ||
      body.posts.some((post: { id?: unknown; updatedAt?: unknown } | null) => !post || typeof post.id !== "string" || !post.id || typeof post.updatedAt !== "string" || !Number.isFinite(Date.parse(post.updatedAt)))) {
      throw new PostError("변경할 글을 1~100개 선택해주세요.");
    }
    const posts = body.posts as { id: string; updatedAt: string }[];
    if (new Set(posts.map((post) => post.id)).size !== posts.length) throw new PostError("중복된 글이 있습니다.");
    const data: { visibility?: "PUBLIC" | "FRIENDS" | "PRIVATE"; categoryId?: string | null } = {};
    if (body.visibility !== undefined) {
      if (!["PUBLIC", "FRIENDS", "PRIVATE"].includes(body.visibility)) throw new PostError("공개 범위를 확인해주세요.");
      data.visibility = body.visibility;
    }
    if (body.categoryId !== undefined) {
      if (body.categoryId !== null && (typeof body.categoryId !== "string" || !body.categoryId)) throw new PostError("카테고리를 확인해주세요.");
      data.categoryId = body.categoryId;
    }
    if (!Object.keys(data).length) throw new PostError("변경할 설정을 선택해주세요.");
    const count = await mediaTransaction(async (tx) => {
      if (data.categoryId && !await tx.category.findFirst({ where: { id: data.categoryId, userId, isDivider: false } })) {
        throw new PostError("사용할 수 없는 카테고리입니다. 다시 선택해주세요.");
      }
      const owned = await tx.post.count({ where: { id: { in: posts.map((post) => post.id) }, authorId: userId } });
      if (owned !== posts.length) throw new PostError("선택한 글을 찾을 수 없거나 변경 권한이 없습니다.", 404);
      const result = await tx.post.updateMany({
        where: { authorId: userId, OR: posts.map((post) => ({ id: post.id, updatedAt: new Date(post.updatedAt) })) },
        data,
      });
      if (result.count !== posts.length) throw new PostError("수정된 글이 있습니다. 새로고침 후 다시 선택해주세요. 변경 사항은 저장되지 않았습니다.", 409);
      return result.count;
    });
    return Response.json({ count });
  } catch (error) { return postFailure(error); }
}
