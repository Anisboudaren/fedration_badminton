"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { useI18n } from "@/i18n/I18nProvider";
import { pickLocalized } from "@/lib/data/site-data";
import type { Article } from "@/lib/admin/types";
import { assetUrl } from "@/lib/utils";
import hero from "@/assets/hero-badminton.jpg";
import news1 from "@/assets/hero-badminton.jpg";

function NewsPage({ initialArticles }: { initialArticles: Article[] }) {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<"all" | "national" | "international" | "youth">("all");
  const articles = initialArticles;
  const filtered = filter === "all" ? articles : articles.filter((a) => a.category === filter);
  const tabs = [
    { k: "all" as const, l: t.news.all },
    { k: "national" as const, l: t.news.national },
    { k: "international" as const, l: t.news.international },
    { k: "youth" as const, l: t.news.youth },
  ];

  return (
    <>
      <PageHero title={t.news.title} breadcrumb={t.news.breadcrumb} intro={t.news.intro} image={hero} />
      <section className="container-px py-14">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.k}
              onClick={() => setFilter(tab.k)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
                filter === tab.k ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.l}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <Link
              key={a.id}
              href={`/preview/article/${a.id }`}
              className="group overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  loading="lazy"
                  src={a.coverImage || assetUrl(news1)}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : ""}
                </span>
                <h3 className="mt-1 font-semibold leading-snug group-hover:text-primary transition">
                  {pickLocalized(a.title, lang)}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{pickLocalized(a.summary, lang)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default NewsPage;
