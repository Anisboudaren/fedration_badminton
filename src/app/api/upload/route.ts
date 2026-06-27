import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/storage/blob";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    const folder = (form.get("folder") as string) || "uploads";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const { url, pathname } = await uploadFile(file, folder);
    return NextResponse.json({ url, pathname });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
