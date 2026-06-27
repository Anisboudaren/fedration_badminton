import prisma from "@/lib/prisma";
import type { LicenceRequest } from "@/lib/admin/types";
import { mapLicenceRequest } from "@/lib/db/mappers";

export async function listLicenceRequests(): Promise<LicenceRequest[]> {
  const rows = await prisma.licenceRequest.findMany({ orderBy: { submittedAt: "desc" } });
  return rows.map(mapLicenceRequest);
}

export async function getLicenceRequestById(id: string): Promise<LicenceRequest | null> {
  const row = await prisma.licenceRequest.findUnique({ where: { id } });
  return row ? mapLicenceRequest(row) : null;
}

export async function createLicenceRequest(
  item: Omit<LicenceRequest, "id" | "updatedAt"> & { id?: string },
): Promise<LicenceRequest> {
  const row = await prisma.licenceRequest.create({
    data: {
      licenceType: item.licenceType,
      fullName: item.fullName,
      birthDate: item.birthDate,
      gender: item.gender,
      wilaya: item.wilaya,
      club: item.club,
      category: item.category,
      phone: item.phone,
      email: item.email,
      documents: item.documents as object,
      status: item.status,
      adminNotes: item.adminNotes,
      submittedAt: item.submittedAt ? new Date(item.submittedAt) : undefined,
    },
  });
  return mapLicenceRequest(row);
}

export async function updateLicenceRequest(id: string, patch: Partial<LicenceRequest>): Promise<LicenceRequest> {
  const row = await prisma.licenceRequest.update({
    where: { id },
    data: {
      ...(patch.status !== undefined ? { status: patch.status } : {}),
      ...(patch.adminNotes !== undefined ? { adminNotes: patch.adminNotes } : {}),
      ...(patch.documents !== undefined ? { documents: patch.documents as object } : {}),
    },
  });
  return mapLicenceRequest(row);
}

export async function countPendingLicenceRequests(): Promise<number> {
  return prisma.licenceRequest.count({ where: { status: "pending" } });
}

export type ActivityItem = {
  id: string;
  collection: string;
  title: string;
  updatedAt: string;
};

export async function getRecentActivity(limit = 8): Promise<ActivityItem[]> {
  const items: ActivityItem[] = [];

  const [articles, events, teams, media, players, officials, matches, sponsors, clubs, requests] =
    await Promise.all([
      prisma.article.findMany({ select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: limit }),
      prisma.event.findMany({ select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: limit }),
      prisma.teamProfile.findMany({ select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: limit }),
      prisma.mediaItem.findMany({ select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: limit }),
      prisma.player.findMany({ select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: limit }),
      prisma.official.findMany({ select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: limit }),
      prisma.matchResult.findMany({ select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: limit }),
      prisma.sponsor.findMany({ select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: limit }),
      prisma.club.findMany({ select: { id: true, title: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: limit }),
      prisma.licenceRequest.findMany({ select: { id: true, fullName: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: limit }),
    ]);

  const push = (collection: string, rows: Array<{ id: string; title?: unknown; fullName?: string; updatedAt: Date }>) => {
    for (const r of rows) {
      const titleObj = r.title && typeof r.title === "object" ? (r.title as Record<string, string>) : null;
      const title = r.fullName ?? titleObj?.en ?? titleObj?.fr ?? titleObj?.ar ?? r.id;
      items.push({ id: r.id, collection, title, updatedAt: r.updatedAt.toISOString() });
    }
  };

  push("articles", articles);
  push("events", events);
  push("teams", teams);
  push("media", media);
  push("players", players);
  push("officials", officials);
  push("matches", matches);
  push("sponsors", sponsors);
  push("clubs", clubs);
  push("requests", requests);

  return items.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)).slice(0, limit);
}

export async function getCollectionStats(): Promise<Record<string, number>> {
  const [articles, events, teams, media, players, officials, matches, sponsors, clubs, requests] =
    await Promise.all([
      prisma.article.count(),
      prisma.event.count(),
      prisma.teamProfile.count(),
      prisma.mediaItem.count(),
      prisma.player.count(),
      prisma.official.count(),
      prisma.matchResult.count(),
      prisma.sponsor.count(),
      prisma.club.count(),
      prisma.licenceRequest.count({ where: { status: "pending" } }),
    ]);

  return {
    articles,
    events,
    teams,
    media,
    players,
    officials,
    matches,
    sponsors,
    clubs,
    requests,
  };
}
