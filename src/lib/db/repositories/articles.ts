import prisma from "@/lib/prisma";
import type { Article, ArticleSection } from "@/lib/admin/types";
import { fromLocalizedText, mapArticle, parseDate } from "@/lib/db/mappers";

const articleInclude = { sections: { orderBy: { sortOrder: "asc" as const } } };

export async function listArticles(publishedOnly = false): Promise<Article[]> {
  const rows = await prisma.article.findMany({
    where: publishedOnly ? { status: "published" } : undefined,
    include: articleInclude,
    orderBy: { updatedAt: "desc" },
  });
  return rows.map(mapArticle);
}

export async function getArticleById(id: string): Promise<Article | null> {
  const row = await prisma.article.findUnique({ where: { id }, include: articleInclude });
  return row ? mapArticle(row) : null;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const row = await prisma.article.findUnique({ where: { slug }, include: articleInclude });
  return row ? mapArticle(row) : null;
}

function sectionData(s: ArticleSection, sortOrder: number) {
  return {
    id: s.id || undefined,
    title: fromLocalizedText(s.title),
    body: fromLocalizedText(s.body),
    imageUrl: s.imageUrl ?? null,
    imageTitle: fromLocalizedText(s.imageTitle),
    videoUrl: s.videoUrl ?? null,
    sortOrder,
  };
}

export async function createArticle(item: Omit<Article, "id"> & { id?: string }): Promise<Article> {
  const sections = item.sections ?? [];
  const row = await prisma.article.create({
    data: {
      id: item.id || undefined,
      slug: item.slug,
      title: fromLocalizedText(item.title),
      summary: fromLocalizedText(item.summary),
      body: fromLocalizedText(item.body),
      coverImage: item.coverImage,
      publishedAt: parseDate(item.publishedAt),
      category: item.category,
      status: item.status,
      createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
      updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
      sections: { create: sections.map((s, i) => sectionData(s, i)) },
    },
    include: articleInclude,
  });
  return mapArticle(row);
}

export async function updateArticle(id: string, item: Article): Promise<Article> {
  const sections = item.sections ?? [];
  await prisma.articleSection.deleteMany({ where: { articleId: id } });
  const row = await prisma.article.update({
    where: { id },
    data: {
      slug: item.slug,
      title: fromLocalizedText(item.title),
      summary: fromLocalizedText(item.summary),
      body: fromLocalizedText(item.body),
      coverImage: item.coverImage,
      publishedAt: parseDate(item.publishedAt),
      category: item.category,
      status: item.status,
      updatedAt: new Date(item.updatedAt),
      sections: {
        create: sections.map((s, i) => sectionData(s, i)),
      },
    },
    include: articleInclude,
  });
  return mapArticle(row);
}

export async function deleteArticle(id: string): Promise<void> {
  await prisma.article.delete({ where: { id } });
}
