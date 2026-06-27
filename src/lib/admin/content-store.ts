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

export { emptyLocalizedText };
