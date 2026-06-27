import { assetUrl } from "@/lib/utils";
import {
  ARCHIVE_YEARS,
  MATCH_RESULTS,
  MOCK_ARTICLES,
  OFFICIALS,
  PLAYER_BIOS,
  PLAYERS,
  SPONSORS,
  TOURNAMENTS,
} from "@/lib/data/mock-site";
import photoAction3 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.06.webp";
import photoPlayer2 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.05.webp";
import photoAction2 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.02.webp";
import photoPlayer3 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.49.webp";
import photoCourt1 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.42.webp";
import photoCourt2 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.51.webp";
import photoCourt3 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.03.webp";
import photoPlayer1 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.47.webp";
import photoWide from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.01.webp";
import { NATIONAL_RANKINGS } from "@/lib/data/national-rankings";
import type {
  ArchiveYear,
  Article,
  Club,
  EventItem,
  MatchResult,
  MediaItem,
  Official,
  Player,
  RankingsData,
  Sponsor,
  TeamProfile,
} from "./types";
import { toLocalized } from "./types";

const SEED_TS = "2026-01-01T00:00:00.000Z";
const now = () => SEED_TS;

const WILAYA_MAP: Record<string, string> = {
  Alger: "16",
  Oran: "31",
  Constantine: "25",
  Annaba: "23",
  Sétif: "19",
  Béjaïa: "06",
  Tlemcen: "13",
  "Tizi Ouzou": "15",
  Blida: "09",
  Batna: "05",
};

const WILAYA_FROM_NAME: Record<string, string> = {
  الجزائر: "16",
  Alger: "16",
  وهران: "31",
  Oran: "31",
  قسنطينة: "25",
  Constantine: "25",
  عنابة: "23",
  Annaba: "23",
  سطيف: "19",
  Sétif: "19",
  البليدة: "09",
  Blida: "09",
  batna: "05",
  Batna: "05",
  تلمسان: "13",
  Tlemcen: "13",
};

