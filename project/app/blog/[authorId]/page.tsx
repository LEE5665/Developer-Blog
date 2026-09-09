import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { blogData } from "@/lib/blog-data";
import { BlogExplorer } from "@/app/components/BlogExplorer";

export default async function BlogPage({ params, searchParams }: { params: Promise<{ authorId: string }>; searchParams: Promise<{ category?: string; page?: string }> }) {
  const { authorId } = await params;
  const { category, page } = await searchParams;
  const session = await auth();
  const initial = await blogData(authorId, session?.user?.id);
  if (!initial) notFound();
  const selected = category === "uncategorized" || initial.categories.some((item) => item.id === category && !item.isDivider) ? category : "all";
  const data = await blogData(authorId, session?.user?.id, Number(page) || 1, selected);
  if (!data) notFound();
  return <main className="page-container"><BlogExplorer key={`${authorId}:${selected}`} data={data} initialCategory={selected} /></main>;
}
