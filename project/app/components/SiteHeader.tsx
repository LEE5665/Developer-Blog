import Link from "next/link";
import { auth } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "./Icon";
import { RealtimeEvents } from "./RealtimeEvents";
import { Chat } from "./Chat";
import { Notifications } from "./Notifications";

export async function SiteHeader() {
  const session = await auth();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Developer Blog 홈">
          <span className="brand-mark"><Icon name="code" /></span>
          <span>Developer<span className="brand-muted"> Blog</span></span>
        </Link>
        <nav className="header-nav" aria-label="주 메뉴">
          {session?.user ? (
            <>
              <RealtimeEvents />
              <Chat userId={session.user.id!} />
              <Notifications />
              <Link href="/mypage" className="nav-link">마이페이지</Link>
              <Link href="/write" className="button button-primary header-write"><Icon name="pen" width={16} height={16} />글쓰기</Link>
              <form action={logoutAction}><button type="submit" className="nav-link">로그아웃</button></form>
            </>
          ) : (
            <><Link href="/login" className="nav-link">로그인</Link><Link href="/signup" className="button button-primary">시작하기</Link></>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
