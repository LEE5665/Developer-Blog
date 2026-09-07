import Link from "next/link";
import { verifyAndCreateUser } from "@/lib/tokens";

interface VerifyEmailProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col justify-center items-center px-4 py-12 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold mb-2">인증 토큰이 없습니다</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            이메일의 인증 링크를 올바르게 클릭했는지 확인해주세요.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:opacity-90 transition"
          >
            로그인으로 가기
          </Link>
        </div>
      </div>
    );
  }

  const result = await verifyAndCreateUser(token);

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-4 py-12 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 text-center">
        {result.user ? (
          <>
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">
              이메일 인증 및 가입 완료!
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">
              <strong className="text-zinc-900 dark:text-white font-mono">{result.user.name}</strong> 님, 환영합니다!<br />
              이제 블로그에 로그인하실 수 있습니다.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:opacity-90 transition"
            >
              로그인하러 가기
            </Link>
          </>
        ) : (
          <>
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold mb-2 text-rose-600 dark:text-rose-400">
              인증 실패
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
              {result.error || "토큰이 올바르지 않거나 이미 만료되었습니다."}
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:opacity-90 transition"
              >
                회원가입 다시 시도
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                로그인으로 가기
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
