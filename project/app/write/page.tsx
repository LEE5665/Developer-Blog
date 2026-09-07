import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { WriteForm } from "./WriteForm";

export default async function WritePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 사용자가 마이페이지에서 설정한 카테고리 목록 조회
  const categories = await prisma.category.findMany({
    where: { userId: session.user.id },
    orderBy: { order: "asc" },
    select: {
      id: true,
      name: true,
      isDivider: true,
    },
  });

  return (
    <main className="composer-page">
      <WriteForm categories={categories} userId={session.user.id} />
    </main>
  );
}
