import { type NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { blobAccess, readBlobToken, sanitizeBlobPathname } from "@/lib/storage/blob";

export async function GET(request: NextRequest) {
  const rawPathname = request.nextUrl.searchParams.get("pathname");
  if (!rawPathname) {
    return NextResponse.json({ error: "Missing pathname" }, { status: 400 });
  }

  const pathname = sanitizeBlobPathname(rawPathname);
  if (!pathname) {
    return NextResponse.json({ error: "Invalid pathname" }, { status: 400 });
  }

  // Auth deferred — licence docs and CMS media are open for now (same as CMS writes).
  const token = readBlobToken();
  const access = blobAccess();

  const result = await get(pathname, {
    access,
    token,
    ifNoneMatch: request.headers.get("if-none-match") ?? undefined,
  });

  if (!result) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (result.statusCode === 304) {
    return new NextResponse(null, {
      status: 304,
      headers: {
        ETag: result.blob.etag,
        "Cache-Control": pathname.startsWith("licence-requests/")
          ? "private, no-store"
          : "private, no-cache",
      },
    });
  }

  if (result.statusCode !== 200 || !result.stream) {
    return new NextResponse("Not found", { status: 404 });
  }

  const cacheControl = pathname.startsWith("licence-requests/")
    ? "private, no-store"
    : "public, max-age=86400, stale-while-revalidate=604800";

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "X-Content-Type-Options": "nosniff",
      ETag: result.blob.etag,
      "Cache-Control": cacheControl,
    },
  });
}
