import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, readdir, unlink, rmdir } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";
import { saveImage, imageOwner, readImage, MAX_IMAGE_BYTES } from "../lib/image-storage.ts";
import { safeImage, serializeDocument, readDocument, imageSources, RICH_CONTENT_PREFIX } from "../lib/post-content.ts";

test("uploaded files are re-encoded, resized and stored outside the document", async () => {
  const folder = await mkdtemp(path.join(os.tmpdir(), "developer-blog-image-test-"));
  const previous = process.env.UPLOAD_DIR;
  process.env.UPLOAD_DIR = folder;
  try {
    const input = await sharp({ create: { width: 2000, height: 1000, channels: 3, background: "#336699" } }).png().toBuffer();
    const { url } = await saveImage(input, "test-owner");
    assert.ok(safeImage(url));
    const name = url.split("/").at(-1);
    assert.equal(await imageOwner(name), "test-owner");
    const metadata = await sharp(await readImage(name)).metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, 1600);
    assert.equal(metadata.height, 800);
    const content = serializeDocument({ type: "doc", content: [{ type: "image", attrs: { src: url, alt: "sample" } }] });
    assert.ok(content.length < 300);
    assert.ok(!content.includes("base64"));
    assert.deepEqual(imageSources(readDocument(content)), [url]);
    assert.equal(await imageOwner("../../secret"), null);
    await assert.rejects(readImage("../../secret"));
    await assert.rejects(saveImage(Buffer.from("not an image"), "test-owner"));
    await assert.rejects(saveImage(Buffer.alloc(MAX_IMAGE_BYTES + 1), "test-owner"));
    const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"></svg>');
    await assert.rejects(saveImage(svg, "test-owner"));
  } finally {
    // Only delete individual files in this test's freshly created directory.
    for (const name of await readdir(folder)) await unlink(path.join(folder, name));
    await rmdir(folder);
    if (previous === undefined) delete process.env.UPLOAD_DIR;
    else process.env.UPLOAD_DIR = previous;
  }
});

test("new documents reject embedded images and unsafe URLs; old documents remain readable", () => {
  const doc = { type: "doc", content: [{ type: "image", attrs: { src: "data:image/png;base64,aGVsbG8=" } }] };
  assert.equal(safeImage(doc.content[0].attrs.src), null);
  assert.throws(() => serializeDocument(doc));
  assert.ok(readDocument(RICH_CONTENT_PREFIX + JSON.stringify(doc)));
  for (const src of ["javascript:alert(1)", "//example.com/image.png", "/api/images/../../secret", "data:image/svg+xml;base64,abc"]) assert.equal(safeImage(src), null);
  assert.equal(safeImage("https://example.com/image.webp"), "https://example.com/image.webp");
});
