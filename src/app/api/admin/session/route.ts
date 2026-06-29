import { getSessionFromCookies } from "@/lib/admin/session";
import { jsonError, jsonOk } from "@/lib/api/cms-route";
import { findAdminById } from "@/lib/db/repositories/admin-users";

export async function GET() {
  const session = await getSessionFromCookies();
  if (!session) return jsonError("Unauthorized", 401);

  const user = await findAdminById(session.userId);
  if (!user?.active) return jsonError("Unauthorized", 401);

  return jsonOk({ email: user.email, name: user.name });
}
