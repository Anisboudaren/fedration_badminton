import { put } from "@vercel/blob";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

export function readBlobToken(): string | undefined {
  const raw = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!raw) return undefined;
  return raw.replace(/^["']|["']$/g, "");
}

export function blobAccess(): "private" | "public" {
  const mode = process.env.BLOB_ACCESS?.trim().toLowerCase();
  return mode === "public" ? "public" : "private";
}

/** App route that streams blobs (not the *.blob.vercel-storage.com URL). */
export function getBlobServeBase(): string {
  const raw = (process.env.BLOB_SERVE_URL ?? process.env.BLOB_BASE_URL ?? "/api/blob").trim();
  const cleaned = raw.replace(/^["']|["']$/g, "").replace(/\/$/, "");

  // Private store host URLs are not browser-accessible; always proxy through our API.
  if (cleaned.includes("blob.vercel-storage.com")) {
    return "/api/blob";
  }

  return cleaned || "/api/blob";
}

export function toBlobServeUrl(pathname: string): string {
  const base = getBlobServeBase();
  const query = `pathname=${encodeURIComponent(pathname)}`;
  if (base.includes("?")) {
    return `${base}&${query}`;
  }
  return `${base}?${query}`;
}

export function extractBlobPathname(value: string): string | null {
  if (!value?.trim()) return null;

  const trimmed = value.trim();

  try {
    if (trimmed.startsWith("/api/blob") || trimmed.includes("pathname=")) {
      const url = trimmed.startsWith("http") ? new URL(trimmed) : new URL(trimmed, "http://localhost");
      const pathname = url.searchParams.get("pathname");
      if (pathname) return pathname;
    }

    if (trimmed.includes("://")) {
      const url = new URL(trimmed);
      if (url.hostname.includes("blob.vercel-storage.com")) {
        return url.pathname.replace(/^\//, "");
      }
      return null;
    }
  } catch {
    return null;
  }

  // Bare pathname stored in DB (e.g. articles/foo.jpg)
  if (!trimmed.startsWith("/") && !trimmed.includes("..")) {
    return trimmed;
  }

  return null;
}

export function sanitizeBlobPathname(pathname: string): string | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  if (!decoded || decoded.includes("..") || decoded.startsWith("/")) {
    return null;
  }
  return decoded;
}

export function validateUploadFile(file: File): string | null {
  if (file.size > MAX_BYTES) return "File exceeds 5MB limit";
  if (!ALLOWED_TYPES.has(file.type)) return "File type not allowed";
  return null;
}

export type BlobUploadResult = {
  pathname: string;
  url: string;
};

export async function uploadFile(file: File, folder: string): Promise<BlobUploadResult> {
  const error = validateUploadFile(file);
  if (error) throw new Error(error);

  const ext = file.name.split(".").pop() ?? "bin";
  const pathname = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  return uploadBuffer(await file.arrayBuffer(), pathname, file.type || "application/octet-stream");
}

export async function uploadBuffer(
  data: ArrayBuffer | Buffer,
  pathname: string,
  contentType: string,
): Promise<BlobUploadResult> {
  const token = readBlobToken();
  if (!token) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not configured. Add it to .env (save the file), then restart the dev server.",
    );
  }

  const access = blobAccess();
  const body = data instanceof Buffer ? data : Buffer.from(new Uint8Array(data));

  const blob = await put(pathname, body, {
    access,
    token,
    contentType,
    allowOverwrite: true,
  });

  const storedPath = blob.pathname ?? pathname;
  const url = access === "private" ? toBlobServeUrl(storedPath) : blob.url;

  return { pathname: storedPath, url };
}
