import { PasswordResetForm } from "@/app/components/PasswordResetForm";

export const metadata = {
  title: "새 비밀번호 설정 | Developer Blog",
  robots: { index: false, follow: false },
  referrer: "no-referrer" as const,
};

export default async function ResetPasswordPage({ searchParams }: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { token } = await searchParams;
  return <PasswordResetForm token={typeof token === "string" ? token : ""} />;
}
