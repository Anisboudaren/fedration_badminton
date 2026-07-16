import { normalizeSiteContactInfo } from "@/lib/data/contact-info";
import { defaultSiteSettings } from "@/lib/admin/content-store";
import type { Prisma } from "@/generated/prisma/client";
import type {
  Article,
  ArticleSection,
  ArchiveYear,
  AboutDocument,
  AboutOrgNode,
  AboutPageContent,
  Club,
  ContentStatus,
  EventItem,
  FederationMemberItem,
  LicenceRequest,
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
import type { Lang } from "@/i18n/translations";

export function toLocalizedText(value: unknown): LocalizedText {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    return {
      en: typeof obj.en === "string" ? obj.en : "",
      fr: typeof obj.fr === "string" ? obj.fr : "",
      ar: typeof obj.ar === "string" ? obj.ar : "",
    };
  }
  return { en: "", fr: "", ar: "" };
}

export function fromLocalizedText(value: LocalizedText): Prisma.InputJsonValue {
  return { en: value.en ?? "", fr: value.fr ?? "", ar: value.ar ?? "" };
}

export function toLocalizedTextArray(value: unknown): LocalizedText[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => toLocalizedText(item));
}

export function fromLocalizedTextArray(values: LocalizedText[]): Prisma.InputJsonValue {
  return values.map((v) => fromLocalizedText(v));
}

export function toIso(date: Date | null | undefined): string {
  return date ? date.toISOString() : new Date().toISOString();
}

export function toOptionalIso(date: Date | null | undefined): string | undefined {
  return date ? date.toISOString() : undefined;
}

