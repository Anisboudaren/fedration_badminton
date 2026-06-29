import { z } from "zod";

export const localizedTextSchema = z.object({
  en: z.string(),
  fr: z.string(),
  ar: z.string(),
});

export const contentStatusSchema = z.enum(["draft", "published"]);

export const articleSectionSchema = z.object({
  id: z.string(),
  title: localizedTextSchema,
  body: localizedTextSchema,
  imageUrl: z.string().optional(),
  imageTitle: localizedTextSchema,
  videoUrl: z.string().optional(),
});

export const articleSchema = z.object({
  id: z.string().optional(),
  slug: z.string(),
  title: localizedTextSchema,
  summary: localizedTextSchema,
  body: localizedTextSchema,
  coverImage: z.string(),
  publishedAt: z.string().optional(),
  category: z.enum(["national", "international", "youth"]),
  sections: z.array(articleSectionSchema).default([]),
  status: contentStatusSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const eventSchema = z.object({
  id: z.string(),
  title: localizedTextSchema,
  description: localizedTextSchema,
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  eventStatus: z.enum(["upcoming", "finished"]),
  status: contentStatusSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const teamSchema = z.object({
  id: z.string().optional(),
  title: localizedTextSchema,
  description: localizedTextSchema,
  category: z.enum(["senior-men", "senior-women", "junior-boys", "junior-girls"]),
  image: z.string(),
  status: contentStatusSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const mediaSchema = z.object({
  id: z.string().optional(),
  title: localizedTextSchema,
  type: z.enum(["image", "youtube"]),
  imageUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  youtubeVideoId: z.string().optional(),
  status: contentStatusSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const playerSchema = z.object({
  id: z.string(),
  title: localizedTextSchema,
  club: localizedTextSchema,
  category: localizedTextSchema,
  wilayaCode: z.string(),
  ranking: z.number(),
  photoUrl: z.string(),
  bio: localizedTextSchema,
  achievements: z.array(localizedTextSchema),
  status: contentStatusSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const officialSchema = z.object({
  id: z.string(),
  title: localizedTextSchema,
  role: localizedTextSchema,
  region: localizedTextSchema,
  photoUrl: z.string().optional(),
  certificationLevel: z.string().optional(),
  status: contentStatusSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const matchSchema = z.object({
  id: z.string().optional(),
  title: localizedTextSchema,
  eventId: z.string(),
  category: z.string(),
  player1Name: localizedTextSchema,
  player2Name: localizedTextSchema,
  score: z.string(),
  stage: z.string().optional(),
  playedAt: z.string().optional(),
  status: contentStatusSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const sponsorSchema = z.object({
  id: z.string(),
  title: localizedTextSchema,
  tier: z.enum(["gold", "silver", "bronze"]),
  logoUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
  status: contentStatusSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const clubSchema = z.object({
  id: z.string().optional(),
  title: localizedTextSchema,
  wilayaCode: z.string(),
  city: z.string(),
  members: z.number(),
  founded: z.number(),
  phone: z.string(),
  email: z.string(),
  logoUrl: z.string().optional(),
  status: contentStatusSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const archiveYearSchema = z.object({
  id: z.string().optional(),
  year: z.number(),
  count: z.number(),
  status: contentStatusSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const siteContactInfoSchema = z.object({
  address: localizedTextSchema,
  email1: z.string(),
  email2: z.string(),
  phone1: z.string(),
  phone2: z.string(),
  fax: z.string(),
  facebook: z.string(),
  instagram: z.string(),
  youtube: z.string(),
  twitter: z.string(),
});

export const siteSettingsSchema = z.object({
  heroTitle: localizedTextSchema,
  heroTagline: localizedTextSchema,
  defaultLang: z.enum(["en", "fr", "ar"]),
  maintenanceMode: z.boolean(),
  maintenanceMessage: localizedTextSchema,
  contact: siteContactInfoSchema,
});

export const licenceRequestSchema = z.object({
  licenceType: z.enum(["athlete", "coach"]),
  fullName: z.string(),
  birthDate: z.string(),
  gender: z.enum(["male", "female"]),
  wilaya: z.string(),
  club: z.string(),
  category: z.string(),
  phone: z.string(),
  email: z.string(),
  documents: z
    .object({
      photo: z.string().optional(),
      birthCert: z.string().optional(),
      medical: z.string().optional(),
      antiDoping: z.string().optional(),
      idDoc: z.string().optional(),
      diploma: z.string().optional(),
    })
    .default({}),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  adminNotes: z.string().optional(),
  submittedAt: z.string().optional(),
});

export const COLLECTIONS = [
  "articles",
  "events",
  "teams",
  "media",
  "players",
  "officials",
  "matches",
  "sponsors",
  "clubs",
  "archive-years",
] as const;

export type ApiCollection = (typeof COLLECTIONS)[number];

export function isApiCollection(value: string): value is ApiCollection {
  return (COLLECTIONS as readonly string[]).includes(value);
}
