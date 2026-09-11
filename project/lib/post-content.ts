export const RICH_CONTENT_PREFIX = "DB_RICH_TEXT_V1:";
export const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "40px"] as const;
export const HIGHLIGHT_COLORS = [
  "#fef08a",
  "#fed7aa",
  "#bbf7d0",
  "#99f6e4",
  "#bfdbfe",
  "#ddd6fe",
  "#fbcfe8",
  "#fecaca",
  "#e2e8f0",
] as const;
export const MAX_CONTENT_LENGTH = 5_000_000;

export interface PostNode {
  type: string;
  text?: string;
  attrs?: Record<string, string | number | null>;
  marks?: { type: string; attrs?: Record<string, string | number | null> }[];
  content?: PostNode[];
}

export function safeLink(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return ["https:", "http:", "mailto:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export function safeImage(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (/^\/api\/images\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$/.test(value)) return value;
  const url = safeLink(value);
  return url && /^https?:/.test(url) ? url : null;
}

export function safeWidth(value: unknown): string | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const str = String(value).trim();
  if (/^([1-9][0-9]?|100)%$/.test(str)) return str;
  if (/^([1-9][0-9]{1,3})px$/.test(str)) {
    const px = parseInt(str, 10);
    if (px >= 50 && px <= 1600) return `${px}px`;
  }
  return null;
}

export function imageGroupWidths(value: unknown, count: number): number[] {
  const widths = typeof value === "string" ? value.split(",").map(Number) : [];
  if (widths.length !== count || widths.some(w => !Number.isFinite(w) || w < 15 || w > 85) || Math.abs(widths.reduce((a, b) => a + b, 0) - 100) > 0.1) return Array(count).fill(100 / count);
  return widths;
}

const types = new Set(["doc", "paragraph", "heading", "text", "bulletList", "orderedList", "listItem", "blockquote", "codeBlock", "horizontalRule", "hardBreak", "image", "imageGroup"]);
const markTypes = new Set(["bold", "italic", "underline", "strike", "code", "link", "textStyle", "highlight"]);

// Both the API and the React renderer use the same bounded, allowlisted format.
export function normalizeDocument(input: unknown, allowLegacyImages = false): PostNode {
  let count = 0;
  function visit(value: unknown, depth: number): PostNode {
    if (!value || typeof value !== "object" || depth > 32 || ++count > 10000) throw new Error("올바르지 않은 본문 형식입니다.");
    const node = value as Record<string, unknown>;
    if (typeof node.type !== "string" || !types.has(node.type)) throw new Error("지원하지 않는 본문 형식입니다.");
    const result: PostNode = { type: node.type };
    const attrs = (node.attrs && typeof node.attrs === "object" ? node.attrs : {}) as Record<string, unknown>;
    if (node.type === "doc") result.attrs = { toc: attrs.toc === "hidden" ? "hidden" : "shown", tocDepth: [2, 3, 4].includes(Number(attrs.tocDepth)) ? Number(attrs.tocDepth) : 4 };
    if (node.type === "text") {
      if (typeof node.text !== "string") throw new Error("본문 텍스트를 확인해주세요.");
      result.text = node.text;
    }
    if (node.type === "heading") result.attrs = { level: [2, 3, 4].includes(Number(attrs.level)) ? Number(attrs.level) : 2 };
    if (["paragraph", "heading"].includes(node.type) && ["left", "center", "right"].includes(String(attrs.textAlign))) result.attrs = { ...result.attrs, textAlign: String(attrs.textAlign) };
    if (node.type === "orderedList") result.attrs = { start: Math.max(1, Math.min(10000, Number(attrs.start) || 1)) };
    if (node.type === "image") {
      const src = safeImage(attrs.src) || (allowLegacyImages && typeof attrs.src === "string" && /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(attrs.src) ? attrs.src : null);
      if (!src) throw new Error("이미지 주소를 확인해주세요.");
      const width = safeWidth(attrs.width);
      result.attrs = {
        src,
        alt: typeof attrs.alt === "string" ? attrs.alt.slice(0, 300) : "",
        title: typeof attrs.title === "string" ? attrs.title.slice(0, 300) : null,
        ...(width ? { width } : {}),
      };
    }
    if (Array.isArray(node.marks)) {
      result.marks = node.marks.slice(0, 10).flatMap<NonNullable<PostNode["marks"]>[number]>((mark) => {
        if (!mark || typeof mark.type !== "string" || !markTypes.has(mark.type)) return [];
        if (mark.type === "link") {
          const href = safeLink(mark.attrs?.href);
          return href ? [{ type: "link", attrs: { href } }] : [];
        }
        if (mark.type === "textStyle") return FONT_SIZES.includes(mark.attrs?.fontSize) ? [{ type: mark.type, attrs: { fontSize: mark.attrs.fontSize } }] : [];
        if (mark.type === "highlight") return HIGHLIGHT_COLORS.includes(mark.attrs?.color) ? [{ type: mark.type, attrs: { color: mark.attrs.color } }] : [];
        return [{ type: mark.type }];
      });
    }
    if (Array.isArray(node.content)) result.content = node.content.map((child) => visit(child, depth + 1));
    if (node.type === "imageGroup") {
      if (!result.content || result.content.length < 2 || result.content.length > 3 || result.content.some(child => child.type !== "image")) throw new Error("이미지 묶음에는 사진 2~3장이 필요합니다.");
      result.attrs = { widths: imageGroupWidths(attrs.widths, result.content.length).join(",") };
    }
    return result;
  }
  const doc = visit(input, 0);
  if (doc.type !== "doc") throw new Error("올바르지 않은 본문 형식입니다.");
  return doc;
}

