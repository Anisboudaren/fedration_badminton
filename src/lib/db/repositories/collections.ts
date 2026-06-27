import prisma from "@/lib/prisma";
import type {
  ArchiveYear,
  Club,
  MatchResult,
  MediaItem,
  Official,
  Player,
  Sponsor,
  TeamProfile,
} from "@/lib/admin/types";
import {
  fromLocalizedText,
  fromLocalizedTextArray,
  fromTeamCategory,
  mapArchiveYear,
  mapClub,
  mapMatch,
  mapMedia,
  mapOfficial,
  mapPlayer,
  mapSponsor,
  mapTeam,
  parseDate,
} from "@/lib/db/mappers";

// --- Teams ---

export async function listTeams(publishedOnly = false): Promise<TeamProfile[]> {
  const rows = await prisma.teamProfile.findMany({
    where: publishedOnly ? { status: "published" } : undefined,
    orderBy: { updatedAt: "desc" },
  });
  return rows.map(mapTeam);
}

export async function upsertTeam(item: TeamProfile): Promise<TeamProfile> {
  if (item.id) {
    return updateTeam(item.id, item);
  }
  return createTeam(item);
}

export async function createTeam(item: Omit<TeamProfile, "id">): Promise<TeamProfile> {
  const row = await prisma.teamProfile.create({
    data: {
      title: fromLocalizedText(item.title),
      description: fromLocalizedText(item.description),
      category: fromTeamCategory(item.category),
      image: item.image,
      status: item.status,
    },
  });
  return mapTeam(row);
}

export async function updateTeam(id: string, item: TeamProfile): Promise<TeamProfile> {
  const row = await prisma.teamProfile.update({
    where: { id },
    data: {
      title: fromLocalizedText(item.title),
      description: fromLocalizedText(item.description),
      category: fromTeamCategory(item.category),
      image: item.image,
      status: item.status,
      updatedAt: new Date(item.updatedAt),
    },
  });
  return mapTeam(row);
}

export async function deleteTeam(id: string): Promise<void> {
  await prisma.teamProfile.delete({ where: { id } });
}

// --- Media ---

export async function listMedia(publishedOnly = false): Promise<MediaItem[]> {
  const rows = await prisma.mediaItem.findMany({
    where: publishedOnly ? { status: "published" } : undefined,
    orderBy: { updatedAt: "desc" },
  });
  return rows.map(mapMedia);
}

export async function createMedia(item: Omit<MediaItem, "id">): Promise<MediaItem> {
  const row = await prisma.mediaItem.create({
    data: {
      title: fromLocalizedText(item.title),
      type: item.type,
      imageUrl: item.imageUrl ?? null,
      youtubeUrl: item.youtubeUrl ?? null,
      youtubeVideoId: item.youtubeVideoId ?? null,
      status: item.status,
    },
  });
  return mapMedia(row);
}

export async function updateMedia(id: string, item: MediaItem): Promise<MediaItem> {
  const row = await prisma.mediaItem.update({
    where: { id },
    data: {
      title: fromLocalizedText(item.title),
      type: item.type,
      imageUrl: item.imageUrl ?? null,
      youtubeUrl: item.youtubeUrl ?? null,
      youtubeVideoId: item.youtubeVideoId ?? null,
      status: item.status,
      updatedAt: new Date(item.updatedAt),
    },
  });
  return mapMedia(row);
}

export async function deleteMedia(id: string): Promise<void> {
  await prisma.mediaItem.delete({ where: { id } });
}

// --- Players ---

export async function listPlayers(publishedOnly = false): Promise<Player[]> {
  const rows = await prisma.player.findMany({
    where: publishedOnly ? { status: "published" } : undefined,
    orderBy: { ranking: "asc" },
  });
  return rows.map(mapPlayer);
}

export async function getPlayerById(id: string): Promise<Player | null> {
  const row = await prisma.player.findUnique({ where: { id } });
  return row ? mapPlayer(row) : null;
}

