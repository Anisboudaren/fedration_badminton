"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import type { Article } from "@/lib/admin/types";
import { pickLocalized } from "@/lib/data/site-data";

function ArticlePreviewPage({
  initialArticle,
  initialArticles,
}: {
  initialArticle: Article | null;
  initialArticles: Article[];
}) {
  const { lang, dir, t } = useI18n();
  const article = initialArticle;
  const allArticles = initialArticles;

  if (!article) {
    return (
      <div className="container-px py-12">
        <p className="text-sm text-muted-foreground">Article not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/admin/articles">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>
    );
  }

  const related = allArticles.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);

  return (
    <article className="pb-16" dir={dir}>
      <div className="relative h-[min(50vh,420px)] overflow-hidden bg-muted">
        {article.coverImage ? (
          <img src={article.coverImage} alt="" className="h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 container-px pb-8">
          <Badge variant="secondary" className="mb-3">
            {article.category}
          </Badge>
          <h1 className="max-w-3xl font-display text-2xl font-bold md:text-4xl">
            {pickLocalized(article.title, lang)}
          </h1>
          {article.publishedAt ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          ) : null}
        </div>
      </div>

      <div className="container-px py-10">
        <Button asChild variant="ghost" size="sm" className="mb-6 -ms-2">
          <Link href="/admin/articles">
            <ArrowLeft className="h-4 w-4" />
            {t.admin.actions.backToList}
          </Link>
        </Button>

        <p className="max-w-3xl text-lg text-muted-foreground">{pickLocalized(article.summary, lang)}</p>
        <div className="prose prose-neutral mt-8 max-w-3xl dark:prose-invert">
          <p className="whitespace-pre-wrap">{pickLocalized(article.body, lang)}</p>
        </div>

        {article.sections.map((section) => (
          <section key={section.id} className="mt-10 max-w-3xl border-t pt-8">
            <h2 className="font-display text-xl font-bold">{pickLocalized(section.title, lang)}</h2>
            <p className="mt-3 whitespace-pre-wrap text-muted-foreground">{pickLocalized(section.body, lang)}</p>
            {section.imageUrl ? (
              <figure className="mt-4">
                <img src={section.imageUrl} alt={pickLocalized(section.imageTitle, lang)} className="rounded-lg" />
                {pickLocalized(section.imageTitle, lang) ? (
                  <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                    {pickLocalized(section.imageTitle, lang)}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
            {section.videoUrl ? (
              <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-muted">
                <iframe
                  src={section.videoUrl.replace("watch?v=", "embed/")}
                  title={pickLocalized(section.title, lang)}
                  className="h-full w-full"
                  allowFullScreen
                />
              </div>
            ) : null}
          </section>
        ))}

        {related.length > 0 ? (
          <div className="mt-16 border-t pt-10">
            <h3 className="font-display text-lg font-bold">{t.news.title}</h3>
            <ul className="mt-4 space-y-2">
              {related.map((a) => (
                <li key={a.id}>
                  <Link href={`/preview/article/${a.id}`} className="text-primary hover:underline">
                    {pickLocalized(a.title, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default ArticlePreviewPage;
