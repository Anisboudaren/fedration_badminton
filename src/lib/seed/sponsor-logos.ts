import { readFile } from "node:fs/promises";
import path from "node:path";
import { readBlobToken, uploadBuffer } from "@/lib/storage/blob";

const SPONSORS_DIR = path.join(process.cwd(), "public", "sponsors");

function contentTypeForFilename(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "application/octet-stream";
}

/** Upload a sponsor logo from `public/sponsors/` to blob, or fall back to local public URL. */
export async function resolveSponsorLogoUrl(sponsorId: string, filename: string): Promise<string> {
  const localUrl = `/sponsors/${filename.split("/").map(encodeURIComponent).join("/")}`;

  if (!readBlobToken()) {
    console.warn(`[seed] No BLOB_READ_WRITE_TOKEN — sponsor ${sponsorId} uses ${localUrl}`);
    return localUrl;
  }

  const filePath = path.join(SPONSORS_DIR, filename);
  const buffer = await readFile(filePath);
  const pathname = `sponsors/seed/${sponsorId}${path.extname(filename)}`;
  const { url } = await uploadBuffer(buffer, pathname, contentTypeForFilename(filename));
  console.log(`[seed] Uploaded sponsor logo ${sponsorId} → ${url}`);
  return url;
}
