import { publishUserEvents } from "@/lib/realtime";
import { lockPair } from "@/lib/chat";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkMutation, limitAction } from "@/lib/engagement";
import { PostError, postFailure } from "@/lib/post-service";
import { sendFriendRequest } from "@/lib/friend-request";

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    checkMutation(request);
    const userId = (await auth())?.user?.id;
    if (!userId) throw new PostError("로그인이 필요합니다.", 401);
    const { userId: friendId } = await params;
    await prisma.$transaction(async (tx) => {
      await lockPair(tx, userId, friendId);
      await tx.friendship.deleteMany({ where: { status: "ACCEPTED", OR: [{ userId, friendId }, { userId: friendId, friendId: userId }] } });
    });
    await publishUserEvents([userId, friendId], { type: "friends" });
    return Response.json({ success: true });
  } catch (error) { return postFailure(error); }
}

export async function POST(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    checkMutation(request);
    const senderId = (await auth())?.user?.id;
    if (!senderId) throw new PostError("로그인이 필요합니다.", 401);
    const { userId: recipientId } = await params;
    if (senderId === recipientId) throw new PostError("자신에게 친구 요청을 보낼 수 없습니다.");
    await limitAction(request, "friend-request", senderId, 20);
    const friendship = await sendFriendRequest(senderId, recipientId);
    return Response.json({ friendship });
  } catch (error) { return postFailure(error); }
}
