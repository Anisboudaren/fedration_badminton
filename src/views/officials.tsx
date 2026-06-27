"use client";

import { assetUrl } from "@/lib/utils";

import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/I18nProvider";
import { pickLocalized } from "@/lib/data/site-data";
import type { Official } from "@/lib/admin/types";
import photo2 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.02.webp";

function OfficialsPage({ initialOfficials }: { initialOfficials: Official[] }) {
  const { t, lang } = useI18n();
  const isFr = lang === "fr";
  const [role, setRole] = useState("all");
  const [region, setRegion] = useState("all");

  const officials = initialOfficials;

  return (
    <>
      <PageHero
        title={isFr ? "Officiels techniques" : "الحكام والمسؤولون التقنيون"}
        breadcrumb={isFr ? "Accueil / Officiels" : "الرئيسية / الحكام"}
        image={photo2}
      />

      <section className="container-px py-14">
        <Breadcrumb items={[{ label: t.nav.home, to: "/" }, { label: t.nav.officials }]} />

        <div className="mt-8 flex flex-wrap gap-3">
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={isFr ? "Rôle" : "الصفة"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isFr ? "Tous les rôles" : "كل الصفات"}</SelectItem>
              <SelectItem value="intl">{isFr ? "International" : "دولي"}</SelectItem>
              <SelectItem value="nat">{isFr ? "National" : "وطني"}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={isFr ? "Région" : "الولاية"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isFr ? "Toutes les régions" : "كل الولايات"}</SelectItem>
              <SelectItem value="alger">{isFr ? "Alger" : "الجزائر"}</SelectItem>
              <SelectItem value="oran">{isFr ? "Oran" : "وهران"}</SelectItem>
            </SelectContent>
          </Select>
          <Input className="max-w-xs" placeholder={isFr ? "Rechercher..." : "بحث..."} />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {officials.map((o) => (
            <article
              key={o.id}
              className="overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[4/3] bg-muted grid place-items-center text-muted-foreground text-sm">
                {isFr ? "Photo" : "صورة"}
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{pickLocalized(o.title, lang)}</h3>
                <Badge variant="secondary" className="mt-2">
                  {pickLocalized(o.role, lang)}
                </Badge>
                <p className="mt-2 text-xs text-muted-foreground">{pickLocalized(o.region, lang)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default OfficialsPage;