export function parseDate(value: string | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function toContentStatus(value: string): ContentStatus {
  return value === "published" ? "published" : "draft";
}

const TEAM_TO_APP: Record<string, TeamProfile["category"]> = {
  senior_men: "senior-men",
  senior_women: "senior-women",
  junior_boys: "junior-boys",
  junior_girls: "junior-girls",
};

const TEAM_TO_DB: Record<TeamProfile["category"], "senior_men" | "senior_women" | "junior_boys" | "junior_girls"> = {
  "senior-men": "senior_men",
  "senior-women": "senior_women",
  "junior-boys": "junior_boys",
  "junior-girls": "junior_girls",
};

export function toTeamCategory(value: string): TeamProfile["category"] {
  return TEAM_TO_APP[value] ?? "senior-men";
}

export function fromTeamCategory(value: TeamProfile["category"]) {
  return TEAM_TO_DB[value];
}

export function hasAnyLocalizedText(value: LocalizedText): boolean {
  return Boolean(value.en.trim() || value.fr.trim() || value.ar.trim());
}

export function pickLocalized(obj: LocalizedText, lang: Lang): string {
  if (lang === "fr") return obj.fr || obj.en || obj.ar;
  if (lang === "en") return obj.en || obj.fr || obj.ar;
  return obj.ar || obj.fr || obj.en;
}

// --- Entity mappers ---

export function mapArticle(row: {
  id: string;
  slug: string;
  title: unknown;
  summary: unknown;
  body: unknown;
  coverImage: string;
  publishedAt: Date | null;
  category: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  sections?: Array<{
    id: string;
    title: unknown;
    body: unknown;
    imageUrl: string | null;
    imageTitle: unknown;
    videoUrl: string | null;
    sortOrder: number;
  }>;
}): Article {
  return {
    id: row.id,
    slug: row.slug,
    title: toLocalizedText(row.title),
    summary: toLocalizedText(row.summary),
    body: toLocalizedText(row.body),
    coverImage: row.coverImage,
    publishedAt: toOptionalIso(row.publishedAt),
    category: row.category as Article["category"],
    status: toContentStatus(row.status),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
    sections: (row.sections ?? [])
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(
        (s): ArticleSection => ({
          id: s.id,
          title: toLocalizedText(s.title),
          body: toLocalizedText(s.body),
          imageUrl: s.imageUrl ?? undefined,
          imageTitle: toLocalizedText(s.imageTitle),
          videoUrl: s.videoUrl ?? undefined,
        }),
      ),
  };
}

export function mapEvent(row: {
  id: string;
  title: unknown;
  description: unknown;
  location: string;
  startDate: Date;
  endDate: Date;
  eventStatus: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): EventItem {
  return {
    id: row.id,
    title: toLocalizedText(row.title),
    description: toLocalizedText(row.description),
    location: row.location,
    startDate: row.startDate.toISOString().slice(0, 10),
    endDate: row.endDate.toISOString().slice(0, 10),
    eventStatus: row.eventStatus as EventItem["eventStatus"],
    status: toContentStatus(row.status),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export function mapTeam(row: {
  id: string;
  title: unknown;
  description: unknown;
  category: string;
  image: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): TeamProfile {
  return {
    id: row.id,
    title: toLocalizedText(row.title),
    description: toLocalizedText(row.description),
    category: toTeamCategory(row.category),
    image: row.image,
    status: toContentStatus(row.status),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export function mapMedia(row: {
  id: string;
  title: unknown;
  type: string;
  imageUrl: string | null;
  youtubeUrl: string | null;
  youtubeVideoId: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): MediaItem {
  return {
    id: row.id,
    title: toLocalizedText(row.title),
    type: row.type as MediaItem["type"],
    imageUrl: row.imageUrl ?? undefined,
    youtubeUrl: row.youtubeUrl ?? undefined,
    youtubeVideoId: row.youtubeVideoId ?? undefined,
    status: toContentStatus(row.status),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export function mapPlayer(row: {
  id: string;
  title: unknown;
  club: unknown;
  category: unknown;
  wilayaCode: string;
  ranking: number;
  photoUrl: string;
  bio: unknown;
  achievements: unknown;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): Player {
  return {
    id: row.id,
    title: toLocalizedText(row.title),
    club: toLocalizedText(row.club),
    category: toLocalizedText(row.category),
    wilayaCode: row.wilayaCode,
    ranking: row.ranking,
    photoUrl: row.photoUrl,
    bio: toLocalizedText(row.bio),
    achievements: toLocalizedTextArray(row.achievements),
    status: toContentStatus(row.status),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export function mapOfficial(row: {
  id: string;
  title: unknown;
  role: unknown;
  region: unknown;
  photoUrl: string | null;
  certificationLevel: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): Official {
  return {
    id: row.id,
    title: toLocalizedText(row.title),
    role: toLocalizedText(row.role),
    region: toLocalizedText(row.region),
    photoUrl: row.photoUrl ?? undefined,
    certificationLevel: row.certificationLevel ?? undefined,
    status: toContentStatus(row.status),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export function mapMatch(row: {
  id: string;
  title: unknown;
  eventId: string;
  category: string;
  player1Name: unknown;
  player2Name: unknown;
  score: string;
  stage: string | null;
  playedAt: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): MatchResult {
  return {
    id: row.id,
    title: toLocalizedText(row.title),
    eventId: row.eventId,
    category: row.category,
    player1Name: toLocalizedText(row.player1Name),
    player2Name: toLocalizedText(row.player2Name),
    score: row.score,
    stage: row.stage ?? undefined,
    playedAt: toOptionalIso(row.playedAt),
    status: toContentStatus(row.status),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export function mapSponsor(row: {
  id: string;
  title: unknown;
  tier: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): Sponsor {
  return {
    id: row.id,
    title: toLocalizedText(row.title),
    tier: row.tier as Sponsor["tier"],
    logoUrl: row.logoUrl ?? undefined,
    websiteUrl: row.websiteUrl ?? undefined,
    status: toContentStatus(row.status),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export function mapClub(row: {
  id: string;
  title: unknown;
  wilayaCode: string;
  city: string;
  members: number;
  founded: number;
  phone: string;
  email: string;
  logoUrl: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): Club {
  return {
    id: row.id,
    title: toLocalizedText(row.title),
    wilayaCode: row.wilayaCode,
    city: row.city,
    members: row.members,
    founded: row.founded,
    phone: row.phone,
    email: row.email,
    logoUrl: row.logoUrl ?? undefined,
    status: toContentStatus(row.status),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export function mapArchiveYear(row: {
  id: string;
  year: number;
  count: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): ArchiveYear {
  return {
    id: row.id,
    year: row.year,
    count: row.count,
    status: toContentStatus(row.status),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

function localizedOrDefault(value: unknown, fallback: LocalizedText): LocalizedText {
  const mapped = toLocalizedText(value);
  if (mapped.en || mapped.fr || mapped.ar) return mapped;
  return fallback;
}

export function mapSiteSettings(row: {
  heroTitle: unknown;
  heroTagline: unknown;
  defaultLang: string;
  maintenanceMode: boolean;
  maintenanceMessage: unknown;
  topBarText?: unknown;
  footerAbout?: unknown;
  footerOrgName?: unknown;
  footerRights?: unknown;
  contactInfo?: unknown;
}): SiteSettings {
  const defaults = defaultSiteSettings();
  return {
    heroTitle: toLocalizedText(row.heroTitle),
    heroTagline: toLocalizedText(row.heroTagline),
    defaultLang: (row.defaultLang as Lang) || "ar",
    maintenanceMode: row.maintenanceMode,
    maintenanceMessage: toLocalizedText(row.maintenanceMessage),
    topBarText: localizedOrDefault(row.topBarText, defaults.topBarText),
    footerAbout: localizedOrDefault(row.footerAbout, defaults.footerAbout),
    footerOrgName: localizedOrDefault(row.footerOrgName, defaults.footerOrgName),
    footerRights: localizedOrDefault(row.footerRights, defaults.footerRights),
    contact: normalizeSiteContactInfo(row.contactInfo),
  };
}

function mapAboutOrgNodes(value: unknown): AboutOrgNode[] {
  if (!Array.isArray(value)) return [];
  return value.map((item, index) => {
    const obj = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
    return {
      id: typeof obj.id === "string" ? obj.id : `org-${index}`,
      title: toLocalizedText(obj.title),
      subtitle: toLocalizedText(obj.subtitle),
      imageUrl: typeof obj.imageUrl === "string" ? obj.imageUrl : "",
    };
  });
}

function mapAboutDocuments(value: unknown): AboutDocument[] {
  if (!Array.isArray(value)) return [];
  return value.map((item, index) => {
    const obj = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
    const kind = obj.kind === "link" ? "link" : "file";
    return {
      id: typeof obj.id === "string" ? obj.id : `doc-${index}`,
      title: toLocalizedText(obj.title),
      subtitle: toLocalizedText(obj.subtitle),
      kind,
      fileUrl: typeof obj.fileUrl === "string" ? obj.fileUrl : "",
      href: typeof obj.href === "string" ? obj.href : "",
    };
  });
}

export function mapAboutPageContent(row: {
  heroTitle: unknown;
  heroIntro: unknown;
  heroImageUrl: string;
  missionTitle: unknown;
  missionP1: unknown;
  missionP2: unknown;
  missionImageUrl: string;
  leadershipTitle: unknown;
  leadershipIntro: unknown;
  orgTitle: unknown;
  orgNodes: unknown;
  regulationsTitle: unknown;
  regulationsIntro: unknown;
  documentsTitle: unknown;
  documents: unknown;
}): AboutPageContent {
  return {
    heroTitle: toLocalizedText(row.heroTitle),
    heroIntro: toLocalizedText(row.heroIntro),
    heroImageUrl: row.heroImageUrl ?? "",
    missionTitle: toLocalizedText(row.missionTitle),
    missionP1: toLocalizedText(row.missionP1),
    missionP2: toLocalizedText(row.missionP2),
    missionImageUrl: row.missionImageUrl ?? "",
    leadershipTitle: toLocalizedText(row.leadershipTitle),
    leadershipIntro: toLocalizedText(row.leadershipIntro),
    orgTitle: toLocalizedText(row.orgTitle),
    orgNodes: mapAboutOrgNodes(row.orgNodes),
    regulationsTitle: toLocalizedText(row.regulationsTitle),
    regulationsIntro: toLocalizedText(row.regulationsIntro),
    documentsTitle: toLocalizedText(row.documentsTitle),
    documents: mapAboutDocuments(row.documents),
  };
}

export function mapFederationMember(row: {
  id: string;
  firstName: unknown;
  lastName: unknown;
  role: unknown;
  photoUrl: string;
  sortOrder: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): FederationMemberItem {
  const firstName = toLocalizedText(row.firstName);
  const lastName = toLocalizedText(row.lastName);
  return {
    id: row.id,
    title: {
      en: `${firstName.en} ${lastName.en}`.trim(),
      fr: `${firstName.fr} ${lastName.fr}`.trim(),
      ar: `${firstName.ar} ${lastName.ar}`.trim(),
    },
    firstName,
    lastName,
    role: toLocalizedText(row.role),
    photoUrl: row.photoUrl ?? "",
    sortOrder: row.sortOrder,
    status: toContentStatus(row.status),
    createdAt: toIso(row.createdAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export function mapLicenceRequest(row: {
  id: string;
  licenceType: string;
  fullName: string;
  birthDate: string;
  gender: string;
  wilaya: string;
  club: string;
  category: string;
  phone: string;
  email: string;
  documents: unknown;
  status: string;
  adminNotes: string;
  submittedAt: Date;
  updatedAt: Date;
}): LicenceRequest {
  const docs = row.documents && typeof row.documents === "object" ? (row.documents as Record<string, string>) : {};
  return {
    id: row.id,
    licenceType: row.licenceType as LicenceRequest["licenceType"],
    fullName: row.fullName,
    birthDate: row.birthDate,
    gender: row.gender as LicenceRequest["gender"],
    wilaya: row.wilaya,
    club: row.club,
    category: row.category,
    phone: row.phone,
    email: row.email,
    documents: {
      photo: docs.photo,
      birthCert: docs.birthCert,
      medical: docs.medical,
      antiDoping: docs.antiDoping,
      idDoc: docs.idDoc,
      diploma: docs.diploma,
    },
    status: row.status as LicenceRequest["status"],
    adminNotes: row.adminNotes,
    submittedAt: toIso(row.submittedAt),
    updatedAt: toIso(row.updatedAt),
  };
}

export function mapRankingsData(value: unknown): RankingsData {
  if (value && typeof value === "object") return value as RankingsData;
  return { title: { fr: "", ar: "" }, categories: [] };
}
