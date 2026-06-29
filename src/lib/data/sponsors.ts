import type { Sponsor, SponsorTier } from "@/lib/admin/types";

const TIER_ORDER: Record<SponsorTier, number> = {
  gold: 0,
  silver: 1,
  bronze: 2,
};

export function sortSponsorsByTier(sponsors: Sponsor[]): Sponsor[] {
  return [...sponsors].sort((a, b) => {
    const tierDiff = TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
    if (tierDiff !== 0) return tierDiff;
    return pickSponsorTitle(a).localeCompare(pickSponsorTitle(b));
  });
}

function pickSponsorTitle(sponsor: Sponsor): string {
  return sponsor.title.en || sponsor.title.fr || sponsor.title.ar || sponsor.id;
}
