"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { AuthIntro } from "@/app/components/AuthIntro";
import {
  signUpAction,
  googleLoginAction,
  resendVerificationEmailAction,
} from "@/app/actions/auth";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signUpAction, null);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  return (
    <main className="auth-page">
      <AuthIntro />
      <div className="auth-card">
        
        {/* 상단 헤더 */}
        <div className="auth-heading">
          <Link href="/" className="inline-block text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Developer Blog
          </Link>
          <h1 className="text-xl font-semibold mt-4 text-zinc-800 dark:text-zinc-200">
            {state?.success ? "이메일을 확인해주세요" : "회원가입"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {state?.success
              ? "메일함에 도착한 인증 링크를 클릭해주세요"
              : "나만의 기록 공간에서 개발 이야기를 시작하세요."}
          </p>
        </div>

        {/* 1. 가입 성공 시: 이메일 링크 확인 안내 화면 */}
        {state?.success ? (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
                인증 메일이 발송되었습니다!
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">
                <strong className="underline text-blue-600 dark:text-blue-400">{state.email}</strong> 주소로 인증 링크를 보냈습니다.
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                메일함에서 <strong>[이메일 인증하기]</strong> 버튼을 누르시면 가입이 완료됩니다.
              </p>
            </div>

            {/* 재발송 알림 */}
            {resendStatus && (
              <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs text-center text-zinc-700 dark:text-zinc-300">
                {resendStatus}
              </div>
            )}

            <div className="space-y-3 pt-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:opacity-90 transition shadow-sm"
              >
                로그인 페이지로 가기
              </Link>

              {state.email && (
                <button
                  type="button"
                  disabled={isResending}
                  onClick={async () => {
                    setIsResending(true);
                    setResendStatus("인증 메일을 재발송하는 중...");
                    const res = await resendVerificationEmailAction(state.email!);
                    if (res.error) {
                      setResendStatus(res.error);
                    } else {
                      setResendStatus("새로운 인증 메일이 발송되었습니다!");
                    }
                    setIsResending(false);
                  }}
                  className="w-full text-center text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition underline py-1"
                >
                  메일이 도착하지 않았나요? 인증 메일 재발송
                </button>
              )}
            </div>
          </div>
        ) : (
          /* 2. 일반 회원가입 폼 */
          <>
            {/* Google 소셜 가입 버튼 */}
            <form action={googleLoginAction} className="mb-6">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-750 transition shadow-xs"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Google 계정으로 가입
              </button>
            </form>

            {/* 구분선 */}
            <div className="auth-divider relative flex items-center justify-center mb-6">
              <div className="border-t border-zinc-200 dark:border-zinc-800 w-full"></div>
              <span className="bg-white dark:bg-zinc-900 px-3 text-xs text-zinc-400">
                또는 이메일로 가입
              </span>
              <div className="border-t border-zinc-200 dark:border-zinc-800 w-full"></div>
            </div>

            {/* 에러 메시지 */}
            {state?.error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-sm">
                {state.error}
              </div>
            )}

            {/* 회원가입 폼 */}
            <form action={formAction} className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                  이름
                </label>
<input id="signup-name" name="name" autoComplete="name"
                  type="text"
                  required
                  placeholder="name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
                />
              </div>

              <div>
                <label htmlFor="signup-nickname" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                  닉네임
                </label>
<div className="relative flex items-center">
                  <input id="signup-nickname" name="nickname"
                    type="text"
                    required
                    placeholder="nickname"
                    className="w-full px-3.5 py-2.5 pr-24 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
                  />
                  <span className="absolute right-3 text-xs text-zinc-400 font-mono pointer-events-none">
                    #XXXX
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                  이메일 주소
                </label>
<input id="signup-email" name="email" autoComplete="email"
                  type="email"
                  required
                  placeholder="developer@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                  비밀번호
                </label>
<input id="signup-password" name="password" autoComplete="new-password"
                  type="password"
                  required
                  placeholder="최소 6자 이상"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
                />
              </div>

              <div>
                <label htmlFor="signup-confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                  비밀번호 확인
                </label>
<input id="signup-confirmPassword" name="confirmPassword"
                  type="password"
                  required
                  placeholder="비밀번호 재입력"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm hover:opacity-90 disabled:opacity-50 transition shadow-sm flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    인증 메일 발송 중...
                  </>
                ) : (
                  "회원가입 (인증 메일 받기)"
                )}
              </button>
            </form>

            {/* 로그인 링크 */}
            <div className="text-center mt-6 text-sm text-zinc-500 dark:text-zinc-400">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="font-medium text-zinc-900 dark:text-white underline underline-offset-4 hover:opacity-80"
              >
                로그인하기
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
