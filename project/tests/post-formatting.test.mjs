import assert from "node:assert/strict";
import { test } from "node:test";
import { readDocument, serializeDocument, HIGHLIGHT_COLORS } from "../lib/post-content.ts";
import { displayName } from "../lib/display-name.ts";
test("font size and highlight survive save while arbitrary styles are stripped", () => {
  const marks = [{ type: "textStyle", attrs: { fontSize: "24px", color: "red" } }, { type: "highlight", attrs: { color: "#bbf7d0" } }, { type: "bold" }];
  const doc = readDocument(serializeDocument({ type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Styled text", marks }] }] }));
  assert.deepEqual(doc.content[0].content[0].marks, [{ type: "textStyle", attrs: { fontSize: "24px" } }, marks[1], marks[2]]);
  const unsafe = readDocument(serializeDocument({ type: "doc", content: [{ type: "text", text: "Safe", marks: [{ type: "textStyle", attrs: { fontSize: "url(javascript:alert(1))" } }, { type: "highlight", attrs: { color: "red;position:fixed" } }] }] }));
  assert.deepEqual(unsafe.content[0].marks, []);

  // Verify all highlight colors are valid and preserved
  for (const color of HIGHLIGHT_COLORS) {
    const d = readDocument(serializeDocument({ type: "doc", content: [{ type: "text", text: "Test", marks: [{ type: "highlight", attrs: { color } }] }] }));
    assert.equal(d.content[0].marks[0].attrs.color, color);
  }
});
test("image width survives save while arbitrary sizes or scripts are stripped", () => {
  const doc = readDocument(serializeDocument({ type: "doc", content: [{ type: "image", attrs: { src: "https://example.com/photo.webp", width: "50%" } }, { type: "image", attrs: { src: "https://example.com/photo2.webp", width: "600px" } }, { type: "image", attrs: { src: "https://example.com/photo3.webp", width: "calc(100% - 20px);background:red" } }] }));
  assert.equal(doc.content[0].attrs.width, "50%");
  assert.equal(doc.content[1].attrs.width, "600px");
  assert.equal(doc.content[2].attrs.width, undefined);
});
test("legacy discriminator is removed only when it matches the account tag", () => {
  assert.equal(displayName("개발자#1234", "1234"), "개발자");
  assert.equal(displayName("개발자#5678", "1234"), "개발자#5678");
  assert.equal(displayName("C# 개발자", "1234"), "C# 개발자");
  assert.equal(displayName(null, "1234"), null);
});


