export function UserName({ user }: { user: { nickname?: string | null; tag?: string | null } }) {
  return <span className="user-name" tabIndex={user.tag ? 0 : undefined}>{user.nickname || "개발자"}{user.tag && <span className="user-name-tag" role="tooltip">#{user.tag}</span>}</span>;
}
