import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { generateUniqueTag } from "@/lib/tag";

// 개인정보 수정 API (PATCH /api/user/profile)
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
    const { name, nickname, bio } = body;

    if (bio !== undefined && (typeof bio !== "string" || bio.length > 300)) {
      return NextResponse.json({ error: "자기소개는 300자 이하의 텍스트로 입력해주세요." }, { status: 400 });
    }

    const trimmedName = name?.trim();
    const trimmedNickname = nickname?.trim();

    if (!trimmedName || !trimmedNickname) {
      return NextResponse.json(
        { error: "이름과 닉네임을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    if (trimmedName.includes("#")) return NextResponse.json({ error: "이름에는 # 구분번호를 붙이지 말고 이름만 입력해주세요." }, { status: 400 });

    if (trimmedName.length < 2 || trimmedName.length > 30) {
      return NextResponse.json(
        { error: "이름은 2자 이상 30자 이하로 입력해주세요." },
        { status: 400 }
      );
    }

    if (trimmedNickname.length < 2 || trimmedNickname.length > 20) {
      return NextResponse.json(
        { error: "닉네임은 2자 이상 20자 이하로 입력해주세요." },
        { status: 400 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 닉네임이 변경된 경우: 새 4자리 고유 태그 발급
    let newTag = currentUser.tag;
    if (currentUser.nickname !== trimmedNickname || !newTag) {
      newTag = await generateUniqueTag(trimmedNickname);
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: trimmedName,
        nickname: trimmedNickname,
        ...(bio !== undefined ? { bio: bio.trim() || null } : {}),
        tag: newTag,
      },
    });

    return NextResponse.json({
      success: true,
      message: "개인정보가 성공적으로 수정되었습니다.",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        nickname: updatedUser.nickname,
        bio: updatedUser.bio,
        tag: updatedUser.tag,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    console.error("개인정보 수정 에러:", err);
    return NextResponse.json(
      { error: "개인정보 수정 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
