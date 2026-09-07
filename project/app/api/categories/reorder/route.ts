import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// 카테고리 순서 일괄 변경 API (PUT /api/categories/reorder)
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { categoryIds } = body;

    if (!Array.isArray(categoryIds)) {
      return NextResponse.json(
        { error: "잘못된 요청 형식입니다." },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // 트랜잭션으로 순서(order) 일괄 업데이트
    await prisma.$transaction(
      categoryIds.map((id: string, index: number) =>
        prisma.category.updateMany({
          where: { id, userId },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("카테고리 순서 변경 에러:", err);
    return NextResponse.json(
      { error: "순서 변경 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
