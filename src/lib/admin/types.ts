import type { Lang } from "@/i18n/translations";

export type LocalizedText = { en: string; fr: string; ar: string };

export type ContentStatus = "draft" | "published";

export type BaseContentItem = {
  id: string;
  title: LocalizedText;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
};

export type ArticleCategory = "national" | "international" | "youth";

export type Article = BaseContentItem & {
  slug: string;
  summary: LocalizedText;
  body: LocalizedText;
  coverImage: string;
  publishedAt?: string;
  category: ArticleCategory;
  sections: ArticleSection[];
};

export type ArticleSection = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  imageUrl?: string;
  imageTitle: LocalizedText;
  videoUrl?: string;
};

export type EventStatus = "upcoming" | "finished";

export type EventItem = BaseContentItem & {
  description: LocalizedText;
  location: string;
  startDate: string;
  endDate: string;
  eventStatus: EventStatus;
};

export type TeamProfile = BaseContentItem & {
  description: LocalizedText;
  category: "senior-men" | "senior-women" | "junior-boys" | "junior-girls";
  image: string;
};

export type MediaType = "image" | "youtube";

export type MediaItem = BaseContentItem & {
  type: MediaType;
  imageUrl?: string;
  youtubeUrl?: string;
  youtubeVideoId?: string;
};

export type Player = BaseContentItem & {
  club: LocalizedText;
  category: LocalizedText;
  wilayaCode: string;
  ranking: number;
  photoUrl: string;
  bio: LocalizedText;
  achievements: LocalizedText[];
};

export type Official = BaseContentItem & {
  role: LocalizedText;
  region: LocalizedText;
  photoUrl?: string;
  certificationLevel?: string;
};

export type MatchResult = BaseContentItem & {
  eventId: string;
  category: string;
  player1Name: LocalizedText;
  player2Name: LocalizedText;
  score: string;
  stage?: string;
  playedAt?: string;
};

export type SponsorTier = "gold" | "silver" | "bronze";

export type Sponsor = BaseContentItem & {
  tier: SponsorTier;
  logoUrl?: string;
  websiteUrl?: string;
};

export type Club = BaseContentItem & {
  wilayaCode: string;
  city: string;
  members: number;
  founded: number;
  phone: string;
  email: string;
  logoUrl?: string;
};

export type RequestStatus = "pending" | "approved" | "rejected";

export type LicenceRequest = {
  id: string;
  licenceType: "athlete" | "coach";
  fullName: string;
  birthDate: string;
  gender: "male" | "female";
  wilaya: string;
  club: string;
  category: string;
  phone: string;
  email: string;
  documents: {
    photo?: string;
    birthCert?: string;
    medical?: string;
    antiDoping?: string;
    idDoc?: string;
    diploma?: string;
  };
  status: RequestStatus;
  adminNotes: string;
  submittedAt: string;
  updatedAt: string;
};

export type SiteContactInfo = {
  address: LocalizedText;
  email1: string;
  email2: string;
  phone1: string;
  phone2: string;
  fax: string;
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
};

export type SiteSettings = {
  heroTitle: LocalizedText;
  heroTagline: LocalizedText;
  defaultLang: Lang;
  maintenanceMode: boolean;
  maintenanceMessage: LocalizedText;
  topBarText: LocalizedText;
  footerAbout: LocalizedText;
  footerOrgName: LocalizedText;
  footerRights: LocalizedText;
  contact: SiteContactInfo;
};

export type AboutOrgNode = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  imageUrl: string;
};

export type AboutDocument = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  kind: "file" | "link";
  fileUrl?: string;
  href?: string;
};

export type AboutPageContent = {
  heroTitle: LocalizedText;
  heroIntro: LocalizedText;
  heroImageUrl: string;
  missionTitle: LocalizedText;
  missionP1: LocalizedText;
  missionP2: LocalizedText;
  missionImageUrl: string;
  leadershipTitle: LocalizedText;
  leadershipIntro: LocalizedText;
  orgTitle: LocalizedText;
  orgNodes: AboutOrgNode[];
  regulationsTitle: LocalizedText;
  regulationsIntro: LocalizedText;
  documentsTitle: LocalizedText;
  documents: AboutDocument[];
};

export type FederationMemberItem = BaseContentItem & {
  firstName: LocalizedText;
  lastName: LocalizedText;
  role: LocalizedText;
  photoUrl: string;
  sortOrder: number;
};

export type RankingsPlayer = {
  name: string;
  club: string;
  league: string;
  j1: number;
  j2: number;
  j3: number;
  total: number;
};

export type RankingsTeam = {
  club: string;
  wilaya: string;
  j1: number;
  j2: number;
  j3: number;
  total: number;
};

export type RankingsCategory =
  | { id: "ws" | "ms" | "md" | "wd" | "xd"; fr: string; ar: string; players: RankingsPlayer[] }
  | { id: "teams"; fr: string; ar: string; teams: RankingsTeam[] };

export type RankingsData = {
  title: { fr: string; ar: string };
  categories: RankingsCategory[];
};

export type ArchiveYear = {
  id: string;
  year: number;
  count: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
};

export const emptyLocalizedText = (): LocalizedText => ({
  en: "",
  fr: "",
  ar: "",
});

export const toLocalized = (obj: { ar: string; fr: string; en?: string }): LocalizedText => ({
  en: obj.en ?? obj.fr,
  fr: obj.fr,
  ar: obj.ar,
});
