"use client";

import { assetUrl, type AssetImport } from "@/lib/utils";
import Link from "next/link";
import { useState, type ComponentType } from "react";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Trophy,
  Users,
  Newspaper,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { pickLocalized } from "@/lib/data/site-data";
import type { HomePageData } from "@/lib/data/site-data.server";
import { cmsImageUrl } from "@/lib/storage/blob-url";
import { sortSponsorsByTier } from "@/lib/data/sponsors";
import { BidiText, LtrNum } from "@/components/ui/bidi-text";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LOGO_DARK_TEXT, LOGO_WHITE_TEXT } from "@/lib/brand-logos";
import heroBg from "@/assets/hero-badminton.jpg";

import brandTogether from "@/assets/branded images/ABF together we play.webp";
import brandAbf1 from "@/assets/branded images/ABF 1.webp";
import brandAbf2 from "@/assets/branded images/ABF 2.webp";
import brandAbf3 from "@/assets/branded images/ABF 3.webp";

import photoAction1 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.48.webp";
import photoAction2 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.02.webp";
import photoAction3 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.06.webp";
import photoCourt1 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.42.webp";
import photoCourt2 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.51.webp";
import photoCourt3 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.03.webp";
import photoPlayer1 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.47.webp";
import photoPlayer2 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.05.webp";
import photoPlayer3 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.49.webp";
import photoWide from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.01.webp";

function BrandedBanner({ src }: { src: AssetImport }) {
  return (
    <section className="container-px py-8 md:py-10">
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/30 shadow-sm">
        <img src={assetUrl(src)} alt="" className="mx-auto w-full object-contain" loading="lazy" />
      </div>
    </section>
  );
}

function PhotoGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <p className="text-center text-sm text-white/60">
        —
      </p>
    );
  }

  const show = (i: number) => {
    setActive(i);
    setOpen(true);
  };

  const prev = () => setActive((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActive((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => show(i)}
            className="group relative overflow-hidden rounded-xl ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              loading="lazy"
              src={images[i]}
              alt=""
              className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
              <ZoomIn className="h-6 w-6 text-white opacity-0 transition group-hover:opacity-100" />
            </span>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[95vh] max-w-[min(95vw,1200px)] border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={prev}
              className="absolute start-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>

            <img
              src={images[active]}
              alt=""
              className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain"
            />

            <button
              type="button"
              onClick={next}
              className="absolute end-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute end-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
function SectionHeader({
  title,
  href,
  linkLabel,
  icon: Icon,
}: {
  title: string;
  href: string;
  linkLabel: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h2 className="section-title">{title}</h2>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary transition hover:border-primary/40 hover:bg-primary/10"
      >
        <Icon className="h-3.5 w-3.5" />
        {linkLabel}
        <ArrowRight className="h-3 w-3 rtl:rotate-180" />
      </Link>
    </div>
  );
}

function Home({ initialData }: { initialData: HomePageData }) {
  const { t, lang } = useI18n();
  const hero = {
    title: pickLocalized(initialData.settings.heroTitle, lang),
    tagline: pickLocalized(initialData.settings.heroTagline, lang),
  };

  const dateLocale = lang === "ar" ? "ar-DZ" : lang === "fr" ? "fr-FR" : "en-GB";

  const news = initialData.articles.slice(0, 3).map((a) => ({
    img: cmsImageUrl(a.coverImage, photoAction1),
    title: a.title,
    date: a.publishedAt
      ? new Date(a.publishedAt).toLocaleDateString(dateLocale, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "",
    id: a.id,
  }));

  const events = initialData.upcomingEvents.map((e) => {
    const start = new Date(e.startDate);
    const end = new Date(e.endDate);
    return {
      day: String(start.getDate()).padStart(2, "0"),
      month: start.getMonth(),
      title: e.title,
      range: `${start.getDate()} – ${end.getDate()}`,
      loc: e.location,
    };
  });

  const teamFallbacks = [photoAction3, photoPlayer2, photoAction2, photoPlayer3];
  const teams = initialData.teams.slice(0, 4).map((tm, i) => ({
    img: cmsImageUrl(tm.image, teamFallbacks[i]),
    title: pickLocalized(tm.title, lang),
    id: tm.id,
  }));

  const gallery = initialData.media
    .filter((m) => m.type === "image" && m.imageUrl)
    .map((m) => cmsImageUrl(m.imageUrl!))
    .slice(0, 8);

  const sponsors = sortSponsorsByTier(initialData.sponsors);
  const matchResults = initialData.matchResults.slice(0, 6);

  return (
    <>
      {/* HERO — full viewport, centered logo, header overlays via fixed transparent nav */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-footer">
        <img src={assetUrl(heroBg)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-footer/92 via-footer/70 to-footer/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-footer/85 via-footer/40 to-footer/60 rtl:bg-gradient-to-l" />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.42 0.13 152 / 0.35) 0%, transparent 50%), radial-gradient(circle at 80% 30%, oklch(0.6 0.22 28 / 0.2) 0%, transparent 45%)",
          }}
        />

        <div className="relative z-10 container-px flex w-full flex-col items-center px-4 pb-16 pt-28 text-center text-white sm:pt-32 md:pt-36">
          <img
            src={LOGO_WHITE_TEXT}
            alt="ABF"
            className="h-36 w-auto max-w-[min(92vw,420px)] drop-shadow-2xl sm:h-44 md:h-52 lg:h-60"
          />
          <h1 className="mt-8 max-w-3xl text-xl font-bold leading-snug sm:text-2xl md:text-3xl lg:text-4xl">
            {hero.title || t.hero.title}
          </h1>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark sm:text-sm"
          >
            {t.hero.cta}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        <a
          href="#home-content"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("home-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full px-3 py-1 text-white/75 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label={t.hero.scrollHint}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">{t.hero.scrollHint}</span>
          <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1">
            <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
          </span>
        </a>
      </section>

      {/* NEWS (2/3) + EVENTS (1/3) */}
      <section id="home-content" className="container-px scroll-mt-24 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch lg:gap-0">
          <div className="flex flex-col border-b border-border/70 pb-8 lg:col-span-2 lg:border-b-0 lg:border-e lg:pb-0 lg:pe-8">
            <SectionHeader title={t.sections.news} href="/news" linkLabel={t.sections.newsAll} icon={Newspaper} />

            <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1">
              {news.length === 0 ? (
                <p className="col-span-full text-sm text-muted-foreground">{t.news.all}</p>
              ) : (
                news.map((n) => (
                  <Link
                    key={n.id}
                    href={`/preview/article/${n.id}`}
                    className="group flex h-full min-h-[240px] flex-col overflow-hidden rounded-lg border border-border/60 bg-card shadow-sm transition hover:border-primary/25 hover:shadow-md sm:min-h-[260px] lg:min-h-0"
                  >
                    <div className="min-h-[140px] flex-[1.35] overflow-hidden bg-muted sm:min-h-[150px]">
                      <img
                        loading="lazy"
                        src={n.img}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-4">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">{n.date}</span>
                      <h3 className="mt-1.5 line-clamp-3 text-sm font-semibold leading-snug transition group-hover:text-primary">
                        {pickLocalized(n.title, lang)}
                      </h3>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col lg:ps-8">
            <SectionHeader title={t.sections.events} href="/events" linkLabel={t.sections.eventsAll} icon={Calendar} />

            <div className="flex flex-1 flex-col justify-start space-y-3">
              {events.length === 0 ? (
                <p className="text-sm text-muted-foreground">—</p>
              ) : (
                events.map((e, i) => (
                  <Link
                    key={i}
                    href="/events"
                  className="group relative block overflow-hidden rounded-lg border border-border/60 bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="absolute inset-y-0 start-0 w-1 bg-primary transition-all group-hover:w-1.5" />
                  <div className="flex gap-3 p-3.5">
                    <div className="flex h-12 w-12 shrink-0 flex-col-reverse items-center justify-center rounded-lg bg-primary text-white shadow-sm">
                      <span className="text-lg font-bold leading-none text-white">
                        <LtrNum value={e.day} />
                      </span>
                      <span className="mb-0.5 text-[8px] font-bold uppercase leading-none tracking-wider text-white/90">
                        {t.months[e.month]}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold leading-snug transition group-hover:text-primary">
                        {pickLocalized(e.title, lang)}
                      </h4>
                      <div className="mt-1.5 space-y-0.5">
                        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Calendar className="h-3 w-3 shrink-0 text-primary/70" />
                          <BidiText text={`${e.range} ${t.months[e.month]}`} />
                        </p>
                        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0 text-primary/70" />
                          <span className="truncate">{e.loc}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <BrandedBanner src={brandAbf1} />

      {/* MATCH RESULTS — full width */}
      <section className="bg-muted/20 py-12 md:py-16">
        <div className="container-px">
          <SectionHeader title={t.sections.results} href="/events" linkLabel={t.competitions.seeResults} icon={Trophy} />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matchResults.length === 0 ? (
              <p className="col-span-full text-sm text-muted-foreground">—</p>
            ) : (
              matchResults.map((r, i) => (
              <div
                key={r.id ?? i}
                className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:border-primary/25 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10">
                    <Trophy className="h-4 w-4 text-primary" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {pickLocalized(r.title, lang)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1 text-end">
                    <p className="truncate text-sm font-semibold">{pickLocalized(r.player1Name, lang)}</p>
                  </div>
                  <div className="shrink-0 rounded-full bg-muted px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    vs
                  </div>
                  <div className="min-w-0 flex-1 text-start">
                    <p className="truncate text-sm font-semibold">{pickLocalized(r.player2Name, lang)}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-primary/5 py-2.5 text-center">
                  <LtrNum value={r.score} className="font-mono text-sm font-bold tracking-wide text-primary" />
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </section>

      <BrandedBanner src={brandAbf2} />

      {/* NATIONAL TEAMS */}
      <section className="container-px py-14 md:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="section-title">{t.sections.teams}</h2>
          <Link
            href="/clubs"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary transition hover:border-primary/40 hover:bg-primary/10"
          >
            <Users className="h-3.5 w-3.5" />
            {t.sections.teamsAll}
            <ArrowRight className="h-3 w-3 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teams.length === 0 ? (
            <p className="col-span-full text-sm text-muted-foreground">—</p>
          ) : (
            teams.map((tm) => (
              <Link
                key={tm.id}
                href="/clubs"
                className="group relative aspect-[3/4] overflow-hidden rounded-xl shadow-md"
              >
                <img
                  loading="lazy"
                  src={tm.img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-footer/90 via-footer/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                    {tm.title}
                    <ArrowRight className="h-3 w-3 opacity-70 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      <BrandedBanner src={brandAbf3} />

      {/* PARTNERS */}
      <section className="border-t border-border bg-muted/40">
        <div className="container-px py-10 md:py-12">
          <h2 className="section-title mb-6">{t.sections.partners}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
            {sponsors.length === 0 ? (
              <p className="col-span-full text-sm text-muted-foreground">—</p>
            ) : (
              sponsors.map((p) => {
                const logo = p.logoUrl ? cmsImageUrl(p.logoUrl) : null;
                const label = pickLocalized(p.title, lang);
                const inner = (
                  <>
                    {logo ? (
                      <img src={logo} alt={label} className="max-h-10 max-w-full object-contain px-2 md:max-h-12" />
                    ) : (
                      <span className="px-2 text-center text-xs font-bold">{label}</span>
                    )}
                  </>
                );

                const className =
                  "flex h-14 items-center justify-center rounded-lg border border-border/80 bg-background shadow-sm transition hover:border-primary/30 hover:shadow-md md:h-16";

                return p.websiteUrl ? (
                  <a
                    key={p.id}
                    href={p.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    title={label}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={p.id} className={className} title={label}>
                    {inner}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <BrandedBanner src={brandTogether} />

      {/* PHOTO GALLERY — grid with zoom, flush to footer */}
      <section className="bg-footer pt-10 md:pt-14">
        <div className="container-px pb-10 md:pb-12">
          <h2 className="section-title mb-6 text-white">{t.sections.gallery}</h2>
          <PhotoGallery images={gallery} />
        </div>
      </section>
    </>
  );
}

export default Home;
