import assert from "node:assert/strict";
import { test } from "node:test";
import { documentOutline, normalizeDocument, readDocument, serializeDocument } from "../lib/post-content.ts";

const heading = (level, text) => ({ type: "heading", attrs: { level }, content: text ? [{ type: "text", text }] : [] });

test("outline IDs match document order, including duplicate and empty headings", () => {
  const doc = normalizeDocument({ type: "doc", attrs: { toc: "shown", tocDepth: 3 }, content: [heading(2, "같은 제목"), heading(3, "같은 제목"), heading(4, "세부 내용"), heading(2, ""), heading(2, "마지막 제목")] });
  assert.deepEqual(documentOutline(doc, "post-test").map(({ id, text, level }) => ({ id, text, level })), [
    { id: "post-test-section-1", text: "같은 제목", level: 2 },
    { id: "post-test-section-2", text: "같은 제목", level: 3 },
    { id: "post-test-section-5", text: "마지막 제목", level: 2 },
  ]);
});

test("outline visibility and depth survive saving; older documents use defaults", () => {
  const doc = readDocument(serializeDocument({ type: "doc", attrs: { toc: "hidden", tocDepth: 2, injected: "ignored" }, content: [heading(2, "Heading")] }));
  assert.deepEqual(doc.attrs, { toc: "hidden", tocDepth: 2 });
  assert.deepEqual(normalizeDocument({ type: "doc", content: [] }).attrs, { toc: "shown", tocDepth: 4 });
  assert.deepEqual(documentOutline(null), []);
});
