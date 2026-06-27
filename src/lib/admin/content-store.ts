import type {
  ArchiveYear,
  Article,
  Club,
  EventItem,
  LicenceRequest,
  MatchResult,
  MediaItem,
  Official,
  Player,
  RankingsData,
  SiteSettings,
  Sponsor,
  TeamProfile,
} from "./types";
import { emptyLocalizedText } from "./types";
import {
  seedArchiveYears,
  seedArticles,
  seedClubs,
  seedEvents,
  seedMatches,
  seedMedia,
  seedOfficials,
  seedPlayers,
  seedRankings,
  seedSponsors,
  seedTeams,
} from "./seed-data";

export type CollectionKey =
  | "articles"
  | "events"
  | "teams"
  | "media"
  | "players"
  | "officials"
  | "matches"
  | "sponsors"
  | "clubs"
  | "archive-years";

export type CollectionMap = {
  articles: Article[];
  events: EventItem[];
  teams: TeamProfile[];
  media: MediaItem[];
  players: Player[];
  officials: Official[];
  matches: MatchResult[];
  sponsors: Sponsor[];
  clubs: Club[];
  "archive-years": ArchiveYear[];
};

const SEED_VERSION = "v2";
const SEED_FLAG = "abf-admin-seed-version";
const SETTINGS_KEY = "abf-site-settings";
const RANKINGS_KEY = "abf-admin-rankings";
const REQUESTS_KEY = "abf-admin-licence-requests";

const storageKeyFor = (key: CollectionKey) => `abf-admin-${key}`;

const parseStored = <T>(raw: string | null): T[] => {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
};

export const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const seeders: Partial<Record<CollectionKey, () => CollectionMap[CollectionKey]>> = {
  articles: seedArticles as () => CollectionMap[CollectionKey],
  events: seedEvents as () => CollectionMap[CollectionKey],
  teams: seedTeams as () => CollectionMap[CollectionKey],
  media: seedMedia as () => CollectionMap[CollectionKey],
  players: seedPlayers as () => CollectionMap[CollectionKey],
  officials: seedOfficials as () => CollectionMap[CollectionKey],
  matches: seedMatches as () => CollectionMap[CollectionKey],
  sponsors: seedSponsors as () => CollectionMap[CollectionKey],
  clubs: seedClubs as () => CollectionMap[CollectionKey],
  "archive-years": seedArchiveYears as () => CollectionMap[CollectionKey],
};

export function ensureSeeded() {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(SEED_FLAG) === SEED_VERSION) return;

  for (const key of Object.keys(seeders) as CollectionKey[]) {
    const seeder = seeders[key];
    if (seeder) window.localStorage.setItem(storageKeyFor(key), JSON.stringify(seeder()));
  }

  if (!window.localStorage.getItem(RANKINGS_KEY)) {
    window.localStorage.setItem(RANKINGS_KEY, JSON.stringify(seedRankings()));
  }

  if (!window.localStorage.getItem(SETTINGS_KEY)) {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSiteSettings()));
  }

  window.localStorage.setItem(SEED_FLAG, SEED_VERSION);
  window.localStorage.removeItem("abf-admin-seeded-v1");
}

export function defaultSiteSettings(): SiteSettings {
  return {
    heroTitle: {
      en: "Together, we build the future of Algerian Badminton",
      fr: "Ensemble, construisons l'avenir du Badminton Algérien",
      ar: "معًا، نبني مستقبل الريشة الطائرة في الجزائر",
    },
    heroTagline: {
      en: "Algerian Badminton Federation",
      fr: "Fédération Algérienne de Badminton",
      ar: "الاتحادية الجزائرية للريشة الطائرة",
    },
    defaultLang: "ar",
    maintenanceMode: false,
    maintenanceMessage: {
      en: "We are currently performing maintenance. Please check back soon.",
      fr: "Nous effectuons actuellement une maintenance. Revenez bientôt.",
      ar: "نقوم حالياً بأعمال صيانة. يرجى العودة قريباً.",
    },
  };
}

export const listItems = <K extends CollectionKey>(key: K): CollectionMap[K] => {
  if (typeof window === "undefined") return [] as CollectionMap[K];
  ensureSeeded();
  return parseStored<CollectionMap[K][number]>(window.localStorage.getItem(storageKeyFor(key))) as CollectionMap[K];
};

export const saveItems = <K extends CollectionKey>(key: K, items: CollectionMap[K]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKeyFor(key), JSON.stringify(items));
};

export const listPublished = <K extends CollectionKey>(key: K): CollectionMap[K] => {
  const items = listItems(key);
  return items.filter((item) => "status" in item && item.status === "published") as CollectionMap[K];
};

export function getSiteSettings(): SiteSettings {
  if (typeof window === "undefined") return defaultSiteSettings();
  ensureSeeded();
  const raw = window.localStorage.getItem(SETTINGS_KEY);
  if (!raw) return defaultSiteSettings();
  try {
    return { ...defaultSiteSettings(), ...(JSON.parse(raw) as SiteSettings) };
  } catch {
    return defaultSiteSettings();
  }
}

export function saveSiteSettings(settings: SiteSettings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getRankings(): RankingsData {
  if (typeof window === "undefined") return seedRankings();
  ensureSeeded();
  const raw = window.localStorage.getItem(RANKINGS_KEY);
  if (!raw) return seedRankings();
  try {
    return JSON.parse(raw) as RankingsData;
  } catch {
    return seedRankings();
  }
}

export function saveRankings(data: RankingsData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RANKINGS_KEY, JSON.stringify(data));
}

export function listLicenceRequests(): LicenceRequest[] {
  if (typeof window === "undefined") return [];
  ensureSeeded();
  return parseStored<LicenceRequest>(window.localStorage.getItem(REQUESTS_KEY));
}

export function saveLicenceRequests(requests: LicenceRequest[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

export function saveLicenceRequest(request: Omit<LicenceRequest, "id" | "updatedAt"> & { id?: string }) {
  const now = new Date().toISOString();
  const requests = listLicenceRequests();
  const entry: LicenceRequest = {
    ...request,
    id: request.id ?? createId(),
    updatedAt: now,
  };
  saveLicenceRequests([entry, ...requests]);
  return entry;
}

export function updateLicenceRequest(id: string, patch: Partial<LicenceRequest>) {
  const requests = listLicenceRequests();
  const next = requests.map((r) => (r.id === id ? { ...r, ...patch, updatedAt: new Date().toISOString() } : r));
  saveLicenceRequests(next);
}

export function countPendingRequests(): number {
  return listLicenceRequests().filter((r) => r.status === "pending").length;
}

export type ActivityItem = {
  id: string;
  collection: CollectionKey | "requests";
  title: string;
  updatedAt: string;
};

export function getRecentActivity(limit = 8): ActivityItem[] {
  const collections: CollectionKey[] = [
    "articles",
    "events",
    "teams",
    "media",
    "players",
    "officials",
    "matches",
    "sponsors",
    "clubs",
  ];
  const items: ActivityItem[] = [];

  for (const collection of collections) {
    for (const item of listItems(collection)) {
      const title =
        "title" in item && typeof item.title === "object"
          ? item.title.en || item.title.fr || item.title.ar
          : String(item.id);
      items.push({ id: item.id, collection, title, updatedAt: item.updatedAt });
    }
  }

  for (const req of listLicenceRequests()) {
    items.push({
      id: req.id,
      collection: "requests",
      title: req.fullName,
      updatedAt: req.updatedAt,
    });
  }

  return items.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)).slice(0, limit);
}

export { emptyLocalizedText };
