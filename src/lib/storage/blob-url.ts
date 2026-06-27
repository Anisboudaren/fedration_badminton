import type { AssetImport } from "@/lib/utils";
import { assetUrl } from "@/lib/utils";

/** Client-safe: turn private blob URLs or pathnames into the app proxy URL. */
export function resolveBlobDisplayUrl(url: string): string {
  if (!url) return url;

  if (url.includes("/api/blob") && url.includes("pathname=")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("blob.vercel-storage.com")) {
      const pathname = parsed.pathname.replace(/^\//, "");
      return `/api/blob?pathname=${encodeURIComponent(pathname)}`;
    }
  } catch {
    if (!url.includes("://") && !url.startsWith("/") && !url.includes("..")) {
      return `/api/blob?pathname=${encodeURIComponent(url)}`;
    }
  }

  return url;
}

/** CMS / blob URL string, or bundled asset import, with optional fallback image. */
export function cmsImageUrl(src: string | AssetImport | undefined, fallback?: AssetImport): string {
  if (typeof src === "string" && src.trim()) {
    return resolveBlobDisplayUrl(src);
  }
  if (src && typeof src !== "string") {
    return assetUrl(src);
  }
  return fallback ? assetUrl(fallback) : "";
}
