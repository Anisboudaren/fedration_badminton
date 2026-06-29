import type { RankingsData, RankingsPlayer, RankingsTeam } from "@/lib/admin/types";

export function computeRoundTotal(entry: Pick<RankingsPlayer, "j1" | "j2" | "j3">): number {
  return Number(entry.j1) + Number(entry.j2) + Number(entry.j3);
}

function sortPlayers(players: RankingsPlayer[]): RankingsPlayer[] {
  return players
    .map((p) => ({ ...p, total: computeRoundTotal(p) }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
}

function sortTeams(teams: RankingsTeam[]): RankingsTeam[] {
  return teams
    .map((t) => ({ ...t, total: computeRoundTotal(t) }))
    .sort((a, b) => b.total - a.total || a.club.localeCompare(b.club));
}

/** Recompute totals and order every category by total (highest first). */
export function sortRankingsData(data: RankingsData): RankingsData {
  return {
    ...data,
    categories: data.categories.map((cat) => {
      if (cat.id === "teams" && "teams" in cat) {
        return { ...cat, teams: sortTeams(cat.teams) };
      }
      if ("players" in cat) {
        return { ...cat, players: sortPlayers(cat.players) };
      }
      return cat;
    }),
  };
}
