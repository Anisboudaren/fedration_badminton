import { assertAdminAuth, assertWriteAllowed, jsonError, jsonOk, readJsonBody } from "@/lib/api/cms-route";
import { getLicenceRequestById, updateLicenceRequest } from "@/lib/db/repositories/licence-requests";
import { z } from "zod";

const patchSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  adminNotes: z.string().optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    await assertAdminAuth();
    const { id } = await params;
  const item = await getLicenceRequestById(id);
  if (!item) return jsonError("Not found", 404);
  return jsonOk(item);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return jsonError(message, message === "Unauthorized" ? 401 : 500);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    await assertWriteAllowed();
    const { id } = await params;
    const body = await readJsonBody(request);
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) return jsonError(parsed.error.message);
    const item = await updateLicenceRequest(id, parsed.data);
    return jsonOk(item);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Update failed", 500);
  }
}
