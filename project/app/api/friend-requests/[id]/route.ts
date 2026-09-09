import { publishUserEvents } from "@/lib/realtime";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkMutation } from "@/lib/engagement";
import { PostError, postFailure } from "@/lib/post-service";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    checkMutation(request);
    const userId = (await auth())?.user?.id;
    if (!userId) throw new PostError("로그인이 필요합니다.", 401);
    const { id } = await params;
    const body = await request.json();
    if (body?.action !== "accept" && body?.action !== "reject") throw new PostError("수락 또는 거절을 선택해주세요.");
    const where = { id, friendId: userId, status: "PENDING" as const };
    const pending = await prisma.friendship.findFirst({ where });
    const result = body.action === "accept"
      ? await prisma.friendship.updateMany({ where, data: { status: "ACCEPTED" } })
      : await prisma.friendship.deleteMany({ where });
    if (!result.count) throw new PostError("이미 처리되었거나 존재하지 않는 친구 요청입니다.", 404);
    await publishUserEvents([userId, ...(pending ? [pending.userId] : [])], { type: "friends" });
    return Response.json({ success: true });
  } catch (error) { return postFailure(error); }
}
