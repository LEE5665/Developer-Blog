// Old accounts and JWTs sometimes stored the nickname discriminator in name.
export function displayName(name: string | null | undefined, tag: unknown) {
  if (!name || typeof tag !== "string" || !/^[0-9]{4}$/.test(tag) || !name.endsWith("#" + tag)) return name;
  return name.slice(0, -tag.length - 1).trimEnd() || name;
}
