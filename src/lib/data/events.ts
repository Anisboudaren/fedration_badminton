import type { EventItem } from "@/lib/admin/types";

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function dateOnly(iso: string): Date {
  const d = new Date(iso);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Events starting today or later, nearest first. */
export function eventsFromToday(events: EventItem[], limit?: number): EventItem[] {
  const today = startOfToday();
  const sorted = events
    .filter((e) => dateOnly(e.startDate) >= today)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return limit !== undefined ? sorted.slice(0, limit) : sorted;
}
