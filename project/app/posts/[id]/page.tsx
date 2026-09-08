import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { blogData } from "@/lib/blog-data";
import { BlogExplorer } from "@/app/components/BlogExplorer";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const post = await prisma.post.findUnique({ where: { id }, select: { authorId: true } });
  if (!post) notFound();
  const data = await blogData(post.authorId, session?.user?.id);
  if (!data || !data.posts.some((post) => post.id === id)) notFound();
  return <main className="page-container"><BlogExplorer key={id} data={data} initialPostId={id} /></main>;
}
