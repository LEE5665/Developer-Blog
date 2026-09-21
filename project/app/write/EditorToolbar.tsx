"use client";

import { useEffect, useRef, useState } from "react";
import { FONT_SIZES, HIGHLIGHT_COLORS } from "@/lib/post-content";
import { useEditorState, type Editor } from "@tiptap/react";
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

interface DropdownOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  preview?: React.ReactNode;
}

interface ToolbarDropdownProps<T extends string = string> {
  label: string;
  value: T;
  displayLabel?: React.ReactNode;
  options: readonly DropdownOption<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  minWidth?: number | string;
}

function ToolbarDropdown<T extends string = string>({
  label,
  value,
  displayLabel,
  options,
  onChange,
  disabled = false,
  minWidth,
}: ToolbarDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const currentOption = options.find((opt) => opt.value === value);
  const title = displayLabel ?? currentOption?.label ?? options[0]?.label;

  return (
    <div className="toolbar-dropdown" ref={containerRef} style={minWidth ? { minWidth } : undefined}>
      <button
        type="button"
        className="toolbar-dropdown-trigger"
        aria-label={label}
        title={label}
        aria-expanded={open}
        disabled={disabled}
        style={minWidth ? { width: "100%", minWidth } : undefined}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <svg className="toolbar-dropdown-arrow" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="toolbar-dropdown-menu" role="listbox" aria-label={label}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                type="button"
                key={option.value}
                className="toolbar-dropdown-item"
                role="option"
                aria-selected={isSelected}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {option.preview}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const PARAGRAPH_OPTIONS: readonly DropdownOption[] = [
  { value: "paragraph", label: "본문" },
  { value: "2", label: "제목 1" },
  { value: "3", label: "제목 2" },
  { value: "4", label: "제목 3" },
];

const FONT_SIZE_OPTIONS: readonly DropdownOption[] = [
  { value: "", label: "기본 크기" },
  ...FONT_SIZES.map((size) => ({
    value: size,
    label: `${size.replace("px", "")} px`,
  })),
];

const HIGHLIGHT_OPTIONS: readonly DropdownOption[] = [
  {
    value: "",
    label: "배경색 없음",
    preview: <span className="w-3 h-3 rounded-full border border-zinc-300 dark:border-zinc-600 inline-block" />,
  },
  ...HIGHLIGHT_COLORS.map((color) => ({
    value: color,
    label: HIGHLIGHT_NAMES[color] || color,
    preview: (
      <span
        className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
        style={{ backgroundColor: color }}
      />
    ),
  })),
];

interface Props {
  editor: Editor | null;
  onLink: () => void;
  onImage: () => void;
}

export function EditorToolbar({ editor, onLink, onImage }: Props) {
  useEditorState({ editor, selector: ({ editor }) => editor?.state });

  function tool(label: string, text: React.ReactNode, action: () => void, active = false, disabled = false) {
    return (
      <button
        type="button"
        title={label}
        aria-label={label}
        aria-pressed={active}
        disabled={!editor || disabled}
        onMouseDown={(event) => event.preventDefault()}
        onClick={action}
      >
        {text}
      </button>
    );
  }

  const paragraphValue = editor?.isActive("heading", { level: 2 })
    ? "2"
    : editor?.isActive("heading", { level: 3 })
    ? "3"
    : editor?.isActive("heading", { level: 4 })
    ? "4"
    : "paragraph";

  const handleParagraphChange = (nextValue: string) => {
    if (!editor) return;
    if (nextValue === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: Number(nextValue) as 2 | 3 | 4 }).run();
    }
  };

  const fontSizeValue = editor?.getAttributes("textStyle").fontSize || "";
  const handleFontSizeChange = (nextSize: string) => {
    if (!editor) return;
    if (nextSize) {
      editor.chain().focus().setFontSize(nextSize).run();
    } else {
      editor.chain().focus().unsetFontSize().run();
    }
  };

  const highlightValue = editor?.getAttributes("highlight").color || "";
  const handleHighlightChange = (nextColor: string) => {
    if (!editor) return;
    if (nextColor) {
      editor.chain().focus().setHighlight({ color: nextColor }).run();
    } else {
      editor.chain().focus().unsetHighlight().run();
    }
  };

  const highlightDisplayLabel = highlightValue ? (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
        style={{ backgroundColor: highlightValue }}
      />
      <span>{HIGHLIGHT_NAMES[highlightValue] || "배경색"}</span>
    </span>
  ) : (
    "배경색 없음"
  );

  return (
    <div className="composer-toolbar" role="group" aria-label="본문 서식 도구">
      <div className="toolbar-group">
        <ToolbarDropdown
          label="문단 스타일"
          value={paragraphValue}
          options={PARAGRAPH_OPTIONS}
          onChange={handleParagraphChange}
          disabled={!editor}
          minWidth={80}
        />
      </div>
      <div className="toolbar-group" style={{ gap: 0 }}>
        <ToolbarDropdown
          label="글자 크기"
          value={fontSizeValue}
          displayLabel={fontSizeValue ? `${fontSizeValue.replace("px", "")} px` : "기본 크기"}
          options={FONT_SIZE_OPTIONS}
          onChange={handleFontSizeChange}
          disabled={!editor}
          minWidth={88}
        />
        <ToolbarDropdown
          label="글자 배경색"
          value={highlightValue}
          displayLabel={highlightDisplayLabel}
          options={HIGHLIGHT_OPTIONS}
          onChange={handleHighlightChange}
          disabled={!editor}
          minWidth={104}
        />
      </div>
      <div className="toolbar-group">
        {tool("굵게 (Ctrl+B)", <b>B</b>, () => editor?.chain().focus().toggleBold().run(), editor?.isActive("bold"))}
        {tool("기울임 (Ctrl+I)", <i>I</i>, () => editor?.chain().focus().toggleItalic().run(), editor?.isActive("italic"))}
        {tool("밑줄 (Ctrl+U)", <u>U</u>, () => editor?.chain().focus().toggleUnderline().run(), editor?.isActive("underline"))}
        {tool("취소선", <s>S</s>, () => editor?.chain().focus().toggleStrike().run(), editor?.isActive("strike"))}
      </div>
      <div className="toolbar-group">
        {(["left", "center", "right"] as const).map((align) => (
          <button
            type="button"
            key={align}
            title={{ left: "왼쪽 정렬", center: "가운데 정렬", right: "오른쪽 정렬" }[align]}
            aria-label={{ left: "왼쪽 정렬", center: "가운데 정렬", right: "오른쪽 정렬" }[align]}
            disabled={!editor}
            aria-pressed={editor?.isActive({ textAlign: align }) || false}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor?.chain().focus().setTextAlign(align).run()}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path
                d={
                  align === "left"
                    ? "M3 5h18M3 10h12M3 15h18M3 20h12"
                    : align === "right"
                    ? "M3 5h18M9 10h12M3 15h18M9 20h12"
                    : "M3 5h18M6 10h12M3 15h18M6 20h12"
                }
              />
            </svg>
          </button>
        ))}
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
