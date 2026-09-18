import { Fragment, Slice, type Node, type ResolvedPos } from "@tiptap/pm/model";

// ProseMirror calls this only for plain text; HTML and code blocks keep their default handling.
export function parseClipboardText(text: string, context: ResolvedPos): Slice {
  const { schema } = context.doc.type;
  const marks = context.marks();
  const paragraphs = text.replace(/\r\n?/g, "\n").split(/\n[\t ]*\n/).map((paragraph) => {
    const content: Node[] = [];
    paragraph.split("\n").forEach((line, index) => {
      if (index) content.push(schema.nodes.hardBreak.create(null, null, marks));
      if (line) content.push(schema.text(line, marks));
    });
    return schema.nodes.paragraph.create(null, content);
  });
  return Slice.maxOpen(Fragment.from(paragraphs));
}
