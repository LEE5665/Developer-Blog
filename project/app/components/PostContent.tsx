import { Fragment, type ReactNode, type CSSProperties } from "react";
import { PostImage } from "./PostImage";
import { imageGroupWidths, readDocument, type PostNode } from "@/lib/post-content";

function renderNode(node: PostNode, key: number, context: { heading: number; prefix: string }): ReactNode {
  const headingId = node.type === "heading" ? `${context.prefix}-section-${++context.heading}` : undefined;
  const children = node.content?.map((child, index) => renderNode(child, index, context));
  const alignment = node.attrs?.textAlign as CSSProperties["textAlign"];
  const style = alignment ? { textAlign: alignment } : undefined;
  switch (node.type) {
    case "imageGroup": {
      const modeClass = node.attrs?.mode === "natural" ? "image-group-natural" : "image-group-fill";
      const groupWidth = node.attrs?.width ? String(node.attrs.width) : "100%";
      return <div key={key} className={`image-group ${modeClass}`} style={{ gridTemplateColumns: imageGroupWidths(node.attrs?.widths, node.content!.length).map(w => `${w}fr`).join(" "), width: groupWidth, maxWidth: "100%", margin: "24px auto" }}>{children?.map((child, index) => <div className="image-group-cell" key={index}>{child}</div>)}</div>;
    }
    case "text": {
      let text: ReactNode = node.text;
      for (const mark of node.marks || []) {
        if (mark.type === "bold") text = <strong>{text}</strong>;
        if (mark.type === "italic") text = <em>{text}</em>;
        if (mark.type === "underline") text = <u>{text}</u>;
        if (mark.type === "strike") text = <s>{text}</s>;
        if (mark.type === "textStyle") text = <span style={{ fontSize: String(mark.attrs?.fontSize) }}>{text}</span>;
        if (mark.type === "highlight") text = <mark style={{ backgroundColor: String(mark.attrs?.color) }}>{text}</mark>;
        if (mark.type === "code") text = <code>{text}</code>;
        if (mark.type === "link") text = <a href={String(mark.attrs?.href)} target="_blank" rel="noopener noreferrer nofollow">{text}</a>;
      }
      return <Fragment key={key}>{text}</Fragment>;
    }
    case "paragraph": return <p key={key} style={style}>{children || <br />}</p>;
    case "heading": {
      const Tag = node.attrs?.level === 3 ? "h3" : node.attrs?.level === 4 ? "h4" : "h2";
      return <Tag key={key} id={headingId} tabIndex={-1} className="article-heading" style={style}>{children}</Tag>;
    }
    case "bulletList": return <ul key={key}>{children}</ul>;
    case "orderedList": return <ol key={key} start={Number(node.attrs?.start) || 1}>{children}</ol>;
    case "listItem": return <li key={key}>{children}</li>;
    case "blockquote": return <blockquote key={key}>{children}</blockquote>;
    case "codeBlock": return <pre key={key}><code>{children}</code></pre>;
    case "horizontalRule": return <hr key={key} />;
    case "hardBreak": return <br key={key} />;
    // User-supplied remote and embedded images cannot use a fixed Next image host list.
    case "image": {
      const width = node.attrs?.width ? String(node.attrs.width) : undefined;
      return <PostImage key={key} src={String(node.attrs?.src)} alt={String(node.attrs?.alt || "")} title={node.attrs?.title ? String(node.attrs.title) : undefined} width={width} />;
    }
    default: return <Fragment key={key}>{children}</Fragment>;
  }
}

export function PostContent({ content, idPrefix = "article" }: { content: string; idPrefix?: string }) {
  const doc = readDocument(content);
  const context = { heading: 0, prefix: idPrefix };
  return <div className="rich-prose">{doc ? doc.content?.map((node, index) => renderNode(node, index, context)) : <p className="whitespace-pre-wrap">{content}</p>}</div>;
}