export async function upsertPlayer(item: Player): Promise<Player> {
  const row = await prisma.player.upsert({
    where: { id: item.id },
    create: {
      id: item.id,
      title: fromLocalizedText(item.title),
      club: fromLocalizedText(item.club),
      category: fromLocalizedText(item.category),
      wilayaCode: item.wilayaCode,
      ranking: item.ranking,
      photoUrl: item.photoUrl,
      bio: fromLocalizedText(item.bio),
      achievements: fromLocalizedTextArray(item.achievements),
      status: item.status,
      createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
      updatedAt: new Date(item.updatedAt),
    },
    update: {
      title: fromLocalizedText(item.title),
      club: fromLocalizedText(item.club),
      category: fromLocalizedText(item.category),
      wilayaCode: item.wilayaCode,
      ranking: item.ranking,
      photoUrl: item.photoUrl,
      bio: fromLocalizedText(item.bio),
      achievements: fromLocalizedTextArray(item.achievements),
      status: item.status,
      updatedAt: new Date(item.updatedAt),
    },
  });
  return mapPlayer(row);
}

export async function deletePlayer(id: string): Promise<void> {
  await prisma.player.delete({ where: { id } });
}

// --- Officials ---

export async function listOfficials(publishedOnly = false): Promise<Official[]> {
  const rows = await prisma.official.findMany({
    where: publishedOnly ? { status: "published" } : undefined,
    orderBy: { updatedAt: "desc" },
  });
  return rows.map(mapOfficial);
}

export async function upsertOfficial(item: Official): Promise<Official> {
  const row = await prisma.official.upsert({
    where: { id: item.id },
    create: {
      id: item.id,
      title: fromLocalizedText(item.title),
      role: fromLocalizedText(item.role),
      region: fromLocalizedText(item.region),
      photoUrl: item.photoUrl ?? null,
      certificationLevel: item.certificationLevel ?? null,
      status: item.status,
      createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
      updatedAt: new Date(item.updatedAt),
    },
    update: {
      title: fromLocalizedText(item.title),
      role: fromLocalizedText(item.role),
      region: fromLocalizedText(item.region),
      photoUrl: item.photoUrl ?? null,
      certificationLevel: item.certificationLevel ?? null,
      status: item.status,
      updatedAt: new Date(item.updatedAt),
    },
  });
  return mapOfficial(row);
}

export async function deleteOfficial(id: string): Promise<void> {
  await prisma.official.delete({ where: { id } });
}

// --- Matches ---

export async function listMatches(publishedOnly = false, eventId?: string): Promise<MatchResult[]> {
  const rows = await prisma.matchResult.findMany({
    where: {
      ...(publishedOnly ? { status: "published" } : {}),
      ...(eventId ? { eventId } : {}),
    },
    orderBy: { updatedAt: "desc" },
  });
  return rows.map(mapMatch);
}

export async function createMatch(item: Omit<MatchResult, "id">): Promise<MatchResult> {
  const row = await prisma.matchResult.create({
    data: {
      title: fromLocalizedText(item.title),
      eventId: item.eventId,
      category: item.category,
      player1Name: fromLocalizedText(item.player1Name),
      player2Name: fromLocalizedText(item.player2Name),
      score: item.score,
      stage: item.stage ?? null,
      playedAt: parseDate(item.playedAt),
      status: item.status,
    },
  });
  return mapMatch(row);
}

export async function updateMatch(id: string, item: MatchResult): Promise<MatchResult> {
  const row = await prisma.matchResult.update({
    where: { id },
    data: {
      title: fromLocalizedText(item.title),
      eventId: item.eventId,
      category: item.category,
      player1Name: fromLocalizedText(item.player1Name),
      player2Name: fromLocalizedText(item.player2Name),
      score: item.score,
      stage: item.stage ?? null,
      playedAt: parseDate(item.playedAt),
      status: item.status,
      updatedAt: new Date(item.updatedAt),
    },
  });
  return mapMatch(row);
}

