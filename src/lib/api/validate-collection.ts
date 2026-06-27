import {
  articleSchema,
  archiveYearSchema,
  clubSchema,
  eventSchema,
  matchSchema,
  mediaSchema,
  officialSchema,
  playerSchema,
  sponsorSchema,
  teamSchema,
  type ApiCollection,
} from "@/lib/api/schemas";

const schemaMap = {
  articles: articleSchema,
  events: eventSchema,
  teams: teamSchema,
  media: mediaSchema,
  players: playerSchema,
  officials: officialSchema,
  matches: matchSchema,
  sponsors: sponsorSchema,
  clubs: clubSchema,
  "archive-years": archiveYearSchema,
} as const;

export function validateCollectionBody(collection: ApiCollection, body: unknown) {
  const schema = schemaMap[collection];
  return schema.safeParse(body);
}
