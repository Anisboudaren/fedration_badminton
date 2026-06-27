"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Trophy } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { pickLocalized } from "@/lib/data/site-data";
import type { Player } from "@/lib/admin/types";
import { WILAYAS } from "@/lib/data/wilayas";
import photo1 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.48.webp";

function PlayerProfilePage({ initialPlayer }: { initialPlayer: Player | null }) {
  const params = useParams();
  const id = String(params.id ?? "");
  const { t, lang } = useI18n();
  const isFr = lang === "fr";
  const player = initialPlayer;
  const wilaya = player ? WILAYAS.find((w) => w.code === player.wilayaCode) : undefined;
  const wilayaLabel = wilaya ? (isFr ? wilaya.fr : wilaya.ar) : player?.wilayaCode ?? "";

  if (!player) {
    return (
      <div className="container-px py-16 text-center">
        <p className="text-muted-foreground">{isFr ? "Joueur introuvable." : "اللاعب غير موجود."}</p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/players">{isFr ? "Retour" : "عودة"}</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={pickLocalized(player.title, lang)}
        breadcrumb={isFr ? "Accueil / Joueurs / Profil" : "الرئيسية / اللاعبون / الملف"}
        image={photo1}
      />

      <section className="container-px py-14">
        <Breadcrumb
          items={[
            { label: t.nav.home, to: "/" },
            { label: t.nav.players, to: "/players" },
            { label: pickLocalized(player.title, lang) },
          ]}
        />

        <Button asChild variant="outline" className="mt-6">
          <Link href="/players">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {isFr ? "Retour à la liste" : "العودة للقائمة"}
          </Link>
        </Button>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <img src={player.photoUrl} alt="" className="aspect-square w-full object-cover" />
            <div className="p-5 text-center">
              <Badge className="text-base">#{player.ranking}</Badge>
              <p className="mt-2 text-sm text-muted-foreground">{pickLocalized(player.club, lang)}</p>
              <Badge variant="outline" className="mt-2">
                {pickLocalized(player.category, lang)}
              </Badge>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: isFr ? "Classement" : "التصنيف", value: `#${player.ranking}` },
                { label: isFr ? "Wilaya" : "الولاية", value: wilayaLabel },
                { label: isFr ? "Catégorie" : "الصنف", value: pickLocalized(player.category, lang) },
                { label: isFr ? "Club" : "النادي", value: pickLocalized(player.club, lang) },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border bg-card p-4 text-center shadow-sm">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="mt-1 font-semibold">{s.value}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="section-title">{isFr ? "Biographie" : "السيرة"}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                {pickLocalized(player.bio, lang) || (isFr ? "Biographie à venir." : "السيرة قيد الإعداد.")}
              </p>
            </div>

            <div>
              <h2 className="section-title">{isFr ? "Palmarès" : "الإنجازات"}</h2>
              <ul className="mt-4 space-y-3">
                {player.achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-lg border bg-card p-3 text-sm">
                    <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {pickLocalized(a, lang)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlayerProfilePage;