export async function deleteMatch(id: string): Promise<void> {
  await prisma.matchResult.delete({ where: { id } });
}

// --- Sponsors ---

export async function listSponsors(publishedOnly = false): Promise<Sponsor[]> {
  const rows = await prisma.sponsor.findMany({
    where: publishedOnly ? { status: "published" } : undefined,
    orderBy: { updatedAt: "desc" },
  });
  return rows.map(mapSponsor);
}

export async function upsertSponsor(item: Sponsor): Promise<Sponsor> {
  const row = await prisma.sponsor.upsert({
    where: { id: item.id },
    create: {
      id: item.id,
      title: fromLocalizedText(item.title),
      tier: item.tier,
      logoUrl: item.logoUrl ?? null,
      websiteUrl: item.websiteUrl ?? null,
      status: item.status,
      createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
      updatedAt: new Date(item.updatedAt),
    },
    update: {
      title: fromLocalizedText(item.title),
      tier: item.tier,
      logoUrl: item.logoUrl ?? null,
      websiteUrl: item.websiteUrl ?? null,
      status: item.status,
      updatedAt: new Date(item.updatedAt),
    },
  });
  return mapSponsor(row);
}

export async function deleteSponsor(id: string): Promise<void> {
  await prisma.sponsor.delete({ where: { id } });
}

// --- Clubs ---

export async function listClubs(publishedOnly = false): Promise<Club[]> {
  const rows = await prisma.club.findMany({
    where: publishedOnly ? { status: "published" } : undefined,
    orderBy: { updatedAt: "desc" },
  });
  return rows.map(mapClub);
}

export async function createClub(item: Omit<Club, "id">): Promise<Club> {
  const row = await prisma.club.create({
    data: {
      title: fromLocalizedText(item.title),
      wilayaCode: item.wilayaCode,
      city: item.city,
      members: item.members,
      founded: item.founded,
      phone: item.phone,
      email: item.email,
      logoUrl: item.logoUrl ?? null,
      status: item.status,
    },
  });
  return mapClub(row);
}

export async function updateClub(id: string, item: Club): Promise<Club> {
  const row = await prisma.club.update({
    where: { id },
    data: {
      title: fromLocalizedText(item.title),
      wilayaCode: item.wilayaCode,
      city: item.city,
      members: item.members,
      founded: item.founded,
      phone: item.phone,
      email: item.email,
      logoUrl: item.logoUrl ?? null,
      status: item.status,
      updatedAt: new Date(item.updatedAt),
    },
  });
  return mapClub(row);
}

export async function deleteClub(id: string): Promise<void> {
  await prisma.club.delete({ where: { id } });
}

// --- Archive years ---

export async function listArchiveYears(publishedOnly = false): Promise<ArchiveYear[]> {
  const rows = await prisma.archiveYear.findMany({
    where: publishedOnly ? { status: "published" } : undefined,
    orderBy: { year: "desc" },
  });
  return rows.map(mapArchiveYear);
}

export async function createArchiveYear(item: Omit<ArchiveYear, "id">): Promise<ArchiveYear> {
  const row = await prisma.archiveYear.create({
    data: {
      year: item.year,
      count: item.count,
      status: item.status,
    },
  });
  return mapArchiveYear(row);
}

export async function updateArchiveYear(id: string, item: ArchiveYear): Promise<ArchiveYear> {
  const row = await prisma.archiveYear.update({
    where: { id },
    data: {
      year: item.year,
      count: item.count,
      status: item.status,
      updatedAt: new Date(item.updatedAt),
    },
  });
  return mapArchiveYear(row);
}

export async function deleteArchiveYear(id: string): Promise<void> {
  await prisma.archiveYear.delete({ where: { id } });
}
