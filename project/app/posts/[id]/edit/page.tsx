import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { WriteForm } from "@/app/write/WriteForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const { id } = await params;
  const post = await prisma.post.findFirst({ where: { id, authorId: session.user.id } });
  if (!post) notFound();
  const categories = await prisma.category.findMany({ where: { userId: session.user.id }, orderBy: { order: "asc" }, select: { id: true, name: true, isDivider: true } });
  return <main className="composer-page"><WriteForm key={post.id} categories={categories} userId={session.user.id} initialPost={{ id: post.id, title: post.title, content: post.content, tags: post.tags, categoryId: post.categoryId, visibility: post.visibility, updatedAt: post.updatedAt.toISOString() }} /></main>;
}
