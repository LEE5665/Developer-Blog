"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createSignupVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

export type ActionResponse = {
  error?: string;
  success?: string;
  email?: string;
};

// 1. 회원가입 Server Action
// (User 테이블에는 생성하지 않고, 인증 이메일만 전송합니다)
export async function signUpAction(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const name = formData.get("name")?.toString().trim();
  const nickname = formData.get("nickname")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!name || !nickname || !email || !password || !confirmPassword) {
    return { error: "필수 입력 항목을 모두 입력해주세요." };
  }

  if (name.length < 2 || name.length > 30) {
    return { error: "이름은 2자 이상 30자 이하로 입력해주세요." };
  }

  if (nickname.length < 2 || nickname.length > 20) {
    return { error: "닉네임은 2자 이상 20자 이하로 입력해주세요." };
  }

  if (password !== confirmPassword) {
    return { error: "비밀번호가 일치하지 않습니다." };
  }

  if (password.length < 6) {
    return { error: "비밀번호는 최소 6자 이상이어야 합니다." };
  }

  try {
    // 이미 가입되어 있는 유저인지 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "이미 가입된 이메일 주소입니다. 로그인해주세요." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // User 테이블에 레코드를 만들지 않고, 인증 토큰에 가입 정보를 안전하게 보관
    const verificationToken = await createSignupVerificationToken({
      name,
      email,
      nickname,
      passwordHash,
    });

    // 가입자의 실제 이메일로 링크 발송
    await sendVerificationEmail(email, verificationToken.token);

    return {
      success: "인증 이메일이 발송되었습니다! 메일함의 링크를 확인해주세요.",
      email,
    };
  } catch (err) {
    console.error("회원가입 에러:", err);
    return { error: "회원가입 처리 중 오류가 발생했습니다. 다시 시도해주세요." };
  }
}

// 2. 이메일/비밀번호 로그인 Server Action
export async function loginAction(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 모두 입력해주세요." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return { success: "로그인 성공" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
        case "CallbackRouteError":
          if (error.cause?.err?.message === "EmailNotVerified") {
            return {
              error:
                "이메일 인증이 완료되지 않았습니다. 메일함의 인증 링크를 클릭해주세요.",
            };
          }
          return { error: "로그인 처리 중 문제가 발생했습니다." };
        default:
          return { error: "인증에 실패했습니다. 다시 시도해주세요." };
      }
    }
    throw error;
  }
}

// 3. Google 소셜 로그인 Server Action
export async function googleLoginAction() {
  await signIn("google", { redirectTo: "/" });
}

// 4. 로그아웃 Server Action
export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

// 5. 인증 링크 재발송 Server Action
export async function resendVerificationEmailAction(
  email: string
): Promise<ActionResponse> {
  if (!email) {
    return { error: "이메일 주소가 올바르지 않습니다." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "이미 가입 완료된 계정입니다. 로그인해주세요." };
  }

  const pendingToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: {
        contains: email,
      },
    },
  });

  if (!pendingToken) {
    return { error: "가입 대기 중인 정보를 찾을 수 없습니다. 다시 회원가입을 진행해주세요." };
  }

  await sendVerificationEmail(email, pendingToken.token);

  return {
    success: "인증 링크가 메일로 다시 발송되었습니다.",
    email,
  };
}
