import nodemailer from "nodemailer";

// Gmail SMTP 트랜스포터 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SERVER_USER, // 구글 계정 이메일
    pass: process.env.EMAIL_SERVER_PASSWORD, // 구글에서 발급받은 16자리 앱 비밀번호
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const confirmLink = `${baseUrl}/verify-email?token=${token}`;

  // 개발자 터미널 콘솔 로그 출력 (테스트용)
  console.log("==========================================");
  console.log(`[이메일 인증 링크 전송]`);
  console.log(`수신자: ${email}`);
  console.log(`인증 링크: ${confirmLink}`);
  console.log("==========================================");

  // SMTP 환경변수가 설정되어 있다면 실제 Gmail로 메일 발송
  if (process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD) {
    try {
      await transporter.sendMail({
        from: `"Developer Blog" <${process.env.EMAIL_SERVER_USER}>`,
        to: email,
        subject: "[Developer Blog] 이메일 인증을 완료해주세요",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 40px 24px; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 16px;">
            <div style="margin-bottom: 24px; text-align: center;">
              <h2 style="color: #18181b; font-size: 24px; font-weight: 800; margin: 0;">Developer Blog</h2>
              <p style="color: #71717a; font-size: 14px; margin-top: 6px;">회원가입 이메일 인증</p>
            </div>
            
            <p style="color: #3f3f46; font-size: 15px; line-height: 24px;">
              안녕하세요! Developer Blog에 가입해 주셔서 감사합니다.<br />
              아래 버튼을 클릭하시면 이메일 인증이 완료되어 바로 로그인하실 수 있습니다.
            </p>

            <!-- 인증 링크 버튼 -->
            <div style="text-align: center; margin: 36px 0;">
              <a href="${confirmLink}" style="display: inline-block; padding: 14px 32px; background-color: #18181b; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                이메일 인증하기
              </a>
            </div>

            <p style="color: #71717a; font-size: 13px; line-height: 20px;">
              버튼이 클릭되지 않는 경우, 아래 링크를 복사하여 브라우저 주소창에 직접 입력해 주세요:<br />
              <a href="${confirmLink}" style="color: #2563eb; word-break: break-all; font-size: 12px;">${confirmLink}</a>
            </p>

            <hr style="border: none; border-top: 1px solid #f4f4f5; margin: 32px 0 16px 0;" />
            <p style="color: #a1a1aa; font-size: 12px; line-height: 18px; margin: 0; text-align: center;">
              본인이 요청하지 않은 가입 요청이라면 이 메일을 무시하셔도 됩니다.<br />
              인증 링크는 24시간 동안 유효합니다.
            </p>
          </div>
        `,
      });
      console.log(`[SMTP 발송 성공] ${email} 주소로 인증 링크 메일이 전송되었습니다!`);
    } catch (error) {
      console.error("[SMTP 발송 실패] Gmail 메일 전송 에러:", error);
    }
  }

  return { success: true, confirmLink };
}
