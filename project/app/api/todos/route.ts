import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// 1. Todo 목록 조회 (GET /api/todos?month=YYYY-MM 또는 ?date=YYYY-MM-DD)
export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month"); // 예: "2026-09"
    const date = searchParams.get("date");   // 예: "2026-09-07"

    const whereClause: { userId: string; date?: string | { startsWith: string } } = {
      userId: session.user.id,
    };

    if (date) {
      whereClause.date = date;
    } else if (month) {
      whereClause.date = { startsWith: month };
    }

    const todos = await prisma.todo.findMany({
      where: whereClause,
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ success: true, todos });
  } catch (err) {
    console.error("Todo 조회 에러:", err);
    return NextResponse.json(
      { error: "Todo 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 2. Todo 추가 (POST /api/todos)
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
    const { title, date } = body;

    const trimmedTitle = title?.trim();
    if (!trimmedTitle || !date) {
      return NextResponse.json(
        { error: "할 일 제목과 날짜를 입력해주세요." },
        { status: 400 }
      );
    }

    const todo = await prisma.todo.create({
      data: {
        title: trimmedTitle,
        date,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true, todo }, { status: 201 });
  } catch (err) {
    console.error("Todo 생성 에러:", err);
    return NextResponse.json(
      { error: "Todo 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 3. Todo 완료/수정 (PATCH /api/todos)
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
    const { id, completed, title } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Todo ID가 필요합니다." },
        { status: 400 }
      );
    }

    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo || existingTodo.userId !== session.user.id) {
      return NextResponse.json(
        { error: "수정 권한이 없습니다." },
        { status: 403 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        ...(typeof completed === "boolean" ? { completed } : {}),
        ...(title ? { title: title.trim() } : {}),
      },
    });

    return NextResponse.json({ success: true, todo: updatedTodo });
  } catch (err) {
    console.error("Todo 수정 에러:", err);
    return NextResponse.json(
      { error: "Todo 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 4. Todo 삭제 (DELETE /api/todos?id=...)
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
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "삭제할 Todo ID가 필요합니다." },
        { status: 400 }
      );
    }

    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo || existingTodo.userId !== session.user.id) {
      return NextResponse.json(
        { error: "삭제 권한이 없습니다." },
        { status: 403 }
      );
    }

    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Todo 삭제 에러:", err);
    return NextResponse.json(
      { error: "Todo 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
