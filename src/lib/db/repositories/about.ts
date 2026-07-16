import prisma from "@/lib/prisma";
import type { AboutDocument, AboutOrgNode, AboutPageContent, FederationMemberItem } from "@/lib/admin/types";
import { defaultAboutPageContent } from "@/lib/data/about-defaults";
import {
  fromLocalizedText,
  mapAboutPageContent,
  mapFederationMember,
} from "@/lib/db/mappers";

function orgNodesToJson(nodes: AboutOrgNode[]) {
  return nodes.map((n) => ({
    id: n.id,
    title: { en: n.title.en, fr: n.title.fr, ar: n.title.ar },
    subtitle: { en: n.subtitle.en, fr: n.subtitle.fr, ar: n.subtitle.ar },
    imageUrl: n.imageUrl ?? "",
  }));
}

function documentsToJson(docs: AboutDocument[]) {
  return docs.map((d) => ({
    id: d.id,
    title: { en: d.title.en, fr: d.title.fr, ar: d.title.ar },
    subtitle: { en: d.subtitle.en, fr: d.subtitle.fr, ar: d.subtitle.ar },
    kind: d.kind,
    fileUrl: d.fileUrl ?? "",
    href: d.href ?? "",
  }));
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const row = await prisma.aboutPageContent.findUnique({ where: { id: "default" } });
  if (!row) return defaultAboutPageContent();
  return mapAboutPageContent(row);
}

export async function saveAboutPageContent(data: AboutPageContent): Promise<AboutPageContent> {
  const row = await prisma.aboutPageContent.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      heroTitle: fromLocalizedText(data.heroTitle),
      heroIntro: fromLocalizedText(data.heroIntro),
      heroImageUrl: data.heroImageUrl,
      missionTitle: fromLocalizedText(data.missionTitle),
      missionP1: fromLocalizedText(data.missionP1),
      missionP2: fromLocalizedText(data.missionP2),
      missionImageUrl: data.missionImageUrl,
      leadershipTitle: fromLocalizedText(data.leadershipTitle),
      leadershipIntro: fromLocalizedText(data.leadershipIntro),
      orgTitle: fromLocalizedText(data.orgTitle),
      orgNodes: orgNodesToJson(data.orgNodes),
      regulationsTitle: fromLocalizedText(data.regulationsTitle),
      regulationsIntro: fromLocalizedText(data.regulationsIntro),
      documentsTitle: fromLocalizedText(data.documentsTitle),
      documents: documentsToJson(data.documents),
    },
    update: {
      heroTitle: fromLocalizedText(data.heroTitle),
      heroIntro: fromLocalizedText(data.heroIntro),
      heroImageUrl: data.heroImageUrl,
      missionTitle: fromLocalizedText(data.missionTitle),
      missionP1: fromLocalizedText(data.missionP1),
      missionP2: fromLocalizedText(data.missionP2),
      missionImageUrl: data.missionImageUrl,
      leadershipTitle: fromLocalizedText(data.leadershipTitle),
      leadershipIntro: fromLocalizedText(data.leadershipIntro),
      orgTitle: fromLocalizedText(data.orgTitle),
      orgNodes: orgNodesToJson(data.orgNodes),
      regulationsTitle: fromLocalizedText(data.regulationsTitle),
      regulationsIntro: fromLocalizedText(data.regulationsIntro),
      documentsTitle: fromLocalizedText(data.documentsTitle),
      documents: documentsToJson(data.documents),
    },
  });
  return mapAboutPageContent(row);
}

export async function listFederationMembers(publishedOnly = false): Promise<FederationMemberItem[]> {
  const rows = await prisma.federationMember.findMany({
    where: publishedOnly ? { status: "published" } : undefined,
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });
  return rows.map(mapFederationMember);
}

export async function upsertFederationMember(item: FederationMemberItem): Promise<FederationMemberItem> {
  const row = await prisma.federationMember.upsert({
    where: { id: item.id },
    create: {
      id: item.id,
      firstName: fromLocalizedText(item.firstName),
      lastName: fromLocalizedText(item.lastName),
      role: fromLocalizedText(item.role),
      photoUrl: item.photoUrl,
      sortOrder: item.sortOrder,
      status: item.status,
      createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
      updatedAt: new Date(item.updatedAt),
    },
    update: {
      firstName: fromLocalizedText(item.firstName),
      lastName: fromLocalizedText(item.lastName),
      role: fromLocalizedText(item.role),
      photoUrl: item.photoUrl,
      sortOrder: item.sortOrder,
      status: item.status,
      updatedAt: new Date(item.updatedAt),
    },
  });
  return mapFederationMember(row);
}

export async function deleteFederationMember(id: string): Promise<void> {
  await prisma.federationMember.delete({ where: { id } });
}
