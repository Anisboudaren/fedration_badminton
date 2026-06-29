import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "abf_admin_session";
const SESSION_MAX_AGE_SEC = 7 * 24 * 60 * 60;

export type SessionPayload = {
  userId: string;
  email: string;
  exp: number;
};

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return "";
  return secret;
}

function sign(value: string): string {
  const secret = getSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function createSessionToken(payload: Pick<SessionPayload, "userId" | "email">): string {
  const exp = Date.now() + SESSION_MAX_AGE_SEC * 1000;
  const body = Buffer.from(JSON.stringify({ ...payload, exp } satisfies SessionPayload)).toString(
    "base64url",
  );
  return `${body}.${sign(body)}`;
}

export function parseSessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token || !getSecret()) return null;

  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;

  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(body);
  if (!expected) return null;

  try {
    if (expected.length !== sig.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.userId || !payload.email || !payload.exp) return null;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function sessionCookieOptions(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}
