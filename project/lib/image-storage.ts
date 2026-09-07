import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile, unlink, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const IMAGE_NAME_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$/;
// Runtime uploads live on a persistent volume, not inside the application bundle.
const directory = () => path.resolve(/* turbopackIgnore: true */ process.env.UPLOAD_DIR || path.join(process.cwd(), "storage", "uploads"));

export class ImageUploadError extends Error {}

export async function saveImage(bytes: Uint8Array, ownerId: string) {
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new ImageUploadError("10MB 이하의 이미지를 선택해주세요.");
  let output: Buffer;
  try {
    const image = sharp(bytes, { limitInputPixels: 40_000_000, failOn: "warning" });
    const metadata = await image.metadata();
    if (!["jpeg", "png", "webp"].includes(metadata.format || "") || (metadata.pages || 1) > 1) throw new Error("Unsupported image");
    output = await image.rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
  } catch { throw new ImageUploadError("올바른 JPG, PNG, WebP 정지 이미지를 선택해주세요."); }
  const name = `${randomUUID()}.webp`;
  const root = directory();
  await mkdir(root, { recursive: true });
  await writeFile(path.join(root, name), output, { flag: "wx" });
  try {
    await writeFile(path.join(root, `${name}.json`), JSON.stringify({ ownerId, createdAt: new Date().toISOString() }), { flag: "wx" });
  } catch (error) {
    await unlink(path.join(root, name)).catch(() => undefined);
    throw error;
  }
  return { url: `/api/images/${name}` };
}

export async function imageOwner(name: string): Promise<string | null> {
  if (!IMAGE_NAME_PATTERN.test(name)) return null;
  try {
    const metadata = JSON.parse(await readFile(/* turbopackIgnore: true */ path.join(/* turbopackIgnore: true */ directory(), `${name}.json`), "utf8"));
    return typeof metadata.ownerId === "string" ? metadata.ownerId : null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function readImage(name: string) {
  if (!IMAGE_NAME_PATTERN.test(name)) throw new ImageUploadError("올바르지 않은 이미지 경로입니다.");
  return readFile(/* turbopackIgnore: true */ path.join(/* turbopackIgnore: true */ directory(), name));
}

export async function storedImages() {
  try {
    const names = await readdir(/* turbopackIgnore: true */ directory());
    return names.filter((name) => IMAGE_NAME_PATTERN.test(name));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function removeImage(name: string) {
  if (!IMAGE_NAME_PATTERN.test(name)) throw new ImageUploadError("올바르지 않은 이미지 경로입니다.");
  // The filename is a validated UUID, and each exact path remains in the upload directory.
  for (const filename of [name, `${name}.json`]) {
    await unlink(path.join(directory(), filename)).catch((error: NodeJS.ErrnoException) => { if (error.code !== "ENOENT") throw error; });
  }
}
