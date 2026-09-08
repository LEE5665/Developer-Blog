import Link from "next/link";
import { Avatar } from "@/app/components/Avatar";
import { LikedPosts } from "@/app/components/LikedPosts";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { MyPageTabs } from "./MyPageTabs";
import { blogData } from "@/lib/blog-data";
import { BlogExplorer } from "@/app/components/BlogExplorer";

export default async function MyPage({ searchParams }: { searchParams: Promise<{ tab?: string; post?: string; category?: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 사용자 정보 상세 조회
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      categories: {
        orderBy: { order: "asc" },
        include: {
          _count: {
            select: { posts: true },
          },
        },
      },
      _count: {
        select: {
          posts: true,
          sentFriendRequests: { where: { status: "ACCEPTED" } },
          receivedFriendRequests: { where: { status: "ACCEPTED" } },
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const friendCount =
    (user._count?.sentFriendRequests ?? 0) +
    (user._count?.receivedFriendRequests ?? 0);
  const data = await blogData(user.id, user.id);
  const { tab, post: selectedPost, category: selectedCategory } = await searchParams;

  return (
      <main className="page-container space-y-8">
        <div className="workspace-heading"><span className="eyebrow">MY WORKSPACE</span><div className="flex flex-wrap items-center justify-between gap-4"><div><h1>나의 공간</h1><p>프로필부터 기록과 일정까지, 한곳에서 관리하세요.</p></div><Link href="/write" className="button button-primary">새 글 작성하기</Link></div></div>
        {/* 상단 프로필 요약 카드 */}
        <div className="profile-summary p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <Avatar src={user.image} name={user.name} size={56} />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white">
                  {user.name || "개발자"}
                </h2>
                {user.nickname && (
                  <span className="font-mono text-xs sm:text-sm font-semibold bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-zinc-600 dark:text-zinc-300">
                    {user.nickname}#{user.tag}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          {/* 활동 요약 수치 */}
          <div className="flex items-center gap-6 text-center border-t sm:border-t-0 sm:border-l border-zinc-100 dark:border-zinc-800 pt-4 sm:pt-0 sm:pl-8 w-full sm:w-auto justify-around sm:justify-start">
            <div>
              <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {user._count?.posts ?? 0}
              </div>
              <div className="text-[11px] text-zinc-400">작성한 글</div>
            </div>
            <div className="border-l border-zinc-200 dark:border-zinc-800 h-8"></div>
            <div>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {friendCount}
              </div>
              <div className="text-[11px] text-zinc-400">등록된 친구</div>
            </div>
            <div className="border-l border-zinc-200 dark:border-zinc-800 h-8"></div>
            <div>
              <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">
                {user.categories.filter((category) => !category.isDivider).length}
              </div>
              <div className="text-[11px] text-zinc-400">카테고리</div>
            </div>
          </div>
        </div>

        {/* 탭 인터페이스 (1번: 개인정보 수정, 2번: 카테고리 관리, 3번: 달력 Todo) */}
        <MyPageTabs
          user={{
            id: user.id,
            name: user.name,
            nickname: user.nickname,
            tag: user.tag,
            email: user.email,
            image: user.image,
          }}
          categories={user.categories}
          initialTab={tab}
          likes={<LikedPosts userId={user.id} />}
          posts={data && <BlogExplorer key={`${selectedPost || "list"}:${selectedCategory || "all"}`} data={data} embedded initialPostId={selectedPost} initialCategory={selectedCategory || "all"} />}
        />
      </main>

  );
}
