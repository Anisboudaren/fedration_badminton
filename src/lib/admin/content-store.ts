import { defaultSiteContactInfo } from "@/lib/data/contact-info";
import type {
  ArchiveYear,
  Article,
  Club,
  EventItem,
  FederationMemberItem,
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
  | "federation-members"
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
  "federation-members": FederationMemberItem[];
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
    topBarText: {
      en: "Welcome to the official website of the Algerian Badminton Federation",
      fr: "Bienvenue sur le site officiel de la Fédération Algérienne de Badminton",
      ar: "مرحبًا بكم في الموقع الرسمي للاتحادية الجزائرية للريشة الطائرة",
    },
    footerAbout: {
      en: "The Algerian Badminton Federation works to develop and promote badminton across the national territory.",
      fr: "La Fédération Algérienne de Badminton œuvre pour le développement et la promotion du badminton à travers tout le territoire national.",
      ar: "تعمل الاتحادية الجزائرية للريشة الطائرة على تطوير وترقية الرياضة عبر كامل التراب الوطني.",
    },
    footerOrgName: {
      en: "Algerian Badminton Federation",
      fr: "Fédération Algérienne de Badminton",
      ar: "الاتحادية الجزائرية للريشة الطائرة",
    },
    footerRights: {
      en: "All rights reserved",
      fr: "Tous droits réservés",
      ar: "جميع الحقوق محفوظة",
    },
    contact: defaultSiteContactInfo(),
  };
}

export { emptyLocalizedText };
