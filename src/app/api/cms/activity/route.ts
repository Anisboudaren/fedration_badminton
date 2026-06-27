import { jsonOk } from "@/lib/api/cms-route";
import { getRecentActivity, getCollectionStats } from "@/lib/db/repositories/licence-requests";

export async function GET(request: Request) {
  const limit = Number(new URL(request.url).searchParams.get("limit") ?? "8");
  const activity = await getRecentActivity(limit);
  return jsonOk(activity);
}
