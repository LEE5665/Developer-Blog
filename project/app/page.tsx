import Link from "next/link";
import { Avatar } from "./components/Avatar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Icon } from "./components/Icon";
import { postExcerpt } from "@/lib/post-content";

export default async function HomePage() {
  const session = await auth();
  const currentUserId = session?.user?.id;
  const user = session?.user;

  // 1. 현재 사용자의 '친구' 목록 조회 (친구 공개 글을 볼 권한 확인용)
  let friendIds: string[] = [];
  if (currentUserId) {
    const friendships = await prisma.friendship.findMany({
      where: {
        status: "ACCEPTED",
        OR: [{ userId: currentUserId }, { friendId: currentUserId }],
      },
      select: { userId: true, friendId: true },
    });

    friendIds = friendships.map((f) =>
      f.userId === currentUserId ? f.friendId : f.userId
    );
  }

  // 2. 피드에 노출할 게시글 쿼리
  // - 비로그인: 전체 공개(PUBLIC) 글만
  // - 로그인: 전체 공개(PUBLIC) + 내가 쓴 글(비밀/친구포함) + 친구가 쓴 친구공개(FRIENDS) 글
  const posts = await prisma.post.findMany({
    where: currentUserId
      ? {
          OR: [
            { visibility: "PUBLIC" },
            { authorId: currentUserId },
            ...(friendIds.length > 0
              ? [{ visibility: "FRIENDS" as const, authorId: { in: friendIds } }]
              : []),
          ],
        }
      : {
          visibility: "PUBLIC",
        },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          nickname: true,
          tag: true,
          image: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="page-container">
      <section className="hero" aria-labelledby="home-title">
        <div>
          <span className="eyebrow">WRITE. SHARE. GROW.</span>
          <h1 id="home-title">개발의 순간을 기록하다.<br /><span>함께, 더 나은 내일로.</span></h1>
          <p>오늘 해결한 문제, 새롭게 배운 기술, 문득 떠오른 생각.<br />당신의 경험이 누군가에게는 다음 한 걸음이 됩니다.</p>
          <div className="hero-actions">
            <Link href={user ? "/write" : "/signup"} className="button button-accent">나의 이야기 기록하기<Icon name="arrow" width={16} height={16} /></Link>
            <a href="#feed" className="button button-secondary">최신 글 둘러보기</a>
          </div>
        </div>
        <div className="hero-note" aria-label="기록을 위한 작은 제안">
          <div className="note-top"><span>DEVELOPER&apos;S NOTE</span><Icon name="code" /></div>
          <h2>모든 성장은 작은 기록에서.</h2>
          <p>완벽한 글이 아니어도 괜찮아요.<br />오늘의 작은 배움부터 남겨보세요.</p>
          <div className="note-tags"><span>배움의 기록</span><span>문제 해결</span><span>개발 이야기</span></div>
        </div>
      </section>
      <div className="feed-layout" id="feed">
        <section aria-labelledby="feed-title">
          <div className="section-heading"><h2 id="feed-title">최신 이야기 <span>{posts.length}</span></h2><span>최근 작성순</span></div>
          {posts.length > 0 ? (
            <div className="post-list">
              {posts.map((post) => (
                <article key={post.id} className="feed-post">
                  <div className="post-meta">
                    {post.category && <span className="tag">{post.category.name}</span>}
                    <span className="inline-flex items-center gap-1"><Icon name={post.visibility === "PRIVATE" ? "lock" : post.visibility === "FRIENDS" ? "users" : "globe"} width={12} height={12} />{post.visibility === "PRIVATE" ? "나만 보기" : post.visibility === "FRIENDS" ? "친구 공개" : "전체 공개"}</span>
                    <time dateTime={post.createdAt.toISOString()}>{post.createdAt.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}</time>
                  </div>
                  <h3><Link href={`/posts/${post.id}#post-start`}>{post.title}</Link></h3>
                  <p className="post-body line-clamp-3">{postExcerpt(post.content)}</p>
                  <Link className="blog-read-more" href={`/posts/${post.id}#post-start`}>전체 글 읽기 <Icon name="arrow" width={14} height={14} /></Link>
                  <div className="post-author">
                    <Avatar src={post.author.image} name={post.author.name} size={32} />
                    <Link href={`/blog/${post.authorId}`}><strong>{post.author.name || "개발자"}</strong></Link>
                    {post.author.nickname && <span className="font-mono">{post.author.nickname}#{post.author.tag}</span>}
                    {currentUserId === post.authorId && <span className="ml-auto">내가 쓴 글</span>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><Icon name="file" width={23} height={23} /></div>
              <h3>첫 번째 이야기를 기다리고 있어요</h3>
              <p>오늘 배운 것 하나부터 시작해보세요.<br />작은 기록이 모여 당신만의 이야기가 됩니다.</p>
              <Link href={user ? "/write" : "/login"} className="button button-primary">첫 글 작성하기<Icon name="arrow" width={15} height={15} /></Link>
            </div>
          )}
        </section>
        <aside className="feed-aside">
          <div className="aside-card"><span className="eyebrow">YOUR WORKSPACE</span><h3>{user ? (user.name || "개발자") + " 님의 기록 공간" : "기록이 습관이 되는 곳"}</h3><p>글을 모으고, 주제별로 정리하고,<br />앞으로의 계획을 세워보세요.</p><Link href={user ? "/mypage" : "/signup"} className="button button-secondary">{user ? "마이페이지" : "나만의 공간 만들기"}<Icon name="arrow" width={14} height={14} /></Link></div>
          <div className="aside-card"><Icon name="pen" className="text-accent" /><h3>무엇을 기록하면 좋을까요?</h3><p>오래 고민했던 오류의 해결 과정,<br />직접 써본 도구의 장단점,<br />그리고 오늘의 새로운 발견.</p></div>
          <p className="aside-caption">서로의 경험을 존중하며<br />함께 성장하는 개발 문화를 만듭니다.</p>
        </aside>
      </div>
    </main>
  );
}
