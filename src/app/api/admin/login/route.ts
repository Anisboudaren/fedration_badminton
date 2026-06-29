import { verifyPassword } from "@/lib/admin/password";
import { createSessionToken, sessionCookieOptions } from "@/lib/admin/session-core";
import { jsonError, jsonOk, readJsonBody } from "@/lib/api/cms-route";
import { findAdminByEmail } from "@/lib/db/repositories/admin-users";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = await readJsonBody<LoginBody>(request);
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email) return jsonError("email_required", 400);
    if (!password) return jsonError("password_required", 400);

    const user = await findAdminByEmail(email);
    if (!user?.active) return jsonError("invalid_credentials", 401);

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return jsonError("invalid_credentials", 401);

    const token = createSessionToken({ userId: user.id, email: user.email });
    const response = jsonOk({ email: user.email, name: user.name });
    const cookie = sessionCookieOptions(token);
    response.cookies.set(cookie);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return jsonError(message, 500);
  }
}
