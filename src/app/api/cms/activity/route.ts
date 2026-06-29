import { assertAdminAuth, jsonError, jsonOk } from "@/lib/api/cms-route";
import { getRecentActivity } from "@/lib/db/repositories/licence-requests";

export async function GET(request: Request) {
  try {
    await assertAdminAuth();
    const limit = Number(new URL(request.url).searchParams.get("limit") ?? "8");
    const activity = await getRecentActivity(limit);
    return jsonOk(activity);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return jsonError(message, message === "Unauthorized" ? 401 : 500);
  }
}