export function serializeDocument(doc: unknown): string {
  const content = RICH_CONTENT_PREFIX + JSON.stringify(normalizeDocument(doc));
  if (content.length > MAX_CONTENT_LENGTH) throw new Error("본문 용량이 너무 큽니다. 이미지 수나 크기를 줄여주세요.");
  return content;
}

export function readDocument(content: string): PostNode | null {
  if (!content.startsWith(RICH_CONTENT_PREFIX) || content.length > MAX_CONTENT_LENGTH) return null;
  try { return normalizeDocument(JSON.parse(content.slice(RICH_CONTENT_PREFIX.length)), true); } catch { return null; }
}

export function documentText(node: PostNode): string {
  if (node.type === "image") return "";
  if (node.type === "text") return node.text || "";
  if (node.type === "hardBreak") return "\n";
  const text = (node.content || []).map(documentText).join("");
  return ["paragraph", "heading", "blockquote", "codeBlock", "listItem"].includes(node.type) ? text + "\n" : text;
}

export function hasDocumentContent(doc: PostNode): boolean {
  return Boolean(documentText(doc).trim()) || doc.type === "image" || Boolean(doc.content?.some(hasDocumentContent));
}

export function postExcerpt(content: string): string {
  const doc = readDocument(content);
  return doc ? documentText(doc).trim() || "이미지가 포함된 글입니다." : content;
}

export function imageSources(node: PostNode): string[] {
  return node.type === "image" ? [String(node.attrs?.src || "")] : (node.content || []).flatMap(imageSources);
}

export interface OutlineItem { id: string; text: string; level: number; index: number }
export function documentOutline(doc: PostNode | null, prefix = "article", maxDepth = Number(doc?.attrs?.tocDepth || 4)): OutlineItem[] {
  const items: OutlineItem[] = [];
  let index = 0;
  function visit(node: PostNode) {
    if (node.type === "heading") {
      index += 1;
      const text = documentText(node).trim();
      const level = Number(node.attrs?.level || 2);
      if (text && level <= maxDepth) items.push({ id: `${prefix}-section-${index}`, text, level, index });
    }
    node.content?.forEach(visit);
  }
  if (doc) visit(doc);
  return items;
}
