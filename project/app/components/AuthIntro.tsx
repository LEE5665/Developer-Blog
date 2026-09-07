import { Icon } from "./Icon";

export function AuthIntro() {
  return (
    <aside className="auth-intro">
      <span className="eyebrow">A SPACE FOR DEVELOPERS</span>
      <h2>오늘의 배움이,<br />내일의 나를<br /><span>만듭니다.</span></h2>
      <p>작은 발견부터 깊이 있는 이야기까지.<br />당신의 개발 여정을 기록하고 나눠보세요.</p>
      <div className="auth-note">
        <span className="note-icon"><Icon name="code" /></span>
        <div><strong>기록하고. 연결하고. 성장하세요.</strong><span>개발자를 위한 나만의 공간</span></div>
      </div>
      <div className="auth-art" aria-hidden="true"><div /><div /><div /><span>const tomorrow = today + learning;</span></div>
    </aside>
  );
}
