import type { ApiCollection } from "@/lib/api/schemas";
import type {
  ArchiveYear,
  Article,
  Club,
  EventItem,
  FederationMemberItem,
  MatchResult,
  MediaItem,
  Official,
  Player,
  Sponsor,
  TeamProfile,
} from "@/lib/admin/types";
import {
  createArchiveYear,
  createClub,
  createMatch,
  createMedia,
  createTeam,
  deleteArchiveYear,
  deleteClub,
  deleteMatch,
  deleteMedia,
  deleteOfficial,
  deletePlayer,
  deleteSponsor,
  deleteTeam,
  listArchiveYears,
  listClubs,
  listMatches,
  listMedia,
  listOfficials,
  listPlayers,
  listSponsors,
  listTeams,
  updateArchiveYear,
  updateClub,
  updateMatch,
  updateMedia,
  updateTeam,
  upsertOfficial,
  upsertPlayer,
  upsertSponsor,
} from "@/lib/db/repositories/collections";
import {
  deleteFederationMember,
  listFederationMembers,
  upsertFederationMember,
} from "@/lib/db/repositories/about";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  listArticles,
  updateArticle,
} from "@/lib/db/repositories/articles";
import {
  deleteEvent,
  getEventById,
  listEvents,
  upsertEvent,
} from "@/lib/db/repositories/events";

export async function listCollection(collection: ApiCollection, publishedOnly = false) {
  switch (collection) {
    case "articles":
      return listArticles(publishedOnly);
    case "events":
      return listEvents(publishedOnly);
    case "teams":
      return listTeams(publishedOnly);
    case "media":
      return listMedia(publishedOnly);
    case "players":
      return listPlayers(publishedOnly);
    case "officials":
      return listOfficials(publishedOnly);
    case "federation-members":
      return listFederationMembers(publishedOnly);
    case "matches":
      return listMatches(publishedOnly);
    case "sponsors":
      return listSponsors(publishedOnly);
    case "clubs":
      return listClubs(publishedOnly);
    case "archive-years":
      return listArchiveYears(publishedOnly);
  }
}

export async function getCollectionItem(collection: ApiCollection, id: string) {
  switch (collection) {
    case "articles":
      return getArticleById(id);
    case "events":
      return getEventById(id);
    case "players":
      return listPlayers().then((items) => items.find((i) => i.id === id) ?? null);
    default:
      return listCollection(collection).then((items) => (items as { id: string }[]).find((i) => i.id === id) ?? null);
  }
}

export async function createCollectionItem(collection: ApiCollection, body: unknown) {
  const now = new Date().toISOString();
  const withTimestamps = { ...(body as object), createdAt: now, updatedAt: now };

  switch (collection) {
    case "articles":
      return createArticle(withTimestamps as Omit<Article, "id"> & { id?: string });
    case "events":
      return upsertEvent(withTimestamps as EventItem);
    case "teams":
      return createTeam(withTimestamps as Omit<TeamProfile, "id">);
    case "media":
      return createMedia(withTimestamps as Omit<MediaItem, "id">);
    case "players":
      return upsertPlayer(withTimestamps as Player);
    case "officials":
      return upsertOfficial(withTimestamps as Official);
    case "federation-members":
      return upsertFederationMember(withTimestamps as FederationMemberItem);
    case "matches":
      return createMatch(withTimestamps as Omit<MatchResult, "id">);
    case "sponsors":
      return upsertSponsor(withTimestamps as Sponsor);
    case "clubs":
      return createClub(withTimestamps as Omit<Club, "id">);
    case "archive-years":
      return createArchiveYear(withTimestamps as Omit<ArchiveYear, "id">);
  }
}

export async function updateCollectionItem(collection: ApiCollection, id: string, body: unknown) {
  const now = new Date().toISOString();
  const payload = { ...(body as object), id, updatedAt: now };

  switch (collection) {
    case "articles":
      return updateArticle(id, payload as Article);
    case "events":
      return upsertEvent(payload as EventItem);
    case "teams":
      return updateTeam(id, payload as TeamProfile);
    case "media":
      return updateMedia(id, payload as MediaItem);
    case "players":
      return upsertPlayer(payload as Player);
    case "officials":
      return upsertOfficial(payload as Official);
    case "federation-members":
      return upsertFederationMember(payload as FederationMemberItem);
    case "matches":
      return updateMatch(id, payload as MatchResult);
    case "sponsors":
      return upsertSponsor(payload as Sponsor);
    case "clubs":
      return updateClub(id, payload as Club);
    case "archive-years":
      return updateArchiveYear(id, payload as ArchiveYear);
  }
}

export async function deleteCollectionItem(collection: ApiCollection, id: string) {
  switch (collection) {
    case "articles":
      return deleteArticle(id);
    case "events":
      return deleteEvent(id);
    case "teams":
      return deleteTeam(id);
    case "media":
      return deleteMedia(id);
    case "players":
      return deletePlayer(id);
    case "officials":
      return deleteOfficial(id);
    case "federation-members":
      return deleteFederationMember(id);
    case "matches":
      return deleteMatch(id);
    case "sponsors":
      return deleteSponsor(id);
    case "clubs":
      return deleteClub(id);
    case "archive-years":
      return deleteArchiveYear(id);
  }
}
