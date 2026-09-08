"use client";

import { FONT_SIZES, HIGHLIGHT_COLORS } from "@/lib/post-content";
import type { Editor } from "@tiptap/react";
import { Icon } from "@/app/components/Icon";

const HIGHLIGHT_NAMES: Record<string, string> = {
  "#fef08a": "노랑",
  "#fed7aa": "주황",
  "#bbf7d0": "초록",
  "#99f6e4": "민트",
  "#bfdbfe": "파랑",
  "#ddd6fe": "보라",
  "#fbcfe8": "분홍",
  "#fecaca": "빨강",
  "#e2e8f0": "회색",
};

interface Props {
  editor: Editor | null;
  onLink: () => void;
  onImage: () => void;
}

export function EditorToolbar({ editor, onLink, onImage }: Props) {
  function tool(label: string, text: React.ReactNode, action: () => void, active = false, disabled = false) {
    return <button type="button" title={label} aria-label={label} aria-pressed={active} disabled={!editor || disabled} onMouseDown={(event) => event.preventDefault()} onClick={action}>{text}</button>;
  }
  return (
    <div className="composer-toolbar" role="group" aria-label="본문 서식 도구">
      <div className="toolbar-group">
        <select aria-label="문단 스타일" disabled={!editor} value={editor?.isActive("heading", { level: 2 }) ? "2" : editor?.isActive("heading", { level: 3 }) ? "3" : editor?.isActive("heading", { level: 4 }) ? "4" : "paragraph"} onChange={(event) => {
          if (event.target.value === "paragraph") editor?.chain().focus().setParagraph().run();
          else editor?.chain().focus().toggleHeading({ level: Number(event.target.value) as 2 | 3 | 4 }).run();
        }}><option value="paragraph">본문</option><option value="2">제목 1</option><option value="3">제목 2</option><option value="4">제목 3</option></select>
      </div>
      <div className="toolbar-group">
        <select aria-label="글자 크기" disabled={!editor} value={editor?.getAttributes("textStyle").fontSize || ""} onChange={(event) => { if (event.target.value) editor?.chain().focus().setFontSize(event.target.value).run(); else editor?.chain().focus().unsetFontSize().run(); }}><option value="">기본 크기</option>{FONT_SIZES.map((size) => <option key={size} value={size}>{size.replace("px", "")} px</option>)}</select>
        <select aria-label="글자 배경색" disabled={!editor} value={editor?.getAttributes("highlight").color || ""} onChange={(event) => { if (event.target.value) editor?.chain().focus().setHighlight({ color: event.target.value }).run(); else editor?.chain().focus().unsetHighlight().run(); }}><option value="">배경색 없음</option>{HIGHLIGHT_COLORS.map((color) => <option key={color} value={color}>{HIGHLIGHT_NAMES[color] || color}</option>)}</select>
      </div>
      <div className="toolbar-group">
        {tool("굵게 (Ctrl+B)", <b>B</b>, () => editor?.chain().focus().toggleBold().run(), editor?.isActive("bold"))}
        {tool("기울임 (Ctrl+I)", <i>I</i>, () => editor?.chain().focus().toggleItalic().run(), editor?.isActive("italic"))}
        {tool("밑줄 (Ctrl+U)", <u>U</u>, () => editor?.chain().focus().toggleUnderline().run(), editor?.isActive("underline"))}
        {tool("취소선", <s>S</s>, () => editor?.chain().focus().toggleStrike().run(), editor?.isActive("strike"))}
      </div>
      <div className="toolbar-group">
        {(["left", "center", "right"] as const).map((align) => <button type="button" key={align} title={{ left: "왼쪽 정렬", center: "가운데 정렬", right: "오른쪽 정렬" }[align]} aria-label={{ left: "왼쪽 정렬", center: "가운데 정렬", right: "오른쪽 정렬" }[align]} disabled={!editor} aria-pressed={editor?.isActive({ textAlign: align }) || false} onMouseDown={(event) => event.preventDefault()} onClick={() => editor?.chain().focus().setTextAlign(align).run()}><svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={align === "left" ? "M3 5h18M3 10h12M3 15h18M3 20h12" : align === "right" ? "M3 5h18M9 10h12M3 15h18M9 20h12" : "M3 5h18M6 10h12M3 15h18M6 20h12"} /></svg></button>)}
      </div>
      <div className="toolbar-group">
        {tool("글머리 목록", <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M9 5h12M9 12h12M9 19h12M3 5h1M3 12h1M3 19h1" /></svg>, () => editor?.chain().focus().toggleBulletList().run(), editor?.isActive("bulletList"))}
        {tool("번호 목록", <span className="text-xs">1. ≡</span>, () => editor?.chain().focus().toggleOrderedList().run(), editor?.isActive("orderedList"))}
        {tool("인용", <span className="text-xl">“</span>, () => editor?.chain().focus().toggleBlockquote().run(), editor?.isActive("blockquote"))}
        {tool("코드 블록", <Icon name="code" width={18} height={18} />, () => editor?.chain().focus().toggleCodeBlock().run(), editor?.isActive("codeBlock"))}
        {tool("구분선", <span>—</span>, () => editor?.chain().focus().setHorizontalRule().run())}
      </div>
      <div className="toolbar-group">
        {tool("링크 삽입 또는 수정", <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m10 13 4-4m-6 7-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(1 0)" /></svg>, onLink, editor?.isActive("link"))}
        {tool("이미지 삽입", <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8" cy="8" r="1.5" /><path d="m3 17 5-5 4 4 4-7 5 6" /></svg>, onImage)}
      </div>
      <div className="toolbar-group toolbar-history">
        {tool("실행 취소 (Ctrl+Z)", <span>↶</span>, () => editor?.chain().focus().undo().run(), false, !editor?.can().undo())}
        {tool("다시 실행 (Ctrl+Shift+Z)", <span>↷</span>, () => editor?.chain().focus().redo().run(), false, !editor?.can().redo())}
      </div>
    </div>
  );
}
