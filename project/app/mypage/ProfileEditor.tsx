"use client";


import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  name: string | null;
  nickname: string | null;
  tag: string | null;
  email: string | null;
  image: string | null;
}

export function ProfileEditor({ user }: { user: UserProfile }) {
  const router = useRouter();

  // 기본 프로필 상태
  const [name, setName] = useState(user.name || "");
  const [nickname, setNickname] = useState(user.nickname || "");
  const [currentTag, setCurrentTag] = useState(user.tag || "0001");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileStatus, setProfileStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // 비밀번호 변경 상태
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // 1. 기본 프로필 저장
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileStatus(null);

    const trimmedName = name.trim();
    const trimmedNickname = nickname.trim();

    if (!trimmedName || !trimmedNickname) {
      setProfileStatus({ type: "error", message: "이름과 닉네임을 모두 입력해주세요." });
      return;
    }

    if (trimmedName.length < 2 || trimmedName.length > 30) {
      setProfileStatus({ type: "error", message: "이름은 2자 이상 30자 이하로 입력해주세요." });
      return;
    }

    if (trimmedNickname.length < 2 || trimmedNickname.length > 20) {
      setProfileStatus({ type: "error", message: "닉네임은 2자 이상 20자 이하로 입력해주세요." });
      return;
    }

    setProfileLoading(true);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          nickname: trimmedNickname,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setProfileStatus({ type: "error", message: data.error || "수정 중 오류가 발생했습니다." });
      } else {
        setProfileStatus({
          type: "success",
          message: data.message || "개인정보가 성공적으로 저장되었습니다.",
        });
        if (data.user?.tag) {
          setCurrentTag(data.user.tag);
        }
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setProfileStatus({ type: "error", message: "서버와의 통신에 실패했습니다." });
    } finally {
      setProfileLoading(false);
    }
  };

  // 2. 비밀번호 변경 제출
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword.length < 6) {
      setPasswordStatus({ type: "error", message: "새 비밀번호는 6자리 이상이어야 합니다." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: "error", message: "새 비밀번호와 확인 입력이 일치하지 않습니다." });
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordStatus({ type: "error", message: data.error || "비밀번호 변경 실패" });
      } else {
        setPasswordStatus({
          type: "success",
          message: data.message || "비밀번호가 성공적으로 변경되었습니다.",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error(err);
      setPasswordStatus({ type: "error", message: "서버 통신 실패" });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* ── 1. 기본 프로필 정보 수정 ── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            개인정보 및 프로필 수정
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            실명과 블로그에서 사용할 활동 닉네임을 변경할 수 있습니다.
          </p>
        </div>

        {profileStatus && (
          <div
            className={`p-4 rounded-2xl text-sm font-medium border ${
              profileStatus.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300"
            }`}
          >
            {profileStatus.message}
          </div>
        )}

        {/* 프로필 아바타 및 계정 정보 */}
        <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "프로필 이미지"}
              width={56}
              height={56}
              className="rounded-full border border-zinc-200 dark:border-zinc-700 shadow-xs"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center uppercase shadow-sm">
              {name[0] || user.email?.[0] || "U"}
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-zinc-900 dark:text-zinc-100 truncate">
                {nickname || "미설정"}
              </span>
              <span className="font-mono text-xs font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-md">
                #{currentTag}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">{user.email}</p>
          </div>
        </div>

        {/* 정보 수정 폼 */}
        <form onSubmit={handleProfileSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 실명 입력 필드 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                실명 (성함) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                aria-label="이름" value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 홍길동"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
              />
              <p className="text-[11px] text-zinc-400">2자 이상 30자 이하로 입력해주세요.</p>
            </div>

            {/* 닉네임 입력 필드 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                활동 닉네임 <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  required
                  aria-label="닉네임" value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="예: 코딩마스터"
                  className="w-full px-4 py-2.5 rounded-l-xl border border-r-0 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
                />
                <div className="px-3.5 py-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-r-xl font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400 shrink-0">
                  #{currentTag}
                </div>
              </div>
              <p className="text-[11px] text-zinc-400">
                닉네임 변경 시 새로운 4자리 고유 태그가 자동 발급됩니다.
              </p>
            </div>
          </div>

          {/* 이메일 (읽기 전용) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              가입 이메일 (변경 불가)
            </label>
            <input
              type="email"
              disabled
              value={user.email || ""}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 text-sm cursor-not-allowed"
            />
          </div>

          {/* 프로필 저장 버튼 */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={profileLoading}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition shadow-xs"
            >
              {profileLoading ? "저장 중..." : "개인정보 저장"}
            </button>
          </div>
        </form>
      </section>

      {/* 구분선 */}
      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* ── 2. 비밀번호 수정 ── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            비밀번호 변경
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            계정 보안을 위해 주기적으로 비밀번호를 변경해 주세요. (소셜 가입자인 경우 신규 비밀번호를 설정할 수 있습니다.)
          </p>
        </div>

        {passwordStatus && (
          <div
            className={`p-4 rounded-2xl text-sm font-medium border ${
              passwordStatus.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300"
            }`}
          >
            {passwordStatus.message}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-xl">
          {/* 현재 비밀번호 */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              현재 비밀번호 (기존 비밀번호가 있는 경우)
            </label>
            <input
              type="password"
              aria-label="현재 비밀번호" value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 사용 중인 비밀번호"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 새 비밀번호 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                새 비밀번호 <span className="text-rose-500">*</span>
              </label>
              <input
                type="password"
                required
                aria-label="새 비밀번호" value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="6자리 이상 입력"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
              />
            </div>

            {/* 새 비밀번호 확인 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                새 비밀번호 확인 <span className="text-rose-500">*</span>
              </label>
              <input
                type="password"
                required
                aria-label="새 비밀번호 확인" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="동일한 비밀번호 재입력"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
              />
            </div>
          </div>

          <div className="flex justify-start pt-2">
            <button
              type="submit"
              disabled={passwordLoading}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition shadow-xs"
            >
              {passwordLoading ? "변경 중..." : "비밀번호 변경하기"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
