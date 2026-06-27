import { assertWriteAllowed, jsonError, jsonOk, readJsonBody } from "@/lib/api/cms-route";
import { getSiteSettings, saveSiteSettings } from "@/lib/db/repositories/settings";
import { siteSettingsSchema } from "@/lib/api/schemas";

export async function GET() {
  const settings = await getSiteSettings();
  return jsonOk(settings);
}

export async function PATCH(request: Request) {
  try {
    assertWriteAllowed();
    const body = await readJsonBody(request);
    const parsed = siteSettingsSchema.safeParse(body);
    if (!parsed.success) return jsonError(parsed.error.message);
    const settings = await saveSiteSettings(parsed.data);
    return jsonOk(settings);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Update failed", 500);
  }
}
