const AUTH_KEY = "abf-admin-auth";

type AuthPayload = {
  authenticated: boolean;
  email: string;
};

const safeRead = (): AuthPayload | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthPayload;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const data = safeRead();
  return Boolean(data?.authenticated);
};

export const getAuthUserEmail = (): string => {
  const data = safeRead();
  return data?.email ?? "";
};

export const login = (email: string, password: string): { ok: boolean; error?: string } => {
  if (!email.trim()) return { ok: false, error: "email_required" };
  if (!password.trim()) return { ok: false, error: "password_required" };
  if (typeof window === "undefined") return { ok: false, error: "client_only" };

  const payload: AuthPayload = {
    authenticated: true,
    email: email.trim().toLowerCase(),
  };
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
  return { ok: true };
};

export const logout = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_KEY);
};
