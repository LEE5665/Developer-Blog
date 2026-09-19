"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor, useEditorState, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ImageGroup } from "./ImageGroup";
import { ImageUpload, uploadKey } from "./ImageUpload";
import { ResizableImage } from "./ResizableImage";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { TagInput } from "./TagInput";
import TextAlign from "@tiptap/extension-text-align";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/app/components/Icon";
import { Modal } from "@/app/components/Modal";
import { PostContent } from "@/app/components/PostContent";
import { documentOutline, hasDocumentContent, normalizeDocument, readDocument, safeImage, safeLink, serializeDocument } from "@/lib/post-content";
import { EditorToolbar } from "./EditorToolbar";
import { parseClipboardText } from "./clipboard-text";

type Visibility = "PUBLIC" | "FRIENDS" | "PRIVATE";
interface CategoryOption { id: string; name: string; isDivider: boolean }
interface Draft { tags: string[]; title: string; doc: JSONContent; categoryId: string; visibility: Visibility; savedAt: string; version?: number }
interface EditablePost { tags: string[]; id: string; title: string; content: string; categoryId: string | null; visibility: Visibility; updatedAt: string }
const emptyDocument: JSONContent = { type: "doc", content: [{ type: "paragraph" }] };

export function WriteForm({ categories, userId, initialPost }: { categories: CategoryOption[]; userId: string; initialPost?: EditablePost }) {
  const router = useRouter();
  const draftKey = initialPost?.id || "new";
  const storageKey = `developer-blog-draft:${userId}${initialPost ? ":" + initialPost.id : ""}`;
  const initialContent = initialPost?.content;
  const initialDocument = useMemo(() => initialContent !== undefined ? readDocument(initialContent) || { type: "doc", content: initialContent.split("\n").map((text) => ({ type: "paragraph", content: text ? [{ type: "text", text }] : [] })) } : emptyDocument, [initialContent]);
  const [showToc, setShowToc] = useState(initialPost ? readDocument(initialPost.content)?.attrs?.toc !== "hidden" : true);
  const [tocDepth, setTocDepth] = useState(Number(initialPost ? readDocument(initialPost.content)?.attrs?.tocDepth || 4 : 4));
  const [tags, setTags] = useState<string[]>(initialPost?.tags || []);
  const [title, setTitle] = useState(initialPost?.title || "");
  const [categoryId, setCategoryId] = useState(initialPost?.categoryId || "none");
  const [visibility, setVisibility] = useState<Visibility>(initialPost?.visibility || "PUBLIC");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draftMessage, setDraftMessage] = useState("서버 임시저장을 준비하고 있습니다");
  const [storedDraft, setStoredDraft] = useState<Draft | null>(null);
  const [draftPromptOpen, setDraftPromptOpen] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const [revision, setRevision] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [insertMode, setInsertMode] = useState<"link" | "image" | null>(null);
  const [insertUrl, setInsertUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [insertError, setInsertError] = useState<string | null>(null);
  const [imageBusy, setImageBusy] = useState(false);
  const [imageLayout, setImageLayout] = useState("separate");
  const [failedUpload, setFailedUpload] = useState<{ files: File[]; grouped: boolean } | null>(null);
  const uploadBusy = useRef(false);
  const pasteUpload = useRef<(files: File[]) => void>(() => {});
  const dirty = useRef(false);
  const revisionRef = useRef(0);
  const draftVersion = useRef<number | null>(null);
  const pendingSave = useRef<Promise<boolean>>(Promise.resolve(true));
  const savingPaused = useRef(false);
  const draftConflict = useRef(false);
  const published = useRef(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  // Stable options avoid reapplying the editor view's props on every keystroke.
  const extensions = useMemo(() => [
      StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false, defaultProtocol: "https", protocols: ["http", "https", "mailto"] } }),
      TextStyle, FontSize, Highlight.configure({ multicolor: true }),
      Placeholder.configure({ placeholder: "이곳에 당신의 이야기를 들려주세요." }),
      ImageGroup, ImageUpload,
      ResizableImage.configure({ allowBase64: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ], []);
  const editorProps = useMemo<NonNullable<Parameters<typeof useEditor>[0]>["editorProps"]>(() => ({ clipboardTextParser: parseClipboardText, handlePaste: (_view, event) => {
    const files = Array.from(event.clipboardData?.items || []).filter(item => item.kind === "file" && item.type.startsWith("image/")).map(item => item.getAsFile()).filter((file): file is File => !!file);
    if (!files.length) return false;
    event.preventDefault(); pasteUpload.current(files); return true;
  }, attributes: { class: "rich-prose composer-body", role: "textbox", "aria-label": "글 본문", "aria-multiline": "true" } }), []);
  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    content: initialDocument,
    editorProps,
    onUpdate: () => { dirty.current = true; revisionRef.current += 1; setRevision((value) => value + 1); },
  });
  // Keep toolbar state in sync with the caret and undo history, not just typing.
  const editorState = useEditorState({ editor, selector: ({ editor }) => ({ transaction: editor?.state, count: editor?.getText().length || 0 }) });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/drafts?key=${encodeURIComponent(draftKey)}`, { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "서버 임시 글을 불러오지 못했습니다.");
        if (cancelled) return;
        const draft = result.draft;
        draftVersion.current = draft?.version ?? null;
        if (draft) {
          setStoredDraft({ tags: draft.tags || [], title: draft.title, doc: normalizeDocument(readDocument(draft.content)), categoryId: draft.categoryId || "none", visibility: draft.visibility, savedAt: draft.updatedAt, version: draft.version });
          setDraftPromptOpen(true);
        } else {
          // Recover pre-existing browser drafts, then migrate them on the next save.
          try {
            const raw = localStorage.getItem(storageKey);
            if (raw) {
              const local = JSON.parse(raw) as Draft;
              local.doc = normalizeDocument(local.doc);
              if (typeof local.title === "string" && ["PUBLIC", "PRIVATE", "FRIENDS"].includes(local.visibility)) {
                setStoredDraft(local);
                setDraftPromptOpen(true);
              }
            }
          } catch { /* Invalid local drafts never replace a server draft. */ }
        }
        setDraftReady(true);
        setDraftMessage("변경 내용이 서버에 자동 저장됩니다");
      })
      .catch((error) => { if (!cancelled) { setError(error.message); setDraftMessage("서버 임시저장을 불러오지 못했습니다. 새로고침해주세요."); } });
    return () => { cancelled = true; };
  }, [draftKey, storageKey]);

  const saveDraft = useCallback((): Promise<boolean> => {
    if (!editor || !draftReady || storedDraft || published.current || savingPaused.current || draftConflict.current) return Promise.resolve(false);
    const versionAtSave = revisionRef.current;
    const snapshot: Draft = { tags, title, doc: { ...editor.getJSON(), attrs: { toc: showToc ? "shown" : "hidden", tocDepth } }, categoryId, visibility, savedAt: new Date().toISOString() };
    try { localStorage.setItem(storageKey, JSON.stringify(snapshot)); } catch { /* Server persistence remains available. */ }
    pendingSave.current = pendingSave.current.then(async () => {
      if (published.current || draftConflict.current) return false;
      setDraftMessage("서버에 임시저장 중...");
      try {
        const response = await fetch("/api/drafts", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: draftKey, title: snapshot.title, tags: snapshot.tags, content: serializeDocument(snapshot.doc), categoryId: snapshot.categoryId, visibility: snapshot.visibility, version: draftVersion.current }) });
        const result = await response.json();
        if (!response.ok) { if (response.status === 409) draftConflict.current = true; throw new Error(result.error || "임시저장에 실패했습니다."); }
        draftVersion.current = result.draft.version;
        if (versionAtSave === revisionRef.current) dirty.current = false;
        setDraftMessage(`${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })} 서버 임시저장 완료`);
        return true;
      } catch (error) { setDraftMessage(error instanceof Error ? error.message : "임시저장 실패 · 창을 닫지 마세요"); return false; }
    });
    return pendingSave.current;
  }, [editor, draftReady, storedDraft, title, categoryId, visibility, storageKey, draftKey, showToc, tocDepth, tags]);

  useEffect(() => {
    if (!dirty.current || storedDraft || !draftReady) return;
    const timer = window.setTimeout(() => void saveDraft(), 20_000);
    return () => window.clearTimeout(timer);
  }, [revision, saveDraft, storedDraft, draftReady]);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if ((dirty.current || uploadBusy.current) && !published.current) { event.preventDefault(); event.returnValue = ""; }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  function changed() { dirty.current = true; revisionRef.current += 1; setRevision((value) => value + 1); }
  function restoreDraft() {
    if (!storedDraft || !editor) return;
    setTitle(storedDraft.title);
    setTags(storedDraft.tags || []);
    setCategoryId(categories.some((category) => category.id === storedDraft.categoryId && !category.isDivider) ? storedDraft.categoryId : "none");
    setVisibility(storedDraft.visibility);
    setShowToc(storedDraft.doc.attrs?.toc !== "hidden");
    setTocDepth(Number(storedDraft.doc.attrs?.tocDepth || 4));
    editor.commands.setContent(storedDraft.doc);
    setStoredDraft(null);
    setDraftPromptOpen(false);
    changed();
  }
  async function discardDraft() {
    const confirmMessage = initialPost
      ? "임시 저장된 수정 내용을 삭제하고 수정 전 원래 글로 되돌릴까요?"
      : "작성 중이던 임시 글을 삭제할까요? 임시로 적었던 글이 제거되고 빈 글에서 새로 시작합니다.";
    if (!window.confirm(confirmMessage)) return;
    setDraftPromptOpen(false);
    savingPaused.current = true;
    setLoading(true);
    await pendingSave.current;
    try {
      const response = await fetch("/api/drafts", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: draftKey, version: draftVersion.current }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "임시 글을 삭제하지 못했습니다.");
      draftVersion.current = null; draftConflict.current = false; dirty.current = false;
      try { localStorage.removeItem(storageKey); } catch { /* Server draft was removed. */ }
      setStoredDraft(null);
      setTags(initialPost?.tags || []);
      setTitle(initialPost?.title || ""); setCategoryId(initialPost?.categoryId || "none"); setVisibility(initialPost?.visibility || "PUBLIC");
      setShowToc(initialPost ? readDocument(initialPost.content)?.attrs?.toc !== "hidden" : true);
      setTocDepth(Number(initialPost ? readDocument(initialPost.content)?.attrs?.tocDepth || 4 : 4));
      editor?.commands.setContent(initialDocument, { emitUpdate: false });
      setDraftMessage(initialPost ? "수정 전 원래 글로 되돌렸습니다" : "임시 글이 삭제되었습니다"); setError(null);
    } catch (error) { setError(error instanceof Error ? error.message : "임시 글 삭제에 실패했습니다."); }
    finally { savingPaused.current = false; setLoading(false); }
  }
  function openInsert(mode: "link" | "image") {
    setInsertUrl(mode === "link" ? editor?.getAttributes("link").href || "" : "");
    setImageAlt(""); setInsertError(null); setInsertMode(mode);
  }
  function insertFromUrl(event: React.FormEvent) {
    event.preventDefault();
    const url = insertMode === "image" ? safeImage(insertUrl.trim()) : safeLink(insertUrl.trim());
    if (!url) { setInsertError("http:// 또는 https://로 시작하는 올바른 주소를 입력해주세요."); return; }
    if (insertMode === "image") editor?.chain().focus().setImage({ src: url, alt: imageAlt, width: "100%" } as never).run();
    else if (editor?.state.selection.empty && !editor.isActive("link")) editor.chain().focus().insertContent({ type: "text", text: url, marks: [{ type: "link", attrs: { href: url } }] }).run();
    else editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setInsertMode(null);
  }
  async function insertFiles(files: File[], grouped = false) {
    if (!files.length || !editor || uploadBusy.current || !draftReady || storedDraft || loading) return;
    if (files.some(file => !["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024)) {
      setInsertError("10MB 이하의 JPG, PNG, WebP 이미지를 선택해주세요."); return;
    }
    uploadBusy.current = true; setImageBusy(true); setInsertError(null); setFailedUpload(null);
    const id = crypto.randomUUID();
    editor.view.dispatch(editor.state.tr.setMeta(uploadKey, { add: true, id, pos: editor.state.selection.from }));
    try {
      const images: JSONContent[] = [];
      for (const file of files) {
        const form = new FormData(); form.append("file", file);
        const response = await fetch("/api/images", { method: "POST", body: form });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "이미지를 업로드하지 못했습니다.");
        const src = safeImage(result.url);
        if (!src) throw new Error("이미지 주소를 확인할 수 없습니다.");
        images.push({ type: "image", attrs: { src, alt: imageAlt || file.name, width: "100%" } });
      }
      if (editor.isDestroyed) return;
      const placeholder = uploadKey.getState(editor.state)?.find(undefined, undefined, spec => spec.id === id)[0];
      if (placeholder) {
        const content: JSONContent[] = [];
        for (let i = 0; i < images.length; i += grouped ? 3 : 1) {
          const batch = images.slice(i, i + (grouped ? 3 : 1));
          content.push(batch.length > 1 ? { type: "imageGroup", content: batch } : batch[0]);
        }
        editor.chain().insertContentAt(placeholder.from, content).run();
      }
      setInsertMode(null);
    } catch (err) { setInsertError(err instanceof Error ? err.message : "이미지를 업로드하지 못했습니다."); setFailedUpload({ files, grouped }); }
    finally {
      if (!editor.isDestroyed) editor.view.dispatch(editor.state.tr.setMeta(uploadKey, { remove: true, id }));
      uploadBusy.current = false; setImageBusy(false); if (fileInput.current) fileInput.current.value = "";
    }
  }
  useEffect(() => { pasteUpload.current = files => { void insertFiles(files); }; });

  function preparePublish() {
    if (uploadBusy.current) return;
    setError(null);
    if (!title.trim()) { setError("제목을 입력해주세요."); titleInput.current?.focus(); return; }
    if (!editor || !hasDocumentContent(normalizeDocument(editor.getJSON()))) { setError("본문을 입력하거나 이미지를 추가해주세요."); editor?.commands.focus(); return; }
    setPublishOpen(true);
  }
  async function publish(event: React.FormEvent) {
    event.preventDefault();
    if (!editor || loading || uploadBusy.current) return;
    setLoading(true); setError(null); savingPaused.current = true;
    await pendingSave.current;
    try {
      const res = await fetch(initialPost ? `/api/posts/${initialPost.id}` : "/api/posts", { method: initialPost ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, tags, draftVersion: draftVersion.current, updatedAt: initialPost?.updatedAt, content: serializeDocument({ ...editor.getJSON(), attrs: { toc: showToc ? "shown" : "hidden", tocDepth } }), categoryId: categoryId === "none" ? null : categoryId, visibility }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "글을 발행하지 못했습니다.");
      published.current = true; dirty.current = false;
      try { localStorage.removeItem(storageKey); } catch { /* Publishing has succeeded. */ }
      router.push(`/posts/${data.post.id}`); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "서버와 연결하지 못했습니다."); setLoading(false); savingPaused.current = false; }
  }

  return (
    <div className={`composer ${focusMode ? "composer-focus" : ""}`}>
      <div className="composer-topbar">
        <div className="flex items-center gap-3"><Link href="/" className="composer-back" aria-label="피드로 돌아가기" onClick={(event) => { if (dirty.current && !window.confirm("아직 저장하지 못한 내용이 있습니다. 나가시겠습니까?")) event.preventDefault(); }}><Icon name="back" width={18} height={18} /></Link><h1>{initialPost ? "글 수정" : "글쓰기"}</h1><span className="composer-top-hint">새로운 이야기의 시작</span></div>
        <button type="button" className="composer-focus-button" aria-pressed={focusMode} onClick={() => setFocusMode(!focusMode)}><Icon name="monitor" width={16} height={16} />{focusMode ? "집중 모드 종료" : "집중 모드"}</button>
      </div>
      <div className="composer-outline-settings">
        <label><input type="checkbox" checked={showToc} disabled={!draftReady || !!storedDraft || loading} onChange={(event) => { setShowToc(event.target.checked); changed(); }} />글에 목차 표시</label>
        <select aria-label="목차에 포함할 제목 단계" value={tocDepth} disabled={!showToc || !draftReady || !!storedDraft || loading} onChange={(event) => { setTocDepth(Number(event.target.value)); changed(); }}><option value={2}>제목 1만</option><option value={3}>제목 1·2</option><option value={4}>제목 1·2·3</option></select>
        <span>본문에 제목 서식을 적용하면 목차에 자동으로 추가됩니다.</span>
      </div>
      <EditorToolbar editor={!draftReady || storedDraft || loading ? null : editor} onLink={() => openInsert("link")} onImage={() => openInsert("image")} />
      <div className="composer-sheet">
        <div className="composer-paper">
          <div className="composer-category"><Icon name="folder" width={15} height={15} /><label className="sr-only" htmlFor="composer-category">카테고리 선택</label><select id="composer-category" disabled={!draftReady || !!storedDraft || loading} value={categoryId} onChange={(event) => { setCategoryId(event.target.value); changed(); }}><option value="none">카테고리 선택</option>{categories.filter((category) => !category.isDivider).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
          <input ref={titleInput} aria-label="글 제목" className="composer-title" placeholder="제목을 입력하세요" value={title} maxLength={200} disabled={!draftReady || !!storedDraft || loading} onChange={(event) => { setTitle(event.target.value); changed(); }} />
          <TagInput tags={tags} disabled={!draftReady || !!storedDraft || loading} onChange={(value) => { setTags(value); changed(); }} />
          <div className="composer-byline">나만의 경험이 담긴 한 편의 글을 완성해보세요.</div>
          {showToc && <details className="editor-outline"><summary>목차 미리보기 · {documentOutline(editor?.getJSON() || null, "editor", tocDepth).length}개 제목</summary><ol>{documentOutline(editor?.getJSON() || null, "editor", tocDepth).map((item) => <li key={item.id} style={{ paddingLeft: (item.level - 2) * 12 }}><button type="button" onClick={() => {
            let index = 0;
            editor?.state.doc.descendants((node, position) => {
              if (node.type.name === "heading" && ++index === item.index) editor.chain().focus().setTextSelection(position + 1).scrollIntoView().run();
            });
          }}>{item.text}</button></li>)}</ol><p>목차의 제목을 누르면 해당 위치를 편집할 수 있습니다.</p></details>}
          {error && !publishOpen && <p role="alert" className="composer-error">{error}</p>}
          {imageBusy && <p role="status">이미지를 업로드하고 있습니다…</p>}
          {insertError && !insertMode && <p role="alert" className="composer-error">{insertError}</p>}
          {failedUpload && <button type="button" className="button button-secondary" disabled={imageBusy} onClick={() => void insertFiles(failedUpload.files, failedUpload.grouped)}>이미지 업로드 재시도</button>}
          <div className="composer-editor-wrap" inert={!draftReady || !!storedDraft || loading}>
            <EditorContent editor={editor} />
            {!editor && <p className="text-muted py-8 text-sm">편집기를 준비하고 있습니다...</p>}
          </div>
        </div>
      </div>
      <div className="composer-bottom-bar">
        <div className="composer-save-info"><span className="save-dot" /><span role="status">{draftMessage}</span><span className="composer-word-count">{(editorState?.count || 0).toLocaleString()}자</span></div>
        <div className="composer-actions"><button type="button" className="button button-secondary" disabled={!editor || !draftReady || loading || imageBusy} onClick={() => void discardDraft()}>{initialPost ? "수정 전으로 되돌리기" : "임시 글 삭제"}</button><button type="button" className="button button-secondary" disabled={!editor || !draftReady || !!storedDraft || loading || imageBusy} onClick={() => { try { setPreviewContent(serializeDocument({ ...editor?.getJSON(), attrs: { toc: showToc ? "shown" : "hidden", tocDepth } })); } catch (err) { setError(err instanceof Error ? err.message : "미리보기를 열 수 없습니다."); } }}>미리보기</button><button type="button" className="button button-secondary" disabled={!editor || !draftReady || !!storedDraft || loading || imageBusy} onClick={() => void saveDraft()}>임시저장</button><button type="button" className="button button-accent" disabled={!editor || !draftReady || !!storedDraft || loading || imageBusy} onClick={preparePublish}>완료<Icon name="arrow" width={15} height={15} /></button></div>
      </div>

      <Modal open={draftPromptOpen && !!storedDraft} closable={false} title={initialPost ? "수정 중이던 임시 글 복구" : "작성 중이던 임시 글 복구"}>
        <div className="modal-form">
          <p className="text-sm" style={{ lineHeight: "1.6" }}>
            {initialPost
              ? "이전에 수정 중이던 임시 저장 내용이 있습니다. 이어서 수정하시겠습니까, 아니면 임시 내용을 삭제하고 수정 전 원래 글로 되돌리시겠습니까?"
              : "이전에 작성 중이던 임시 저장 글이 있습니다. 이어서 작성하시겠습니까, 아니면 임시로 적었던 글을 삭제하고 새로 작성하시겠습니까?"}
          </p>
          <div className="publish-summary" style={{ margin: "4px 0" }}>
            <span>{initialPost ? "임시 저장된 수정 제목" : "임시 저장된 글 제목"}</span>
            <strong style={{ fontSize: "15px" }}>{storedDraft?.title || "제목 없는 글"}</strong>
            {storedDraft && (
              <span style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>
                {new Date(storedDraft.savedAt).toLocaleString("ko-KR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })} 저장됨
              </span>
            )}
          </div>
          <div className="modal-actions">
            <button type="button" className="button button-secondary" onClick={() => void discardDraft()}>
              {initialPost ? "수정 전으로 되돌리기" : "새로 쓰기"}
            </button>
            <button type="button" className="button button-primary" onClick={restoreDraft} disabled={!editor}>
              {initialPost ? "수정 이어하기" : "이어서 쓰기"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={previewContent !== null} onClose={() => setPreviewContent(null)} title="미리보기" wide>
        <article className="composer-preview"><span className="eyebrow">PREVIEW</span><h1>{title || "제목 없는 글"}</h1>{previewContent && <PostContent content={previewContent} />}</article>
      </Modal>
      <Modal open={insertMode !== null} onClose={() => { if (!imageBusy) setInsertMode(null); }} title={insertMode === "image" ? "이미지 삽입" : "링크 삽입"}>
        <form onSubmit={insertFromUrl} className="modal-form">
          {insertMode === "image" && <><label>여러 이미지 배치<select value={imageLayout} onChange={event => setImageLayout(event.target.value)} disabled={imageBusy}><option value="separate">각각 넣기</option><option value="group">나란히 넣기 (한 줄 최대 3장)</option></select></label><button type="button" className="image-upload-area" disabled={imageBusy} onClick={() => fileInput.current?.click()}><Icon name="file" width={26} height={26} /><strong>{imageBusy ? "이미지를 업로드하고 있습니다..." : "내 컴퓨터에서 이미지 선택"}</strong><span>JPG, PNG, WebP · 최대 10MB · 자동 크기 조정</span></button><input ref={fileInput} type="file" multiple accept="image/png,image/jpeg,image/webp" hidden onChange={(event) => void insertFiles(Array.from(event.target.files || []), imageLayout === "group")} /><p className="text-xs text-muted text-center">또는 이미지 주소로 삽입</p></>}
          <label htmlFor="insert-url">{insertMode === "image" ? "이미지 주소" : "링크 주소"}</label><input id="insert-url" type="url" required placeholder="https://" value={insertUrl} onChange={(event) => setInsertUrl(event.target.value)} disabled={imageBusy} />
          {insertMode === "image" && <><label htmlFor="image-description">이미지 설명 (선택)</label><input id="image-description" value={imageAlt} onChange={(event) => setImageAlt(event.target.value)} placeholder="이미지에 대한 짧은 설명" maxLength={300} /></>}
          {insertError && <p role="alert" className="composer-error">{insertError}</p>}
          <div className="modal-actions">{insertMode === "link" && editor?.isActive("link") && <button type="button" className="button button-secondary" onClick={() => { editor.chain().focus().extendMarkRange("link").unsetLink().run(); setInsertMode(null); }}>링크 제거</button>}<button type="submit" className="button button-accent" disabled={imageBusy}>삽입하기</button></div>
        </form>
      </Modal>
      <Modal open={publishOpen} onClose={() => { if (!loading) setPublishOpen(false); }} title={initialPost ? "수정 완료" : "글 쓰기"}>
        <form onSubmit={publish} className="modal-form">
          <div className="publish-summary"><span>발행할 글</span><strong>{title}</strong></div>
          <label htmlFor="publish-category">카테고리</label><select id="publish-category" value={categoryId} disabled={loading} onChange={(event) => { setCategoryId(event.target.value); changed(); }}><option value="none">미분류</option>{categories.filter((category) => !category.isDivider).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
          <fieldset disabled={loading}><legend>공개 범위</legend><div className="publish-visibility">{([{ value: "PUBLIC", label: "전체 공개", description: "누구나 읽을 수 있어요", icon: "globe" }, { value: "FRIENDS", label: "친구 공개", description: "등록된 친구에게만 보여요", icon: "users" }, { value: "PRIVATE", label: "나만 보기", description: "나만 읽을 수 있어요", icon: "lock" }] as const).map((option) => <label key={option.value} className={visibility === option.value ? "selected" : ""}><input type="radio" name="publish-visibility" value={option.value} checked={visibility === option.value} onChange={() => { setVisibility(option.value); changed(); }} /><Icon name={option.icon} /><span><strong>{option.label}</strong><small>{option.description}</small></span></label>)}</div></fieldset>
          {error && <p role="alert" className="composer-error">{error}</p>}
          <div className="modal-actions"><button type="button" className="button button-secondary" disabled={loading} onClick={() => setPublishOpen(false)}>계속 편집</button><button type="submit" className="button button-accent" disabled={loading}>{loading ? "저장 중..." : initialPost ? "수정 저장" : "글 발행하기"}</button></div>
        </form>
      </Modal>
    </div>
  );
}
