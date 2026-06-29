import { clearSessionCookieOptions } from "@/lib/admin/session-core";
import { jsonOk } from "@/lib/api/cms-route";

export async function POST() {
  const response = jsonOk({ ok: true });
  response.cookies.set(clearSessionCookieOptions());
  return response;
}
