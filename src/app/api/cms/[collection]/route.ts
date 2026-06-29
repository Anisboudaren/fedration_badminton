import {
  assertAdminAuth,
  assertWriteAllowed,
  jsonError,
  jsonOk,
  parseCollection,
  readJsonBody,
} from "@/lib/api/cms-route";
import {
  createCollectionItem,
  listCollection,
} from "@/lib/api/cms-service";
import { validateCollectionBody } from "@/lib/api/validate-collection";

type Params = { params: Promise<{ collection: string }> };

export async function GET(request: Request, { params }: Params) {
  try {
    await assertAdminAuth();
    const { collection: raw } = await params;
  const collection = parseCollection(raw);
  if (!collection) return jsonError("Unknown collection", 404);

  const publishedOnly = new URL(request.url).searchParams.get("published") === "true";
  const items = await listCollection(collection, publishedOnly);
  return jsonOk(items);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return jsonError(message, message === "Unauthorized" ? 401 : 500);
  }
}

export async function POST(request: Request, { params }: Params) {
  try {
    await assertWriteAllowed();
    const { collection: raw } = await params;
    const collection = parseCollection(raw);
    if (!collection) return jsonError("Unknown collection", 404);

    const body = await readJsonBody(request);
    const parsed = validateCollectionBody(collection, body);
    if (!parsed.success) return jsonError(parsed.error.message);

    const item = await createCollectionItem(collection, parsed.data);
    return jsonOk(item, 201);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Create failed", 500);
  }
}
