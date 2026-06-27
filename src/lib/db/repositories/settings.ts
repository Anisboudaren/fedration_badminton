import prisma from "@/lib/prisma";
import type { RankingsData, SiteSettings } from "@/lib/admin/types";
import { defaultSiteSettings } from "@/lib/admin/content-store";
import { fromLocalizedText, mapRankingsData, mapSiteSettings } from "@/lib/db/mappers";
import { seedRankings } from "@/lib/admin/seed-data";

export async function getSiteSettings(): Promise<SiteSettings> {
  const row = await prisma.siteSettings.findUnique({ where: { id: "default" } });
  if (!row) return defaultSiteSettings();
  return mapSiteSettings(row);
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const row = await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      heroTitle: fromLocalizedText(settings.heroTitle),
      heroTagline: fromLocalizedText(settings.heroTagline),
      defaultLang: settings.defaultLang,
      maintenanceMode: settings.maintenanceMode,
      maintenanceMessage: fromLocalizedText(settings.maintenanceMessage),
    },
    update: {
      heroTitle: fromLocalizedText(settings.heroTitle),
      heroTagline: fromLocalizedText(settings.heroTagline),
      defaultLang: settings.defaultLang,
      maintenanceMode: settings.maintenanceMode,
      maintenanceMessage: fromLocalizedText(settings.maintenanceMessage),
    },
  });
  return mapSiteSettings(row);
}

export async function getRankings(): Promise<RankingsData> {
  const row = await prisma.rankingsSnapshot.findUnique({ where: { id: "default" } });
  if (!row) return seedRankings();
  return mapRankingsData(row.data);
}

export async function saveRankings(data: RankingsData): Promise<RankingsData> {
  const row = await prisma.rankingsSnapshot.upsert({
    where: { id: "default" },
    create: { id: "default", data: data as object },
    update: { data: data as object },
  });
  return mapRankingsData(row.data);
}
