import "dotenv/config";
import prisma from "../src/lib/prisma";
import { defaultSiteSettings } from "../src/lib/admin/content-store";
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
} from "../src/lib/admin/seed-data";
import { fromLocalizedText, fromLocalizedTextArray, fromTeamCategory } from "../src/lib/db/mappers";

async function main() {
  console.log("Seeding database...");

  // Events first (matches FK)
  for (const e of seedEvents()) {
    await prisma.event.upsert({
      where: { id: e.id },
      create: {
        id: e.id,
        title: fromLocalizedText(e.title),
        description: fromLocalizedText(e.description),
        location: e.location,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
        eventStatus: e.eventStatus,
        status: e.status,
        createdAt: new Date(e.createdAt),
        updatedAt: new Date(e.updatedAt),
      },
      update: {
        title: fromLocalizedText(e.title),
        description: fromLocalizedText(e.description),
        location: e.location,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
        eventStatus: e.eventStatus,
        status: e.status,
        updatedAt: new Date(e.updatedAt),
      },
    });
  }

  for (const a of seedArticles()) {
    await prisma.article.upsert({
      where: { id: a.id },
      create: {
        id: a.id,
        slug: a.slug,
        title: fromLocalizedText(a.title),
        summary: fromLocalizedText(a.summary),
        body: fromLocalizedText(a.body),
        coverImage: a.coverImage,
        publishedAt: a.publishedAt ? new Date(a.publishedAt) : null,
        category: a.category,
        status: a.status,
        createdAt: new Date(a.createdAt),
        updatedAt: new Date(a.updatedAt),
      },
      update: {
        slug: a.slug,
        title: fromLocalizedText(a.title),
        summary: fromLocalizedText(a.summary),
        body: fromLocalizedText(a.body),
        coverImage: a.coverImage,
        publishedAt: a.publishedAt ? new Date(a.publishedAt) : null,
        category: a.category,
        status: a.status,
        updatedAt: new Date(a.updatedAt),
      },
    });
  }

  for (const t of seedTeams()) {
    await prisma.teamProfile.upsert({
      where: { id: t.id },
      create: {
        id: t.id,
        title: fromLocalizedText(t.title),
        description: fromLocalizedText(t.description),
        category: fromTeamCategory(t.category),
        image: t.image,
        status: t.status,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt),
      },
      update: {
        title: fromLocalizedText(t.title),
        description: fromLocalizedText(t.description),
        category: fromTeamCategory(t.category),
        image: t.image,
        status: t.status,
        updatedAt: new Date(t.updatedAt),
      },
    });
  }

  for (const m of seedMedia()) {
    await prisma.mediaItem.upsert({
      where: { id: m.id },
      create: {
        id: m.id,
        title: fromLocalizedText(m.title),
        type: m.type,
        imageUrl: m.imageUrl ?? null,
        youtubeUrl: m.youtubeUrl ?? null,
        youtubeVideoId: m.youtubeVideoId ?? null,
        status: m.status,
        createdAt: new Date(m.createdAt),
        updatedAt: new Date(m.updatedAt),
      },
      update: {
        title: fromLocalizedText(m.title),
        type: m.type,
        imageUrl: m.imageUrl ?? null,
        status: m.status,
        updatedAt: new Date(m.updatedAt),
      },
    });
  }

  for (const p of seedPlayers()) {
    await prisma.player.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        title: fromLocalizedText(p.title),
        club: fromLocalizedText(p.club),
        category: fromLocalizedText(p.category),
        wilayaCode: p.wilayaCode,
        ranking: p.ranking,
        photoUrl: p.photoUrl,
        bio: fromLocalizedText(p.bio),
        achievements: fromLocalizedTextArray(p.achievements),
        status: p.status,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      },
      update: {
        title: fromLocalizedText(p.title),
        club: fromLocalizedText(p.club),
        category: fromLocalizedText(p.category),
        wilayaCode: p.wilayaCode,
        ranking: p.ranking,
        photoUrl: p.photoUrl,
        bio: fromLocalizedText(p.bio),
        achievements: fromLocalizedTextArray(p.achievements),
        status: p.status,
        updatedAt: new Date(p.updatedAt),
      },
    });
  }

  for (const o of seedOfficials()) {
    await prisma.official.upsert({
      where: { id: o.id },
      create: {
        id: o.id,
        title: fromLocalizedText(o.title),
        role: fromLocalizedText(o.role),
        region: fromLocalizedText(o.region),
        photoUrl: o.photoUrl ?? null,
        status: o.status,
        createdAt: new Date(o.createdAt),
        updatedAt: new Date(o.updatedAt),
      },
      update: {
        title: fromLocalizedText(o.title),
        role: fromLocalizedText(o.role),
        region: fromLocalizedText(o.region),
        status: o.status,
        updatedAt: new Date(o.updatedAt),
      },
    });
  }

  for (const m of seedMatches()) {
    await prisma.matchResult.upsert({
      where: { id: m.id },
      create: {
        id: m.id,
        title: fromLocalizedText(m.title),
        eventId: m.eventId,
        category: m.category,
        player1Name: fromLocalizedText(m.player1Name),
        player2Name: fromLocalizedText(m.player2Name),
        score: m.score,
        status: m.status,
        createdAt: new Date(m.createdAt),
        updatedAt: new Date(m.updatedAt),
      },
      update: {
        title: fromLocalizedText(m.title),
        eventId: m.eventId,
        player1Name: fromLocalizedText(m.player1Name),
        player2Name: fromLocalizedText(m.player2Name),
        score: m.score,
        status: m.status,
        updatedAt: new Date(m.updatedAt),
      },
    });
  }

  for (const s of seedSponsors()) {
    await prisma.sponsor.upsert({
      where: { id: s.id },
      create: {
        id: s.id,
        title: fromLocalizedText(s.title),
        tier: s.tier,
        logoUrl: s.logoUrl ?? null,
        websiteUrl: s.websiteUrl ?? null,
        status: s.status,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
      },
      update: {
        title: fromLocalizedText(s.title),
        tier: s.tier,
        status: s.status,
        updatedAt: new Date(s.updatedAt),
      },
    });
  }

  for (const c of seedClubs()) {
    await prisma.club.upsert({
      where: { id: c.id },
      create: {
        id: c.id,
        title: fromLocalizedText(c.title),
        wilayaCode: c.wilayaCode,
        city: c.city,
        members: c.members,
        founded: c.founded,
        phone: c.phone,
        email: c.email,
        logoUrl: c.logoUrl ?? null,
        status: c.status,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
      },
      update: {
        title: fromLocalizedText(c.title),
        wilayaCode: c.wilayaCode,
        city: c.city,
        members: c.members,
        status: c.status,
        updatedAt: new Date(c.updatedAt),
      },
    });
  }

  for (const y of seedArchiveYears()) {
    await prisma.archiveYear.upsert({
      where: { id: y.id },
      create: {
        id: y.id,
        year: y.year,
        count: y.count,
        status: y.status,
        createdAt: new Date(y.createdAt),
        updatedAt: new Date(y.updatedAt),
      },
      update: {
        year: y.year,
        count: y.count,
        status: y.status,
        updatedAt: new Date(y.updatedAt),
      },
    });
  }

  const settings = defaultSiteSettings();
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      heroTitle: fromLocalizedText(settings.heroTitle),
      heroTagline: fromLocalizedText(settings.heroTagline),
      defaultLang: settings.defaultLang,
      maintenanceMode: settings.maintenanceMode,
      maintenanceMessage: fromLocalizedText(settings.maintenanceMessage),
    },
    update: {},
  });

  const rankings = seedRankings();
  await prisma.rankingsSnapshot.upsert({
    where: { id: "default" },
    create: { id: "default", data: rankings as object },
    update: { data: rankings as object },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
