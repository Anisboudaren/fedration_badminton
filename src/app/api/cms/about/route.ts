import { assertAdminAuth, assertWriteAllowed, jsonError, jsonOk, readJsonBody } from "@/lib/api/cms-route";
import { aboutPageContentSchema } from "@/lib/api/schemas";
import { getAboutPageContent, saveAboutPageContent } from "@/lib/db/repositories/about";

export async function GET() {
  try {
    await assertAdminAuth();
    const data = await getAboutPageContent();
    return jsonOk(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return jsonError(message, message === "Unauthorized" ? 401 : 500);
  }
}

export async function PATCH(request: Request) {
  try {
    await assertWriteAllowed();
    const body = await readJsonBody(request);
    const parsed = aboutPageContentSchema.safeParse(body);
    if (!parsed.success) return jsonError(parsed.error.message);
    const data = await saveAboutPageContent(parsed.data);
    return jsonOk(data);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Update failed", 500);
  }
}
