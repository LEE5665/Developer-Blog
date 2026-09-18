import assert from "node:assert/strict";
import { test } from "node:test";
import { Schema } from "@tiptap/pm/model";
import { EditorState } from "@tiptap/pm/state";
import { parseClipboardText } from "../app/write/clipboard-text.ts";

const schema = new Schema({
  nodes: {
    doc: { content: "paragraph+" },
    paragraph: { content: "inline*" },
    text: { group: "inline" },
    hardBreak: { inline: true, group: "inline" },
  },
  marks: { strong: {} },
});
const paragraph = (text) => schema.nodes.paragraph.create(null, text ? schema.text(text) : null);
const doc = schema.nodes.doc.create(null, paragraph("AB"));

test("plain text keeps line breaks and uses blank lines as paragraph boundaries", () => {
  const slice = parseClipboardText("one\r\ntwo\r\n \t\r\nthree", doc.resolve(2));
  assert.deepEqual(slice.content.toJSON(), [
    { type: "paragraph", content: [{ type: "text", text: "one" }, { type: "hardBreak" }, { type: "text", text: "two" }] },
    { type: "paragraph", content: [{ type: "text", text: "three" }] },
  ]);
});

test("pasting in the middle of a paragraph joins surrounding text", () => {
  const state = EditorState.create({ doc });
  const result = state.tr.replaceRange(2, 2, parseClipboardText("x\ny\n\nz", doc.resolve(2))).doc;
  assert.equal(result.childCount, 2);
  assert.equal(result.child(0).textContent, "Axy");
  assert.equal(result.child(0).child(1).type.name, "hardBreak");
  assert.equal(result.child(1).textContent, "zB");
});

test("plain text remains literal and retains the insertion point's marks", () => {
  const markedDoc = schema.nodes.doc.create(null, schema.nodes.paragraph.create(null, schema.text("AB", [schema.marks.strong.create()])));
  const slice = parseClipboardText("<b>text</b>\nnext", markedDoc.resolve(2));
  assert.equal(slice.content.firstChild.firstChild.text, "<b>text</b>");
  assert.equal(slice.content.firstChild.lastChild.marks[0].type.name, "strong");
});
