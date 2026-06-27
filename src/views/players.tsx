"use client";

import { assetUrl } from "@/lib/utils";
import Link from "next/link";
import { Search } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/I18nProvider";
import { getPlayers, getPlayerById, pickLocalized } from "@/lib/data/site-data";
import { WILAYAS } from "@/lib/data/wilayas";
import photo1 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.48.webp";

function PlayersPage() {
  const { t, lang } = useI18n();
  const isFr = lang === "fr";

  const players = getPlayers();

  return (
    <>
      <PageHero
        title={isFr ? "Joueurs licenciés" : "اللاعبون المرخصون"}
        breadcrumb={isFr ? "Accueil / Joueurs" : "الرئيسية / اللاعبون"}
        image={photo1}
      />

      <section className="container-px py-14">
        <Breadcrumb items={[{ label: t.nav.home, to: "/" }, { label: t.nav.players }]} />

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="relative min-w-[220px] flex-1 max-w-md">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="ps-9" placeholder={isFr ? "Rechercher un joueur..." : "ابحث عن لاعب..."} />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={isFr ? "Catégorie" : "الصنف"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isFr ? "Toutes" : "الكل"}</SelectItem>
              <SelectItem value="senior">{isFr ? "Seniors" : "أكابر"}</SelectItem>
              <SelectItem value="junior">{isFr ? "Juniors" : "أصاغر"}</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={isFr ? "Wilaya" : "الولاية"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isFr ? "Toutes" : "الكل"}</SelectItem>
              <SelectItem value="16">{isFr ? "Alger" : "الجزائر"}</SelectItem>
              <SelectItem value="31">{isFr ? "Oran" : "وهران"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {players.map((p) => {
            const wilaya = WILAYAS.find((w) => w.code === p.wilayaCode);
            const wilayaLabel = wilaya ? (isFr ? wilaya.fr : wilaya.ar) : p.wilayaCode;
            return (
            <Link
              key={p.id}
              href={`/players/${p.id }`}
              className="group overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={p.photoUrl} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold group-hover:text-primary transition">{pickLocalized(p.title, lang)}</h3>
                  <Badge className="shrink-0">#{p.ranking}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{pickLocalized(p.club, lang)}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge variant="outline">{pickLocalized(p.category, lang)}</Badge>
                  <Badge variant="secondary">{wilayaLabel}</Badge>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default PlayersPage;
