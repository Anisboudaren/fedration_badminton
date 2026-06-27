"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { listItems } from "@/lib/admin/content-store";
import type { Article } from "@/lib/admin/types";

function ArticlePreviewPage() {
  const params = useParams();
  const articleId = String(params.articleId ?? "");
  const { lang, dir, t } = useI18n();
  const [ready, setReady] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  useEffect(() => {
    const items = listItems("articles");
    setAllArticles(items);
    setArticle(items.find((x) => x.id === articleId) ?? null);
    setReady(true);
  }, [articleId]);

  if (!ready) {
    return <div className="container-px py-12 text-sm text-muted-foreground">Loading article...</div>;
  }

  if (!article) {
    return (
      <div className="container-px py-12">
        <p className="text-sm text-muted-foreground">Article not found.</p>
      </div>
    );
  }

  const title = article.title[lang] || article.title.en || article.title.fr || article.title.ar;
  const summary = article.summary[lang] || article.summary.en || article.summary.fr || article.summary.ar;
  const body = article.body[lang] || article.body.en || article.body.fr || article.body.ar;
  const recommended = allArticles
    .filter((x) => x.id !== article.id)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 5);

  return (
    <section className="container-px py-10">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/news">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t.news.readMore}
          </Link>
        </Button>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_320px]">
        <article
          className={`rounded-xl border bg-card p-6 md:p-8 ${
            dir === "rtl" ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={article.status === "published" ? "default" : "secondary"}>
              {article.status === "published" ? t.admin.status.published : t.admin.status.draft}
            </Badge>
            {article.publishedAt ? (
              <span className="text-xs text-muted-foreground">
                {t.admin.forms.publishDateTime}: {new Date(article.publishedAt).toLocaleString()}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-2xl md:text-3xl font-bold leading-tight">{title}</h1>
          {summary ? <p className="mt-3 text-muted-foreground">{summary}</p> : null}

          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={title || "Article cover"}
              className="mt-6 max-h-[460px] w-full rounded-lg object-cover"
            />
          ) : null}

          {body ? <p className="mt-6 whitespace-pre-wrap leading-7">{body}</p> : null}

          {article.sections.length > 0 ? (
            <div className="mt-8 space-y-8 border-t pt-8">
              {article.sections.map((section) => {
                const sectionTitle = section.title[lang] || section.title.en || section.title.fr || section.title.ar;
                const sectionBody = section.body[lang] || section.body.en || section.body.fr || section.body.ar;
                const imageTitle =
                  section.imageTitle[lang] || section.imageTitle.en || section.imageTitle.fr || section.imageTitle.ar;
                return (
                  <section key={section.id} className="space-y-3">
                    {sectionTitle ? <h2 className="text-xl font-semibold">{sectionTitle}</h2> : null}
                    {sectionBody ? <p className="whitespace-pre-wrap text-muted-foreground leading-7">{sectionBody}</p> : null}

                    {section.imageUrl ? (
                      <figure className="space-y-1.5">
                        <img
                          src={section.imageUrl}
                          alt={imageTitle || "Section image"}
                          className="max-h-96 w-full rounded-lg object-cover"
                        />
                        {imageTitle ? <figcaption className="text-xs text-muted-foreground">{imageTitle}</figcaption> : null}
                      </figure>
                    ) : null}

                    {section.videoUrl ? (
                      <div className="overflow-hidden rounded-lg border">
                        <iframe
                          title={sectionTitle || "Section video"}
                          className="aspect-video w-full"
                          src={toYouTubeEmbed(section.videoUrl)}
                          allowFullScreen
                        />
                      </div>
                    ) : null}
                  </section>
                );
              })}
            </div>
          ) : null}
        </article>

        <aside
          className={`h-fit rounded-xl border bg-card p-4 ${
            dir === "rtl" ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t.admin.forms.recommendedArticles}
          </h2>
          <div className="mt-3 space-y-2.5">
            {recommended.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t.admin.empty}</p>
            ) : (
              recommended.map((rec) => {
                const recTitle = rec.title[lang] || rec.title.en || rec.title.fr || rec.title.ar;
                return (
                  <Link
                    key={rec.id}
                    href={`/preview/article/${rec.id }`}
                    className="block rounded-md border p-3 hover:border-primary/50 hover:bg-muted/40 transition"
                  >
                    <p className="line-clamp-2 text-sm font-medium">{recTitle}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(rec.updatedAt).toLocaleDateString()}
                    </p>
                  </Link>
                );
              })
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

function toYouTubeEmbed(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/i);
  const videoId = match?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

export default ArticlePreviewPage;
