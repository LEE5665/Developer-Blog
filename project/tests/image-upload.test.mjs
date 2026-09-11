import assert from "node:assert/strict";
import { test } from "node:test";
import { Schema } from "@tiptap/pm/model";
import { EditorState } from "@tiptap/pm/state";
import { ImageUpload, uploadKey } from "../app/write/ImageUpload.ts";

test("upload placeholders follow edits, stay out of saved content and can be removed", () => {
  const schema = new Schema({ nodes: { doc: { content: "paragraph+" }, paragraph: { content: "text*" }, text: {} } });
  const doc = schema.node("doc", null, [schema.node("paragraph", null, [schema.text("before after")])]);
  const plugins = ImageUpload.config.addProseMirrorPlugins.call(ImageUpload);
  let state = EditorState.create({ schema, doc, plugins });
  state = state.apply(state.tr.setMeta(uploadKey, { add: true, id: "upload", pos: 8 }));
  assert.deepEqual(state.doc.toJSON(), doc.toJSON());
  state = state.apply(state.tr.insertText("new ", 1));
  assert.equal(uploadKey.getState(state).find()[0].from, 12);
  state = state.apply(state.tr.setMeta(uploadKey, { remove: true, id: "upload" }));
  assert.equal(uploadKey.getState(state).find().length, 0);
  assert.equal(state.doc.textContent, "new before after");
});
