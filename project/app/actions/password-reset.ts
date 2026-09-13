"use server";

import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { limitAction } from "@/lib/engagement";
import { PostError } from "@/lib/post-service";
import { sendPasswordResetEmail } from "@/lib/mail";
import type { ActionResponse } from "./auth";

const digest = (value: string) => createHash("sha256").update(value).digest("hex");
const invalidLink = "유효하지 않거나 만료된 링크입니다. 비밀번호 찾기에서 새 링크를 요청해주세요.";

export async function requestPasswordResetAction(_: ActionResponse | null, form: FormData): Promise<ActionResponse> {
  const value = form.get("email");
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "올바른 이메일 주소를 입력해주세요." };
  }
  try {
    const request = new Request("http://localhost", { headers: await headers() });
    await limitAction(request, "password-reset-request", "", 30, 15);
    await limitAction(request, "password-reset-email", email, 3, 15);
    if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
      throw new Error("Password reset mail is not configured");
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (user?.passwordHash && user.emailVerified) {
      const token = randomBytes(32).toString("hex");
      const storedToken = digest(token);
      // Bind the token to the current password so any password change invalidates it.
      await prisma.verificationToken.create({ data: {
        identifier: `password-reset:${user.id}:${digest(user.passwordHash)}`,
        token: storedToken,
        expires: new Date(Date.now() + 30 * 60_000),
      } });
      try {
        await sendPasswordResetEmail(email, token);
      } catch (error) {
        await prisma.verificationToken.deleteMany({ where: { token: storedToken } });
        throw error;
      }
    }
    return { success: "비밀번호 재설정이 가능한 계정이라면 이메일을 보냈습니다. 스팸함도 확인해주세요." };
  } catch (error) {
    if (error instanceof PostError) return { error: error.message };
    console.error("Password reset request failed");
    return { error: "메일을 보내지 못했습니다. 잠시 후 다시 시도해주세요." };
  }
}

export async function resetPasswordAction(_: ActionResponse | null, form: FormData): Promise<ActionResponse> {
  const token = form.get("token");
  const password = form.get("password");
  const confirmation = form.get("confirmPassword");
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) return { error: invalidLink };
  if (typeof password !== "string" || password.length < 6 || Buffer.byteLength(password, "utf8") > 72) {
    return { error: "비밀번호는 6자 이상, 72바이트 이하로 입력해주세요." };
  }
  if (password !== confirmation) return { error: "비밀번호가 일치하지 않습니다." };
  try {
    const request = new Request("http://localhost", { headers: await headers() });
    await limitAction(request, "password-reset-submit", "", 30, 15);
    const storedToken = digest(token);
    const record = await prisma.verificationToken.findUnique({ where: { token: storedToken } });
    if (!record || record.expires <= new Date() || !record.identifier.startsWith("password-reset:")) return { error: invalidLink };
    const [, userId, passwordDigest] = record.identifier.split(":");
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user?.passwordHash || !user.emailVerified || digest(user.passwordHash) !== passwordDigest) return { error: invalidLink };
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.$transaction(async (tx) => {
      const consumed = await tx.verificationToken.deleteMany({ where: { token: storedToken, expires: { gt: new Date() } } });
      if (consumed.count !== 1) throw new Error("Invalid token");
      const updated = await tx.user.updateMany({ where: { id: user.id, passwordHash: user.passwordHash }, data: { passwordHash } });
      if (updated.count !== 1) throw new Error("Password changed");
      await tx.verificationToken.deleteMany({ where: { identifier: record.identifier } });
    });
    return { success: "비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요." };
  } catch (error) {
    if (error instanceof PostError) return { error: error.message };
    return { error: "비밀번호를 변경하지 못했습니다. 링크가 만료되었거나 이미 사용되었을 수 있습니다. 다시 요청해주세요." };
  }
}
