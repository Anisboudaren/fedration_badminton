import { assertWriteAllowed, jsonError, jsonOk, readJsonBody } from "@/lib/api/cms-route";
import { getRankings, saveRankings } from "@/lib/db/repositories/settings";
import { z } from "zod";

const rankingsSchema = z.object({
  title: z.object({ fr: z.string(), ar: z.string() }),
  categories: z.array(z.unknown()),
});

export async function GET() {
  const data = await getRankings();
  return jsonOk(data);
}

export async function PATCH(request: Request) {
  try {
    assertWriteAllowed();
    const body = await readJsonBody(request);
    const parsed = rankingsSchema.safeParse(body);
    if (!parsed.success) return jsonError(parsed.error.message);
    const data = await saveRankings(parsed.data as Parameters<typeof saveRankings>[0]);
    return jsonOk(data);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Update failed", 500);
  }
}
