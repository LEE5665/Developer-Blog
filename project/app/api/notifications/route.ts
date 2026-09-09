import { publishUserEvents } from "@/lib/realtime";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkMutation } from "@/lib/engagement";
import { PostError, postFailure } from "@/lib/post-service";

export async function GET() {
  try {
    const userId = (await auth())?.user?.id;
    if (!userId) throw new PostError("로그인이 필요합니다.", 401);
    const [requests, comments] = await Promise.all([
      prisma.friendship.findMany({ where: { friendId: userId, status: "PENDING" }, orderBy: [{ createdAt: "desc" }, { id: "desc" }], select: { id: true, createdAt: true, user: { select: { id: true, name: true, nickname: true, image: true } } } }),
      prisma.notification.findMany({ where: { recipientId: userId }, orderBy: [{ createdAt: "desc" }, { id: "desc" }], select: { id: true, createdAt: true, comment: { select: { id: true, nickname: true, content: true, post: { select: { id: true, title: true } } } } } }),
    ]);
    return Response.json({ requests, comments }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) { return postFailure(error); }
}

export async function DELETE(request: Request) {
  try {
    checkMutation(request);
    const userId = (await auth())?.user?.id;
    if (!userId) throw new PostError("로그인이 필요합니다.", 401);
    const body = await request.json();
    if (body?.all !== true && (typeof body?.id !== "string" || !body.id)) throw new PostError("삭제할 알림을 선택해주세요.");
    // Friend requests live separately and can only be accepted or rejected.
    await prisma.notification.deleteMany({ where: { recipientId: userId, ...(body.all === true ? {} : { id: body.id }) } });
    await publishUserEvents([userId], { type: "notifications" });
    return Response.json({ success: true });
  } catch (error) { return postFailure(error); }
}
