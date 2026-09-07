import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { mediaTransaction, refreshOrphans } from "@/lib/post-service";

// 카테고리 추가 API (POST /api/categories)
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, isDivider } = body;

    const trimmedName = name?.trim();
    const isDividerBool = Boolean(isDivider || trimmedName === "--");

    if (!trimmedName && !isDividerBool) {
      return NextResponse.json(
        { error: "카테고리 이름을 입력해주세요." },
        { status: 400 }
      );
    }

    // 순서 정렬용 마지막 order 가져오기
    const lastCategory = await prisma.category.findFirst({
      where: { userId: session.user.id },
      orderBy: { order: "desc" },
    });

    const newOrder = (lastCategory?.order ?? 0) + 1;

    const category = await prisma.category.create({
      data: {
        name: isDividerBool ? "--" : trimmedName!,
        isDivider: isDividerBool,
        order: newOrder,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (err) {
    console.error("카테고리 추가 API 에러:", err);
    return NextResponse.json(
      { error: "카테고리 생성 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 카테고리 삭제 API (DELETE /api/categories?id=...)
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("id");

    if (!categoryId) {
      return NextResponse.json(
        { error: "삭제할 카테고리 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category || category.userId !== session.user.id) {
      return NextResponse.json(
        { error: "삭제 권한이 없거나 카테고리가 존재하지 않습니다." },
        { status: 403 }
      );
    }

    await mediaTransaction(async (tx) => {
      await tx.post.deleteMany({ where: { categoryId } });
      await tx.postDraft.updateMany({ where: { userId: session.user!.id, categoryId }, data: { categoryId: null } });
      await tx.category.delete({ where: { id: categoryId } });
      await refreshOrphans(tx);
    });

    return NextResponse.json({
      success: true,
      message: "카테고리와 포함된 글이 모두 삭제되었습니다.",
    });
  } catch (err) {
    console.error("카테고리 삭제 API 에러:", err);
    return NextResponse.json(
      { error: "카테고리 삭제 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 카테고리 이름 수정 API (PATCH /api/categories)
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
    const { id, name } = body;

    const trimmedName = name?.trim();
    if (!id || !trimmedName) {
      return NextResponse.json(
        { error: "카테고리 ID와 이름을 입력해주세요." },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category || category.userId !== session.user.id) {
      return NextResponse.json(
        { error: "수정 권한이 없거나 카테고리가 존재하지 않습니다." },
        { status: 403 }
      );
    }

    const updated = await prisma.category.update({
      where: { id },
      data: { name: trimmedName },
    });

    return NextResponse.json({
      success: true,
      message: "카테고리가 성공적으로 수정되었습니다.",
      category: updated,
    });
  } catch (err) {
    console.error("카테고리 수정 API 에러:", err);
    return NextResponse.json(
      { error: "카테고리 수정 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
