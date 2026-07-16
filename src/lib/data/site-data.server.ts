import type { Lang } from "@/i18n/translations";
import type {
  ArchiveYear,
  Article,
  AboutPageContent,
  Club,
  EventItem,
  FederationMemberItem,
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
import { pickLocalized } from "@/lib/db/mappers";
import { listArticles, getArticleById, getArticleBySlug } from "@/lib/db/repositories/articles";
import { listEvents } from "@/lib/db/repositories/events";
import {
  listArchiveYears,
  listClubs,
  listMatches,
  listMedia,
  listOfficials,
  listPlayers,
  listSponsors,
  listTeams,
} from "@/lib/db/repositories/collections";
import { getAboutPageContent, listFederationMembers } from "@/lib/db/repositories/about";
import { getRankings, getSiteSettings } from "@/lib/db/repositories/settings";
import { sortSponsorsByTier } from "@/lib/data/sponsors";
import { eventsFromToday } from "@/lib/data/events";

export { pickLocalized };

export async function getPublishedArticles(): Promise<Article[]> {
  return listArticles(true);
}

export async function getArticleByIdServer(id: string): Promise<Article | null> {
  return getArticleById(id);
}

export async function getArticleBySlugServer(slug: string): Promise<Article | null> {
  return getArticleBySlug(slug);
}

export async function getEvents(): Promise<EventItem[]> {
  return listEvents(true);
}

export async function getUpcomingEvents(): Promise<EventItem[]> {
  const events = await listEvents(true);
  return eventsFromToday(events);
}

export async function getFinishedEvents(): Promise<EventItem[]> {
  const events = await listEvents(true);
  return events.filter((e) => e.eventStatus === "finished");
}

export async function getPlayers(): Promise<Player[]> {
  return listPlayers(true);
}

export async function getPlayerById(id: string): Promise<Player | undefined> {
  const players = await listPlayers(true);
  return players.find((p) => p.id === id);
}

export async function getOfficials(): Promise<Official[]> {
  return listOfficials(true);
}

export async function getMatchResults(eventId?: string): Promise<MatchResult[]> {
  return listMatches(true, eventId);
}

export async function getSponsors(): Promise<Sponsor[]> {
  return listSponsors(true);
}

export async function getClubs(): Promise<Club[]> {
  return listClubs(true);
}

export async function getTeams(): Promise<TeamProfile[]> {
  return listTeams(true);
}

export async function getMedia(): Promise<MediaItem[]> {
  return listMedia(true);
}

export async function getArchiveYears(): Promise<ArchiveYear[]> {
  return listArchiveYears(true);
}

export async function getNationalRankings(): Promise<RankingsData> {
  return getRankings();
}

export type AboutPageData = {
  content: AboutPageContent;
  members: FederationMemberItem[];
};

export async function getAboutPageData(): Promise<AboutPageData> {
  const [content, members] = await Promise.all([
    getAboutPageContent(),
    listFederationMembers(true),
  ]);
  return { content, members };
}

export async function readSiteSettings(): Promise<SiteSettings> {
  return getSiteSettings();
}

export async function isMaintenanceMode(): Promise<boolean> {
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") return true;
  const settings = await getSiteSettings();
  return settings.maintenanceMode;
}

export async function getHeroContent(lang: Lang) {
  const settings = await getSiteSettings();
  return {
    title: pickLocalized(settings.heroTitle, lang),
    tagline: pickLocalized(settings.heroTagline, lang),
  };
}

export type HomePageData = {
  settings: SiteSettings;
  articles: Article[];
  upcomingEvents: EventItem[];
  teams: TeamProfile[];
  media: MediaItem[];
  sponsors: Sponsor[];
  matchResults: MatchResult[];
};

export async function getHomePageData(): Promise<HomePageData> {
  const [settings, articles, allEvents, teams, media, sponsors, matchResults] = await Promise.all([
    getSiteSettings(),
    getPublishedArticles(),
    getEvents(),
    getTeams(),
    getMedia(),
    getSponsors(),
    getMatchResults(),
  ]);

  const upcomingEvents = eventsFromToday(allEvents, 3);

  return { settings, articles, upcomingEvents, teams, media, sponsors: sortSponsorsByTier(sponsors), matchResults };
}
