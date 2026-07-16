import prisma from "@/lib/prisma";
import type { RankingsData, SiteSettings } from "@/lib/admin/types";
import { defaultSiteSettings } from "@/lib/admin/content-store";
import { fromLocalizedText, mapRankingsData, mapSiteSettings } from "@/lib/db/mappers";
import { contactInfoToJson } from "@/lib/data/contact-info";
import { seedRankings } from "@/lib/admin/seed-data";
import { sortRankingsData } from "@/lib/data/rankings";

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
      topBarText: fromLocalizedText(settings.topBarText),
      footerAbout: fromLocalizedText(settings.footerAbout),
      footerOrgName: fromLocalizedText(settings.footerOrgName),
      footerRights: fromLocalizedText(settings.footerRights),
      contactInfo: contactInfoToJson(settings.contact),
    },
    update: {
      heroTitle: fromLocalizedText(settings.heroTitle),
      heroTagline: fromLocalizedText(settings.heroTagline),
      defaultLang: settings.defaultLang,
      maintenanceMode: settings.maintenanceMode,
      maintenanceMessage: fromLocalizedText(settings.maintenanceMessage),
      topBarText: fromLocalizedText(settings.topBarText),
      footerAbout: fromLocalizedText(settings.footerAbout),
      footerOrgName: fromLocalizedText(settings.footerOrgName),
      footerRights: fromLocalizedText(settings.footerRights),
      contactInfo: contactInfoToJson(settings.contact),
    },
  });
  return mapSiteSettings(row);
}

export async function getRankings(): Promise<RankingsData> {
  const row = await prisma.rankingsSnapshot.findUnique({ where: { id: "default" } });
  if (!row) return sortRankingsData(seedRankings());
  return sortRankingsData(mapRankingsData(row.data));
}

export async function saveRankings(data: RankingsData): Promise<RankingsData> {
  const normalized = sortRankingsData(data);
  const row = await prisma.rankingsSnapshot.upsert({
    where: { id: "default" },
    create: { id: "default", data: normalized as object },
    update: { data: normalized as object },
  });
  return sortRankingsData(mapRankingsData(row.data));
}
