import { cookies } from "next/headers";
import {
  clearSessionCookieOptions,
  parseSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
} from "@/lib/admin/session-core";

export {
  clearSessionCookieOptions,
  createSessionToken,
  parseSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
  type SessionPayload,
} from "@/lib/admin/session-core";

export async function getSessionFromCookies() {
  const cookieStore = await cookies();
  return parseSessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}
