import { NextResponse } from "next/server";
import type { ApiCollection } from "@/lib/api/schemas";
import { isApiCollection } from "@/lib/api/schemas";

// Auth deferred — writes are open until auth phase. Set CMS_OPEN_WRITES=false later to lock down.
export function assertWriteAllowed() {
  if (process.env.CMS_OPEN_WRITES === "false") {
    throw new Error("CMS writes are disabled");
  }
}

export function parseCollection(value: string): ApiCollection | null {
  return isApiCollection(value) ? value : null;
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export async function readJsonBody<T>(request: Request): Promise<T> {
  return (await request.json()) as T;
}
