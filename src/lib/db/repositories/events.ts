import prisma from "@/lib/prisma";
import type { EventItem } from "@/lib/admin/types";
import { fromLocalizedText, mapEvent } from "@/lib/db/mappers";

function toEventDates(item: EventItem) {
  return {
    startDate: new Date(item.startDate),
    endDate: new Date(item.endDate),
  };
}

export async function listEvents(publishedOnly = false): Promise<EventItem[]> {
  const rows = await prisma.event.findMany({
    where: publishedOnly ? { status: "published" } : undefined,
    orderBy: { startDate: "desc" },
  });
  return rows.map(mapEvent);
}

export async function getEventById(id: string): Promise<EventItem | null> {
  const row = await prisma.event.findUnique({ where: { id } });
  return row ? mapEvent(row) : null;
}

export async function upsertEvent(item: EventItem): Promise<EventItem> {
  const dates = toEventDates(item);
  const row = await prisma.event.upsert({
    where: { id: item.id },
    create: {
      id: item.id,
      title: fromLocalizedText(item.title),
      description: fromLocalizedText(item.description),
      location: item.location,
      ...dates,
      eventStatus: item.eventStatus,
      status: item.status,
      createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
      updatedAt: new Date(item.updatedAt),
    },
    update: {
      title: fromLocalizedText(item.title),
      description: fromLocalizedText(item.description),
      location: item.location,
      ...dates,
      eventStatus: item.eventStatus,
      status: item.status,
      updatedAt: new Date(item.updatedAt),
    },
  });
  return mapEvent(row);
}

export async function deleteEvent(id: string): Promise<void> {
  await prisma.event.delete({ where: { id } });
}
