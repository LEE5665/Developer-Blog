"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AuthIntro } from "./AuthIntro";
import { requestPasswordResetAction, resetPasswordAction } from "@/app/actions/password-reset";

const inputClass = "w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white";

export function PasswordResetForm({ token }: { token?: string }) {
  const resetting = token !== undefined;
  const [state, action, pending] = useActionState(resetting ? resetPasswordAction : requestPasswordResetAction, null);
  const invalidToken = resetting && !/^[a-f0-9]{64}$/.test(token);
  return (
    <main className="auth-page">
      <AuthIntro />
      <div className="auth-card">
        <div className="auth-heading">
          <Link href="/">Developer Blog</Link>
          <h1>{resetting ? "새 비밀번호 설정" : "비밀번호 찾기"}</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            {resetting ? "새로 사용할 비밀번호를 입력해주세요." : "가입한 이메일로 비밀번호 재설정 링크를 보내드립니다. 링크는 30분 동안 유효합니다."}
          </p>
        </div>
        {state?.error && <p role="alert" className="mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3.5 text-sm text-rose-700 dark:text-rose-400">{state.error}</p>}
        {state?.success && <p role="status" className="mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3.5 text-sm text-emerald-700 dark:text-emerald-400">{state.success}</p>}
        {invalidToken ? <p role="alert" className="text-sm">유효하지 않은 링크입니다. 아래에서 새 링크를 요청해주세요.</p> : !state?.success && (
          <form action={action} className="space-y-4">
            {resetting ? <>
              <input type="hidden" name="token" value={token} />
              <div>
                <label htmlFor="reset-password" className="block mb-1.5">새 비밀번호</label>
                <input id="reset-password" name="password" type="password" autoComplete="new-password" minLength={6} maxLength={72} required className={inputClass} aria-describedby="password-hint" />
                <p id="password-hint" className="mt-2 text-xs text-zinc-500">6자 이상, 72바이트 이하로 입력해주세요.</p>
              </div>
              <div>
                <label htmlFor="reset-confirm" className="block mb-1.5">새 비밀번호 확인</label>
                <input id="reset-confirm" name="confirmPassword" type="password" autoComplete="new-password" minLength={6} maxLength={72} required className={inputClass} />
              </div>
            </> : <div>
              <label htmlFor="reset-email" className="block mb-1.5">이메일 주소</label>
              <input id="reset-email" name="email" type="email" autoComplete="email" placeholder="developer@example.com" maxLength={254} required className={inputClass} />
            </div>}
            <button type="submit" disabled={pending} className="auth-submit w-full rounded-xl px-4 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50">
              {pending ? "처리 중..." : resetting ? "비밀번호 변경" : "재설정 링크 보내기"}
            </button>
          </form>
        )}
        {!resetting && <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">Google로 가입하고 비밀번호를 설정하지 않았다면 Google 계정으로 로그인해주세요.</p>}
        <div className="mt-6 flex justify-center gap-5 text-sm">
          <Link href="/login" className="underline underline-offset-4">로그인으로 돌아가기</Link>
          {resetting && !state?.success && <Link href="/forgot-password" className="underline underline-offset-4">새 링크 요청</Link>}
        </div>
      </div>
    </main>
  );
}
