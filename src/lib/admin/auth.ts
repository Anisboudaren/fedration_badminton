export type LoginErrorCode =
  | "email_required"
  | "password_required"
  | "invalid_credentials"
  | "server_error"
  | "unknown";

export type AdminSession = {
  email: string;
  name: string;
};

const AUTH_FETCH: RequestInit = {
  credentials: "same-origin",
  cache: "no-store",
};

/** Remove legacy client-only auth from older builds. */
function clearLegacyAuth() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("abf-admin-auth");
}

export async function fetchSession(): Promise<AdminSession | null> {
  const res = await fetch("/api/admin/session", AUTH_FETCH);
  if (!res.ok) return null;
  return res.json() as Promise<AdminSession>;
}

export async function login(
  email: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: LoginErrorCode }> {
  clearLegacyAuth();

  if (!email.trim()) return { ok: false, error: "email_required" };
  if (!password.trim()) return { ok: false, error: "password_required" };

  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      ...AUTH_FETCH,
      body: JSON.stringify({ email, password }),
    });

    const body = (await res.json().catch(() => null)) as
      | { error?: LoginErrorCode; email?: string }
      | null;

    if (!res.ok) {
      return { ok: false, error: body?.error ?? "invalid_credentials" };
    }

    if (!body?.email) {
      return { ok: false, error: "unknown" };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "server_error" };
  }
}

export async function logout(): Promise<void> {
  clearLegacyAuth();
  await fetch("/api/admin/logout", { method: "POST", ...AUTH_FETCH });
}
