import crypto from "crypto";
import prisma from "@/lib/prisma";
import { generateUniqueTag } from "@/lib/tag";

type SignupPayload = {
  name: string;
  email: string;
  nickname: string;
  passwordHash: string;
}

/**
 * 회원가입 대기용 인증 토큰 생성
 * (User 테이블에는 유저를 생성하지 않고, 임시 페이로드를 토큰과 함께 보관합니다)
 */
export async function createSignupVerificationToken(payload: SignupPayload) {
  const token = crypto.randomUUID();
  // 24시간 유효
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // 이전에 동일한 이메일로 요청했던 대기 토큰이 있다면 삭제
  const existingTokens = await prisma.verificationToken.findMany({
    where: {
      identifier: {
        contains: payload.email,
      },
    },
  });

  for (const t of existingTokens) {
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: t.identifier,
          token: t.token,
        },
      },
    });
  }

  // 가입 정보를 직렬화하여 VerificationToken의 identifier에 보관
  const identifierData = JSON.stringify(payload);

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: identifierData,
      token,
      expires,
    },
  });

  // 토큰 발급 시 5% 확률로 만료된 토큰을 정리합니다.
  if (Math.random() < 0.05) {
    try {
      await prisma.verificationToken.deleteMany({
        where: { expires: { lt: new Date() } },
      });
    } catch (error) {
      // 정리 실패가 정상적인 토큰 발급을 막지 않도록 합니다.
      console.error("만료된 인증 토큰 정리 실패:", error);
    }
  }

  return verificationToken;
}

/**
 * 이메일 인증 링크 검증 및 "실제 User 생성"
 * 사용자가 메일의 링크를 클릭하는 바로 그 순간에 User가 생성됩니다.
 */
export async function verifyAndCreateUser(token: string) {
  const existingToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!existingToken) {
    return { error: "유효하지 않거나 이미 만료/사용된 인증 링크입니다." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    // 만료된 토큰 삭제
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: existingToken.identifier,
          token: existingToken.token,
        },
      },
    });
    return { error: "인증 링크가 만료되었습니다. 회원가입을 다시 진행해주세요." };
  }

  let payload: SignupPayload;
  try {
    payload = JSON.parse(existingToken.identifier);
  } catch {
    return { error: "인증 데이터 형식이 올바르지 않습니다." };
  }

  const { name, email, nickname, passwordHash } = payload;

  // 이미 해당 이메일로 가입된 유저가 있는지 최종 확인
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    // 사용한 토큰 삭제
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: existingToken.identifier,
          token: existingToken.token,
        },
      },
    });
    return { error: "이미 가입 완료된 이메일 주소입니다. 로그인해주세요." };
  }

  // 디스코드 스타일 4자리 고유 태그 발급
  const tag = await generateUniqueTag(nickname);

  // 🎉 이 시점에 비로소 실제 유저를 DB에 생성! (인증 완료 상태)
  const newUser = await prisma.user.create({
    data: {
      name: name || nickname, // 실명 저장
      email,
      nickname, // 닉네임 저장
      tag, // 4자리 태그 저장
      passwordHash,
      emailVerified: new Date(), // 즉시 인증 완료
      image: null,
    },
  });

  // 사용 완료된 토큰 삭제
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: existingToken.identifier,
        token: existingToken.token,
      },
    },
  });

  return {
    success: "이메일 인증이 완료되었습니다! 이제 로그인하실 수 있습니다.",
    user: newUser,
  };
}
