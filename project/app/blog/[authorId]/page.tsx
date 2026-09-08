import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { blogData } from "@/lib/blog-data";
import { BlogExplorer } from "@/app/components/BlogExplorer";

export default async function BlogPage({ params, searchParams }: { params: Promise<{ authorId: string }>; searchParams: Promise<{ category?: string }> }) {
  const { authorId } = await params;
  const { category } = await searchParams;
  const session = await auth();
  const data = await blogData(authorId, session?.user?.id);
  if (!data) notFound();
  const selected = category === "uncategorized" || data.categories.some((item) => item.id === category && !item.isDivider) ? category : "all";
  return <main className="page-container"><BlogExplorer key={`${authorId}:${selected}`} data={data} initialCategory={selected} /></main>;
}
