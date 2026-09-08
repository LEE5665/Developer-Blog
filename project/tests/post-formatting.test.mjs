import assert from "node:assert/strict";
import { test } from "node:test";
import { readDocument, serializeDocument } from "../lib/post-content.ts";
import { displayName } from "../lib/display-name.ts";
test("font size and highlight survive save while arbitrary styles are stripped", () => {
  const marks = [{ type: "textStyle", attrs: { fontSize: "24px", color: "red" } }, { type: "highlight", attrs: { color: "#bbf7d0" } }, { type: "bold" }];
  const doc = readDocument(serializeDocument({ type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Styled text", marks }] }] }));
  assert.deepEqual(doc.content[0].content[0].marks, [{ type: "textStyle", attrs: { fontSize: "24px" } }, marks[1], marks[2]]);
  const unsafe = readDocument(serializeDocument({ type: "doc", content: [{ type: "text", text: "Safe", marks: [{ type: "textStyle", attrs: { fontSize: "url(javascript:alert(1))" } }, { type: "highlight", attrs: { color: "red;position:fixed" } }] }] }));
  assert.deepEqual(unsafe.content[0].marks, []);
});
test("legacy discriminator is removed only when it matches the account tag", () => {
  assert.equal(displayName("개발자#1234", "1234"), "개발자");
  assert.equal(displayName("개발자#5678", "1234"), "개발자#5678");
  assert.equal(displayName("C# 개발자", "1234"), "C# 개발자");
  assert.equal(displayName(null, "1234"), null);
});
