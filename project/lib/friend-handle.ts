export function parseFriendHandle(value: unknown): { nickname: string; tag: string } | null {
  if (typeof value !== "string" || value.length > 100) return null;
  const match = value.trim().match(/^(.+)#([0-9]{4})$/u);
  if (!match) return null;
  const nickname = match[1].trim();
  return nickname ? { nickname, tag: match[2] } : null;
}
