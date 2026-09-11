import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkMutation, limitAction } from "@/lib/engagement";
import { PostError, postFailure } from "@/lib/post-service";
import { parseFriendHandle } from "@/lib/friend-handle";
import { sendFriendRequest } from "@/lib/friend-request";

export async function POST(request: Request) {
  try {
    checkMutation(request);
    const senderId = (await auth())?.user?.id;
    if (!senderId) throw new PostError("로그인이 필요합니다.", 401);
    await limitAction(request, "friend-request", senderId, 20);
    const body = await request.json().catch(() => null);
    const handle = parseFriendHandle(body?.handle);
    if (!handle) throw new PostError("닉네임#태그 형식으로 입력해주세요. 태그는 숫자 4자리입니다.");
    const recipient = await prisma.user.findFirst({ where: handle, select: { id: true } });
    if (!recipient) throw new PostError("일치하는 사용자가 없습니다. 닉네임과 태그를 확인해주세요.", 404);
    const friendship = await sendFriendRequest(senderId, recipient.id);
    const status = friendship.status === "ACCEPTED" ? "friends" : friendship.userId === senderId ? "sent" : "received";
    return Response.json({ status });
  } catch (error) { return postFailure(error); }
}
