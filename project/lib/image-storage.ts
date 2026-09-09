/* eslint-disable react-hooks/rules-of-hooks */
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { mkdir, readFile, writeFile, unlink, readdir } from "node:fs/promises";
import path from "node:path";

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const IMAGE_NAME_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$/;
const directory = () => path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "storage", "uploads"));
const useR2 = () => Boolean(process.env.R2_ENDPOINT && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET);
const r2 = () => new S3Client({ region: "auto", endpoint: process.env.R2_ENDPOINT, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID!, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY! } });
const bucket = () => process.env.R2_BUCKET!;
export class ImageUploadError extends Error {}

export async function saveImage(bytes: Uint8Array, ownerId: string) {
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new ImageUploadError("이미지는 10MB 이하로 선택해주세요.");
  let output: Buffer;
  try { const image = sharp(bytes, { limitInputPixels: 40_000_000, failOn: "warning" }); const metadata = await image.metadata(); if (!["jpeg", "png", "webp"].includes(metadata.format || "") || (metadata.pages || 1) > 1) throw new Error("Unsupported image"); output = await image.rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer(); } catch { throw new ImageUploadError("JPG, PNG, WebP 이미지만 선택해주세요."); }
  const name = randomUUID() + ".webp";
  if (useR2()) await r2().send(new PutObjectCommand({ Bucket: bucket(), Key: name, Body: output, ContentType: "image/webp", Metadata: { ownerid: ownerId } }));
  else { const root = directory(); await mkdir(root, { recursive: true }); await writeFile(path.join(root, name), output, { flag: "wx" }); try { await writeFile(path.join(root, name + ".json"), JSON.stringify({ ownerId, createdAt: new Date().toISOString() }), { flag: "wx" }); } catch (error) { await unlink(path.join(root, name)).catch(() => undefined); throw error; } }
  return { url: "/api/images/" + name };
}
export async function imageOwner(name: string): Promise<string | null> {
  if (!IMAGE_NAME_PATTERN.test(name)) return null;
  try { if (useR2()) { const result = await r2().send(new HeadObjectCommand({ Bucket: bucket(), Key: name })); return result.Metadata?.ownerid || null; } const metadata = JSON.parse(await readFile(path.join(directory(), name + ".json"), "utf8")); return typeof metadata.ownerId === "string" ? metadata.ownerId : null; } catch (error) { if ((error as { name?: string }).name === "NotFound" || (error as NodeJS.ErrnoException).code === "ENOENT") return null; throw error; }
}
export async function readImage(name: string) {
  if (!IMAGE_NAME_PATTERN.test(name)) throw new ImageUploadError("올바르지 않은 이미지 경로입니다.");
  if (useR2()) { const result = await r2().send(new GetObjectCommand({ Bucket: bucket(), Key: name })); return Buffer.from(await result.Body!.transformToByteArray()); }
  return readFile(path.join(directory(), name));
}
export async function storedImages() { if (useR2()) { const result = await r2().send(new ListObjectsV2Command({ Bucket: bucket() })); return (result.Contents || []).map((item) => item.Key || "").filter((name) => IMAGE_NAME_PATTERN.test(name)); } try { return (await readdir(directory())).filter((name) => IMAGE_NAME_PATTERN.test(name)); } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; } }
export async function removeImage(name: string) { if (!IMAGE_NAME_PATTERN.test(name)) throw new ImageUploadError("올바르지 않은 이미지 경로입니다."); if (useR2()) { await r2().send(new DeleteObjectCommand({ Bucket: bucket(), Key: name })); return; } for (const filename of [name, name + ".json"]) await unlink(path.join(directory(), filename)).catch((error: NodeJS.ErrnoException) => { if (error.code !== "ENOENT") throw error; }); }
