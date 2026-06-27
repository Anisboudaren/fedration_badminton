import { jsonOk } from "@/lib/api/cms-route";
import { getCollectionStats } from "@/lib/db/repositories/licence-requests";

export async function GET() {
  const stats = await getCollectionStats();
  return jsonOk(stats);
}