export function seedArticles(): Article[] {
  const ts = now();
  return MOCK_ARTICLES.map((a, i) => ({
    id: `seed-article-${i + 1}`,
    slug: a.title.en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    title: a.title,
    summary: a.excerpt,
    body: a.excerpt,
    coverImage: assetUrl(a.img),
    publishedAt: `${a.date}T10:00:00`,
    category: a.cat,
    sections: [],
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function seedEvents(): EventItem[] {
  const ts = now();
  return TOURNAMENTS.map((e) => ({
    id: e.id,
    title: toLocalized({ ...e.name, en: e.name.fr }),
    description: toLocalized({ ar: e.location.ar, fr: e.location.fr, en: e.location.fr }),
    location: e.location.fr,
    startDate: e.start,
    endDate: e.end,
    eventStatus: e.status,
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function seedPlayers(): Player[] {
  const ts = now();
  return PLAYERS.map((p) => {
    const bio = PLAYER_BIOS[p.id];
    return {
      id: p.id,
      title: toLocalized({ ...p.name, en: p.name.fr }),
      club: toLocalized({ ...p.club, en: p.club.fr }),
      category: toLocalized({ ...p.category, en: p.category.fr }),
      wilayaCode: WILAYA_FROM_NAME[p.wilaya.fr] ?? WILAYA_FROM_NAME[p.wilaya.ar] ?? "16",
      ranking: p.ranking,
      photoUrl: assetUrl(p.img),
      bio: bio ? toLocalized({ ...bio.bio, en: bio.bio.fr }) : { en: "", fr: "", ar: "" },
      achievements: bio?.achievements.map((a) => toLocalized({ ...a, en: a.fr })) ?? [],
      status: "published" as const,
      createdAt: ts,
      updatedAt: ts,
    };
  });
}

export function seedOfficials(): Official[] {
  const ts = now();
  return OFFICIALS.map((o) => ({
    id: o.id,
    title: toLocalized({ ...o.name, en: o.name.fr }),
    role: toLocalized({ ...o.role, en: o.role.fr }),
    region: toLocalized({ ...o.region, en: o.region.fr }),
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function seedMatches(): MatchResult[] {
  const ts = now();
  const eventMap: Record<string, string> = {
    "Coupe d'Algérie": "e4",
    "Championnat d'Afrique": "e3",
    "Masters Seniors Alger": "e9",
    "Coupe Inter-Wilayas": "e8",
    "Tournoi International d'Oran": "e10",
  };
  return MATCH_RESULTS.map((m, i) => ({
    id: `seed-match-${i + 1}`,
    title: toLocalized({
      ar: `${m.player1.ar} vs ${m.player2.ar}`,
      fr: `${m.player1.fr} vs ${m.player2.fr}`,
      en: `${m.player1.fr} vs ${m.player2.fr}`,
    }),
    eventId: eventMap[m.event.fr] ?? "e4",
    category: "ms",
    player1Name: toLocalized({ ...m.player1, en: m.player1.fr }),
    player2Name: toLocalized({ ...m.player2, en: m.player2.fr }),
    score: m.score,
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function seedSponsors(): Sponsor[] {
  const ts = now();
  return SPONSORS.map((s) => ({
    id: s.id,
    title: toLocalized({ ...s.name, en: s.name.fr }),
    tier: s.tier,
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function seedTeams(): TeamProfile[] {
  const ts = now();
  const teams = [
    {
      id: "team-senior-men",
      title: { en: "Senior Men", fr: "Équipe Senior Hommes", ar: "منتخب الأكابر رجال" },
      description: {
        en: "National senior men's squad competing in African and international events.",
        fr: "Équipe nationale senior hommes en compétitions africaines et internationales.",
        ar: "المنتخب الوطني للأكابر رجال في البطولات الأفريقية والدولية.",
      },
      category: "senior-men" as const,
      image: assetUrl(photoAction3),
    },
    {
      id: "team-senior-women",
      title: { en: "Senior Women", fr: "Équipe Senior Dames", ar: "منتخب الأكابر سيدات" },
      description: {
        en: "National senior women's team, Mediterranean Games bronze medallists.",
        fr: "Équipe nationale senior dames, médaillée de bronze aux Jeux méditerranéens.",
        ar: "المنتخب الوطني للأكابر سيدات، حامل برونزية ألعاب المتوسط.",
      },
      category: "senior-women" as const,
      image: assetUrl(photoPlayer2),
    },
    {
      id: "team-junior-boys",
      title: { en: "Junior Boys", fr: "Équipe Juniors Garçons", ar: "منتخب الأصاغر ذكور" },
      description: {
        en: "Rising talents from regional academies representing Algeria in youth events.",
        fr: "Jeunes talents des académies régionales représentant l'Algérie.",
        ar: "مواهب شابة من الأكاديميات الجهوية تمثل الجزائر في بطولات الشباب.",
      },
      category: "junior-boys" as const,
      image: assetUrl(photoAction2),
    },
    {
      id: "team-junior-girls",
      title: { en: "Junior Girls", fr: "Équipe Juniors Filles", ar: "منتخب الأصاغر إناث" },
      description: {
        en: "Junior girls national team building the next generation of champions.",
        fr: "Équipe nationale juniors filles, relève du badminton algérien.",
        ar: "المنتخب الوطني للأصاغر إناث، جيل المستقبل للريشة الطائرة.",
      },
      category: "junior-girls" as const,
      image: assetUrl(photoPlayer3),
    },
  ];
  return teams.map((t) => ({
    ...t,
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function seedMedia(): MediaItem[] {
  const ts = now();
  const images = [photoCourt1, photoCourt3, photoAction2, photoPlayer1, photoWide, photoCourt2, photoAction3, photoPlayer2];
  return images.map((img, i) => ({
    id: `seed-media-${i + 1}`,
    title: {
      en: `Gallery photo ${i + 1}`,
      fr: `Photo galerie ${i + 1}`,
      ar: `صورة المعرض ${i + 1}`,
    },
    type: "image" as const,
    imageUrl: assetUrl(img),
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function seedClubs(): Club[] {
  const ts = now();
  const clubs = [
    { name: "MC Alger Badminton", region: "Alger", city: "Alger Centre", members: 142, founded: 1998, phone: "+213 21 65 32 11", email: "contact@mcalger-bad.dz" },
    { name: "USM Oran Shuttle", region: "Oran", city: "Oran", members: 98, founded: 2003, phone: "+213 41 23 45 67", email: "info@usmoran-bad.dz" },
    { name: "JS Constantine BC", region: "Constantine", city: "Constantine", members: 76, founded: 2001, phone: "+213 31 92 14 28", email: "jsc.badminton@gmail.com" },
    { name: "Annaba Smash Club", region: "Annaba", city: "Annaba", members: 64, founded: 2010, phone: "+213 38 86 22 19", email: "smash.annaba@gmail.com" },
    { name: "Sétif Badminton Académie", region: "Sétif", city: "Sétif", members: 110, founded: 2005, phone: "+213 36 84 11 22", email: "academy@setif-bad.dz" },
    { name: "JSM Béjaïa Plumes", region: "Béjaïa", city: "Béjaïa", members: 52, founded: 2012, phone: "+213 34 21 45 60", email: "plumes@jsmbejaia.dz" },
    { name: "Tlemcen Shuttle Club", region: "Tlemcen", city: "Tlemcen", members: 88, founded: 2007, phone: "+213 43 26 18 90", email: "tsc@tlemcen-bad.dz" },
    { name: "Tizi Ouzou BC", region: "Tizi Ouzou", city: "Tizi Ouzou", members: 71, founded: 2009, phone: "+213 26 21 33 44", email: "tobc.contact@gmail.com" },
    { name: "ASPTT Alger Badminton", region: "Alger", city: "Bab Ezzouar", members: 95, founded: 1995, phone: "+213 21 24 78 12", email: "asptt.bad@alger.dz" },
    { name: "CRB Blida Badminton", region: "Blida", city: "Blida", members: 58, founded: 2014, phone: "+213 25 32 11 44", email: "crb.blida.bad@gmail.com" },
    { name: "Olympique Batna BC", region: "Batna", city: "Batna", members: 45, founded: 2016, phone: "+213 33 54 22 18", email: "olympique.batna@bad.dz" },
    { name: "Mouloudia Club Badminton", region: "Alger", city: "Hydra", members: 120, founded: 1992, phone: "+213 21 98 44 33", email: "mcb.hydra@bad.dz" },
  ];
  return clubs.map((c, i) => ({
    id: `seed-club-${i + 1}`,
    title: { en: c.name, fr: c.name, ar: c.name },
    wilayaCode: WILAYA_MAP[c.region] ?? "16",
    city: c.city,
    members: c.members,
    founded: c.founded,
    phone: c.phone,
    email: c.email,
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function seedArchiveYears(): ArchiveYear[] {
  const ts = now();
  return ARCHIVE_YEARS.map((a) => ({
    id: `seed-archive-${a.year}`,
    year: a.year,
    count: a.count,
    status: "published" as const,
    createdAt: ts,
    updatedAt: ts,
  }));
}

export function seedRankings(): RankingsData {
  return JSON.parse(JSON.stringify(NATIONAL_RANKINGS)) as RankingsData;
}
