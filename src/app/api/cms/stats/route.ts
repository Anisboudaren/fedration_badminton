import { assertAdminAuth, jsonError, jsonOk } from "@/lib/api/cms-route";
import { getCollectionStats } from "@/lib/db/repositories/licence-requests";

export async function GET() {
  try {
    await assertAdminAuth();
    const stats = await getCollectionStats();
    return jsonOk(stats);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return jsonError(message, message === "Unauthorized" ? 401 : 500);
  }
}
