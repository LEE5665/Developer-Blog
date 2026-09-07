import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// 비밀번호 수정/설정 API (PATCH /api/user/password)
export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "새 비밀번호는 최소 6자 이상이어야 합니다." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 기존 비밀번호가 설정되어 있는 경우, 현재 비밀번호 검증
    if (user.passwordHash) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "현재 비밀번호를 입력해주세요." },
          { status: 400 }
        );
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "현재 비밀번호가 일치하지 않습니다." },
          { status: 400 }
        );
      }
    }

    // 새 비밀번호 해싱 및 저장
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { passwordHash: hashedNewPassword },
    });

    return NextResponse.json({
      success: true,
      message: "비밀번호가 성공적으로 변경되었습니다.",
    });
  } catch (err) {
    console.error("비밀번호 변경 에러:", err);
    return NextResponse.json(
      { error: "비밀번호 변경 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
