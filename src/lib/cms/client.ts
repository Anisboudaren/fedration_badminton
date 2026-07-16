import type { CollectionKey, CollectionMap } from "@/lib/admin/content-store";
import type { AboutPageContent, LicenceRequest, RankingsData, SiteSettings } from "@/lib/admin/types";
import type { ActivityItem } from "@/lib/db/repositories/licence-requests";

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    credentials: "same-origin",
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

export async function listItems<K extends CollectionKey>(collection: K): Promise<CollectionMap[K]> {
  return apiFetch<CollectionMap[K]>(`/api/cms/${collection}`);
}

export async function getItem<K extends CollectionKey>(
  collection: K,
  id: string,
): Promise<CollectionMap[K][number]> {
  return apiFetch<CollectionMap[K][number]>(`/api/cms/${collection}/${id}`);
}

export async function createItem<K extends CollectionKey>(
  collection: K,
  item: Omit<CollectionMap[K][number], "id"> & { id?: string },
): Promise<CollectionMap[K][number]> {
  return apiFetch<CollectionMap[K][number]>(`/api/cms/${collection}`, {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export async function updateItem<K extends CollectionKey>(
  collection: K,
  id: string,
  item: CollectionMap[K][number],
): Promise<CollectionMap[K][number]> {
  return apiFetch<CollectionMap[K][number]>(`/api/cms/${collection}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(item),
  });
}

export async function deleteItem(collection: CollectionKey, id: string): Promise<void> {
  await apiFetch<{ ok: boolean }>(`/api/cms/${collection}/${id}`, { method: "DELETE" });
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  return apiFetch<SiteSettings>("/api/cms/settings");
}

export async function saveSiteSettingsApi(settings: SiteSettings): Promise<SiteSettings> {
  return apiFetch<SiteSettings>("/api/cms/settings", { method: "PATCH", body: JSON.stringify(settings) });
}

export async function fetchAboutPage(): Promise<AboutPageContent> {
  return apiFetch<AboutPageContent>("/api/cms/about");
}

export async function saveAboutPageApi(data: AboutPageContent): Promise<AboutPageContent> {
  return apiFetch<AboutPageContent>("/api/cms/about", { method: "PATCH", body: JSON.stringify(data) });
}

export async function fetchRankings(): Promise<RankingsData> {
  return apiFetch<RankingsData>("/api/cms/rankings");
}

export async function saveRankingsApi(data: RankingsData): Promise<RankingsData> {
  return apiFetch<RankingsData>("/api/cms/rankings", { method: "PATCH", body: JSON.stringify(data) });
}

export async function fetchRecentActivity(limit = 8): Promise<ActivityItem[]> {
  return apiFetch<ActivityItem[]>(`/api/cms/activity?limit=${limit}`);
}

export async function fetchCollectionStats(): Promise<Record<string, number>> {
  return apiFetch<Record<string, number>>("/api/cms/stats");
}

export async function listLicenceRequestsApi(): Promise<LicenceRequest[]> {
  return apiFetch<LicenceRequest[]>("/api/licence-requests");
}

export async function submitLicenceRequest(
  request: Omit<LicenceRequest, "id" | "updatedAt">,
): Promise<LicenceRequest> {
  return apiFetch<LicenceRequest>("/api/licence-requests", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export async function updateLicenceRequestApi(
  id: string,
  patch: Partial<LicenceRequest>,
): Promise<LicenceRequest> {
  return apiFetch<LicenceRequest>(`/api/licence-requests/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function uploadImage(file: File, folder = "uploads"): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);

  const res = await fetch("/api/upload", { method: "POST", body: form, credentials: "same-origin" });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Upload failed");
  }
  const data = (await res.json()) as { url: string };
  return data.url;
}
