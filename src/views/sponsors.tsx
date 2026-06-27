"use client";

import { assetUrl } from "@/lib/utils";
import Link from "next/link";
import { Handshake } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { pickLocalized } from "@/lib/data/site-data";
import type { Sponsor } from "@/lib/admin/types";
import photoWide from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.01.webp";

const TIER_LABEL = {
  gold: { ar: "ذهبي", fr: "Or" },
  silver: { ar: "فضي", fr: "Argent" },
  bronze: { ar: "برونزي", fr: "Bronze" },
};

function SponsorsPage({ initialSponsors }: { initialSponsors: Sponsor[] }) {
  const { t, lang } = useI18n();
  const isFr = lang === "fr";

  const sponsors = initialSponsors;

  return (
    <>
      <PageHero
        title={isFr ? "Nos partenaires" : "شركاؤنا ورعاتنا"}
        breadcrumb={isFr ? "Accueil / Sponsors" : "الرئيسية / الرعاة"}
        image={photoWide}
      />

      <section className="container-px py-14">
        <Breadcrumb items={[{ label: t.nav.home, to: "/" }, { label: t.nav.sponsors }]} />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((s) => (
            <article
              key={s.id}
              className="flex flex-col items-center rounded-xl border bg-card p-8 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 grid h-20 w-full place-items-center rounded-lg bg-muted text-lg font-bold text-muted-foreground">
                {s.logoUrl ? <img src={s.logoUrl} alt="" className="max-h-16 object-contain" /> : pickLocalized(s.title, lang)}
              </div>
              <h3 className="font-semibold">{pickLocalized(s.title, lang)}</h3>
              <Badge
                className="mt-3"
                variant={s.tier === "gold" ? "default" : s.tier === "silver" ? "secondary" : "outline"}
              >
                {isFr ? TIER_LABEL[s.tier].fr : TIER_LABEL[s.tier].ar}
              </Badge>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30 py-14">
        <div className="container-px text-center">
          <Handshake className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 text-2xl font-bold">
            {isFr ? "Devenir partenaire" : "كن شريكًا"}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            {isFr
              ? "Soutenez le développement du badminton algérien et associez votre marque à la fédération nationale."
              : "ادعم تطوير الريشة الطائرة الجزائرية واربط علامتك التجارية بالاتحادية الوطنية."}
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link href="/contact">{isFr ? "Nous contacter" : "اتصل بنا"}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export default SponsorsPage;
