import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* 글로벌 네비게이션 바 */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center text-sm font-black">
              DB
            </span>
            <span>Developer Blog</span>
          </Link>

          <nav className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {/* 프로필 정보 */}
                <div className="flex items-center gap-2.5">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "프로필"}
                      width={34}
                      height={34}
                      className="rounded-full border border-zinc-200 dark:border-zinc-700"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 text-white font-semibold text-xs flex items-center justify-center uppercase shadow-xs">
                      {user.name?.[0] || user.email?.[0] || "U"}
                    </div>
                  )}
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                      <span>{user.name || "개발자"}</span>
                      {(user as unknown as { nickname?: string; tag?: string }).nickname && (
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-sm">
                          {(user as unknown as { nickname?: string; tag?: string }).nickname}#{(user as unknown as { nickname?: string; tag?: string }).tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{user.email}</p>
                  </div>
                </div>

                {/* 로그아웃 버튼 */}
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="py-1.5 px-3 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    로그아웃
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="py-1.5 px-3 rounded-lg text-sm font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="py-1.5 px-4 rounded-xl text-sm font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition shadow-xs"
                >
                  회원가입
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12">
        {user ? (
          /* 로그인된 사용자 화면 */
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-linear-to-r from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-850 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 mb-4">
                인증 완료
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                환영합니다, {user.name || "개발자"}님! 👋
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-sm sm:text-base">
                성공적으로 로그인되었습니다. 세션 정보와 데이터베이스가 정상적으로 연결되었습니다.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-white/70 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 text-xs font-mono space-y-1.5 overflow-x-auto">
                <div className="text-zinc-500">// 현재 세션 유저 정보 (auth() 확인)</div>
                <div><span className="text-purple-600 dark:text-purple-400">ID:</span> {user.id}</div>
                <div><span className="text-blue-600 dark:text-blue-400">이메일:</span> {user.email}</div>
                <div><span className="text-emerald-600 dark:text-emerald-400">이름:</span> {user.name || "없음"}</div>
                <div><span className="text-amber-600 dark:text-amber-400">프로필:</span> {user.image || "기본 프로필"}</div>
              </div>
            </div>

            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4">
                  ✍️
                </div>
                <h3 className="font-semibold text-lg mb-1">글 작성하기</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  새로운 기술 아티클과 회고록을 기록해보세요.
                </p>
                <button disabled className="text-xs font-semibold text-zinc-400 cursor-not-allowed">
                  준비 중...
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4">
                  🔒
                </div>
                <h3 className="font-semibold text-lg mb-1">인증 연동 상태</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  NextAuth v5 + Prisma 7 + PostgreSQL 드라이버가 동작 중입니다.
                </p>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  정상 동작 중
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-4">
                  ⚙️
                </div>
                <h3 className="font-semibold text-lg mb-1">계정 관리</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  이메일 인증과 비밀번호 및 소셜 연동 정보를 확인하세요.
                </p>
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                  기본 프로필
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* 로그인하지 않은 방문자 화면 */
          <div className="py-16 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Next.js 16 & NextAuth v5 블로그 템플릿
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
              개발자의 생각을 기록하고 공유하는 공간
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
              구글 원클릭 로그인과 안전한 이메일 인증 회원가입을 지원합니다. 지금 바로 시작해보세요!
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Link
                href="/signup"
                className="py-3 px-6 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 transition shadow-md"
              >
                무료로 시작하기
              </Link>
              <Link
                href="/login"
                className="py-3 px-6 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
              >
                기존 계정으로 로그인
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        <p>© 2026 Developer Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
