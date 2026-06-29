import {
  assertAdminAuth,
  assertWriteAllowed,
  jsonError,
  jsonOk,
  parseCollection,
  readJsonBody,
} from "@/lib/api/cms-route";
import {
  deleteCollectionItem,
  getCollectionItem,
  updateCollectionItem,
} from "@/lib/api/cms-service";
import { validateCollectionBody } from "@/lib/api/validate-collection";

type Params = { params: Promise<{ collection: string; id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    await assertAdminAuth();
    const { collection: raw, id } = await params;
  const collection = parseCollection(raw);
  if (!collection) return jsonError("Unknown collection", 404);

  const item = await getCollectionItem(collection, id);
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
    const { collection: raw, id } = await params;
    const collection = parseCollection(raw);
    if (!collection) return jsonError("Unknown collection", 404);

    const body = await readJsonBody<Record<string, unknown>>(request);
    const parsed = validateCollectionBody(collection, { ...body, id });
    if (!parsed.success) return jsonError(parsed.error.message);

    const item = await updateCollectionItem(collection, id, parsed.data);
    return jsonOk(item);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Update failed", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await assertWriteAllowed();
    const { collection: raw, id } = await params;
    const collection = parseCollection(raw);
    if (!collection) return jsonError("Unknown collection", 404);

    await deleteCollectionItem(collection, id);
    return jsonOk({ ok: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Delete failed", 500);
  }
}
