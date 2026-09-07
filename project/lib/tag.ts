import prisma from "@/lib/prisma";

/**
 * 디스코드 스타일의 4자리 숫자 고유 태그(예: 0042, 1234) 생성기
 * 동일 닉네임 내에서 중복되지 않는 태그를 찾아 부여합니다.
 */
export async function generateUniqueTag(nickname: string): Promise<string> {
  const trimmedNickname = nickname.trim();

  // 해당 닉네임으로 이미 사용 중인 태그 목록 조회
  const existingUsers = await prisma.user.findMany({
    where: { nickname: trimmedNickname },
    select: { tag: true },
  });

  const takenTags = new Set(existingUsers.map((u) => u.tag).filter(Boolean));

  // 1. 랜덤으로 50회 시도 (0001 ~ 9999)
  for (let i = 0; i < 50; i++) {
    const randomNum = Math.floor(1 + Math.random() * 9999);
    const tagCandidate = randomNum.toString().padStart(4, "0");
    if (!takenTags.has(tagCandidate)) {
      return tagCandidate;
    }
  }

  // 2. 랜덤 충돌 시 비어있는 번호 순차 탐색
  for (let num = 1; num <= 9999; num++) {
    const tagCandidate = num.toString().padStart(4, "0");
    if (!takenTags.has(tagCandidate)) {
      return tagCandidate;
    }
  }

  throw new Error("해당 닉네임으로 부여할 수 있는 태그가 가득 찼습니다.");
}
