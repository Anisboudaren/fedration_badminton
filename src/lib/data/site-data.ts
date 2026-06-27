import type { Lang } from "@/i18n/translations";
import {
  defaultSiteSettings,
  ensureSeeded,
  getRankings,
  getSiteSettings,
  listItems,
  listLicenceRequests,
  listPublished,
} from "@/lib/admin/content-store";
import type {
  ArchiveYear,
  Article,
  Club,
  EventItem,
  LocalizedText,
  MatchResult,
  MediaItem,
  Official,
  Player,
  RankingsData,
  SiteSettings,
  Sponsor,
  TeamProfile,
} from "@/lib/admin/types";
import {
  ARCHIVE_YEARS,
  MATCH_RESULTS,
  OFFICIALS,
  PLAYERS,
  SPONSORS,
  TOURNAMENTS,
} from "@/lib/data/mock-site";
import { NATIONAL_RANKINGS } from "@/lib/data/national-rankings";
import { seedArticles } from "@/lib/admin/seed-data";
import { assetUrl } from "@/lib/utils";

export function pickLocalized(obj: LocalizedText, lang: Lang): string {
  if (lang === "fr") return obj.fr || obj.en || obj.ar;
  if (lang === "en") return obj.en || obj.fr || obj.ar;
  return obj.ar || obj.fr || obj.en;
}

function init() {
  if (typeof window !== "undefined") ensureSeeded();
}

export function getPublishedArticles(): Article[] {
  init();
  const cms = listPublished("articles");
  return cms.length > 0 ? cms : seedArticles();
}

export function getArticleById(id: string): Article | undefined {
  init();
  return listItems("articles").find((a) => a.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  init();
  return listPublished("articles").find((a) => a.slug === slug);
}

export function getEvents(): EventItem[] {
  init();
  const cms = listPublished("events");
  if (cms.length > 0) return cms;
  const ts = new Date().toISOString();
  return TOURNAMENTS.map((e) => ({
    id: e.id,
    title: { en: e.name.fr, fr: e.name.fr, ar: e.name.ar },
    description: { en: e.location.fr, fr: e.location.fr, ar: e.location.ar },
    location: e.location.fr,
    startDate: e.start,
    endDate: e.end,
    eventStatus: e.status,
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function getUpcomingEvents(): EventItem[] {
  return getEvents().filter((e) => e.eventStatus === "upcoming");
}

export function getFinishedEvents(): EventItem[] {
  return getEvents().filter((e) => e.eventStatus === "finished");
}

export function getPlayers(): Player[] {
  init();
  const cms = listPublished("players");
  if (cms.length > 0) return cms;
  const ts = new Date().toISOString();
  return PLAYERS.map((p) => ({
    id: p.id,
    title: { en: p.name.fr, fr: p.name.fr, ar: p.name.ar },
    club: { en: p.club.fr, fr: p.club.fr, ar: p.club.ar },
    category: { en: p.category.fr, fr: p.category.fr, ar: p.category.ar },
    wilayaCode: "16",
    ranking: p.ranking,
    photoUrl: assetUrl(p.img),
    bio: { en: "", fr: "", ar: "" },
    achievements: [],
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function getPlayerById(id: string): Player | undefined {
  return getPlayers().find((p) => p.id === id);
}

export function getOfficials(): Official[] {
  init();
  const cms = listPublished("officials");
  if (cms.length > 0) return cms;
  const ts = new Date().toISOString();
  return OFFICIALS.map((o) => ({
    id: o.id,
    title: { en: o.name.fr, fr: o.name.fr, ar: o.name.ar },
    role: { en: o.role.fr, fr: o.role.fr, ar: o.role.ar },
    region: { en: o.region.fr, fr: o.region.fr, ar: o.region.ar },
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function getMatchResults(eventId?: string): MatchResult[] {
  init();
  const cms = listPublished("matches");
  const results =
    cms.length > 0
      ? cms
      : (() => {
          const ts = new Date().toISOString();
          return MATCH_RESULTS.map((m, i) => ({
            id: `seed-m${i}`,
            title: { en: `${m.player1.fr} vs ${m.player2.fr}`, fr: `${m.player1.fr} vs ${m.player2.fr}`, ar: `${m.player1.ar} vs ${m.player2.ar}` },
            eventId: m.event.fr.includes("Coupe") ? "e4" : "e3",
            category: "ms",
            player1Name: { en: m.player1.fr, fr: m.player1.fr, ar: m.player1.ar },
            player2Name: { en: m.player2.fr, fr: m.player2.fr, ar: m.player2.ar },
            score: m.score,
            status: "published" as const,
            createdAt: ts,
            updatedAt: ts,
          }));
        })();
  return eventId ? results.filter((r) => r.eventId === eventId) : results;
}

export function getSponsors(): Sponsor[] {
  init();
  const cms = listPublished("sponsors");
  if (cms.length > 0) return cms;
  const ts = new Date().toISOString();
  return SPONSORS.map((s) => ({
    id: s.id,
    title: { en: s.name.fr, fr: s.name.fr, ar: s.name.ar },
    tier: s.tier,
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function getClubs(): Club[] {
  init();
  const cms = listPublished("clubs");
  return cms;
}

export function getTeams(): TeamProfile[] {
  init();
  return listPublished("teams");
}

export function getMedia(): MediaItem[] {
  init();
  return listPublished("media");
}

export function getArchiveYears(): ArchiveYear[] {
  init();
  const cms = listPublished("archive-years");
  if (cms.length > 0) return cms;
  const ts = new Date().toISOString();
  return ARCHIVE_YEARS.map((a) => ({
    id: `y${a.year}`,
    year: a.year,
    count: a.count,
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function getNationalRankings(): RankingsData {
  init();
  if (typeof window !== "undefined") return getRankings();
  return JSON.parse(JSON.stringify(NATIONAL_RANKINGS)) as RankingsData;
}

export function readSiteSettings(): SiteSettings {
  init();
  if (typeof window !== "undefined") return getSiteSettings();
  return defaultSiteSettings();
}

export function getLicenceRequests() {
  init();
  return listLicenceRequests();
}

export function isMaintenanceMode(): boolean {
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") return true;
  return readSiteSettings().maintenanceMode;
}

export function getHeroContent(lang: Lang) {
  const settings = readSiteSettings();
  return {
    title: pickLocalized(settings.heroTitle, lang),
    tagline: pickLocalized(settings.heroTagline, lang),
  };
}
