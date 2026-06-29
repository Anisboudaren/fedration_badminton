import { jsonError, jsonOk, readJsonBody } from "@/lib/api/cms-route";
import { licenceRequestSchema } from "@/lib/api/schemas";
import { createLicenceRequest, listLicenceRequests } from "@/lib/db/repositories/licence-requests";

export async function GET() {
  const items = await listLicenceRequests();
  return jsonOk(items);
}

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request);
    const parsed = licenceRequestSchema.safeParse(body);
    if (!parsed.success) return jsonError(parsed.error.message);

    const item = await createLicenceRequest({
      ...parsed.data,
      status: parsed.data.status ?? "pending",
      adminNotes: parsed.data.adminNotes ?? "",
      submittedAt: parsed.data.submittedAt ?? new Date().toISOString(),
    });
    return jsonOk(item, 201);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Submit failed", 500);
  }
}
