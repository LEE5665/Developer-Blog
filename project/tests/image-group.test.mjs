import assert from "node:assert/strict";
import { test } from "node:test";
import { imageGroupWidths, imageSources, readDocument, serializeDocument } from "../lib/post-content.ts";

const images = [1, 2, 3].map(i => ({ type: "image", attrs: { src: `https://example.com/${i}.png`, width: "50%" } }));
test("image groups preserve ratios, image references and original single-image widths", () => {
  const doc = readDocument(serializeDocument({ type: "doc", content: [{ type: "imageGroup", attrs: { widths: "20,30,50" }, content: images }] }));
  assert.equal(doc.content[0].attrs.widths, "20,30,50");
  assert.deepEqual(imageSources(doc), images.map(image => image.attrs.src));
  assert.equal(doc.content[0].content[0].attrs.width, "50%");
});
test("image groups reject malformed children and more than three photos", () => {
  for (const content of [[], images.slice(0, 1), [...images, images[0]], [images[0], { type: "paragraph" }]]) {
    assert.throws(() => serializeDocument({ type: "doc", content: [{ type: "imageGroup", content }] }));
  }
});
test("invalid or excessive ratios fall back to equal widths", () => {
  for (const value of [null, "NaN,50", "1,99", "50,60", "50,50;background:red"]) assert.deepEqual(imageGroupWidths(value, 2), [50, 50]);
  assert.deepEqual(imageGroupWidths("30,70", 2), [30, 70]);
});
