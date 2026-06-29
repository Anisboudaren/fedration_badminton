import { assertAdminAuth, assertWriteAllowed, jsonError, jsonOk, readJsonBody } from "@/lib/api/cms-route";
import { getSiteSettings, saveSiteSettings } from "@/lib/db/repositories/settings";
import { siteSettingsSchema } from "@/lib/api/schemas";

export async function GET() {
  try {
    await assertAdminAuth();
    const settings = await getSiteSettings();
    return jsonOk(settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return jsonError(message, message === "Unauthorized" ? 401 : 500);
  }
}

export async function PATCH(request: Request) {
  try {
    await assertWriteAllowed();
    const body = await readJsonBody(request);
    const parsed = siteSettingsSchema.safeParse(body);
    if (!parsed.success) return jsonError(parsed.error.message);
    const settings = await saveSiteSettings(parsed.data);
    return jsonOk(settings);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Update failed", 500);
  }
}
