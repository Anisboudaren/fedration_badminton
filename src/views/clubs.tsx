"use client";


import { useMemo, useState } from "react";
import { Search, MapPin, Phone, Mail, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { useI18n } from "@/i18n/I18nProvider";
import { getClubs, pickLocalized } from "@/lib/data/site-data";
import { WILAYAS } from "@/lib/data/wilayas";
import hero from "@/assets/hero-badminton.jpg";

function ClubsPage() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<string>("all");
  const clubs = getClubs();

  const regions = useMemo(() => {
    const codes = [...new Set(clubs.map((c) => c.wilayaCode))];
    return codes.map((code) => WILAYAS.find((w) => w.code === code)).filter(Boolean);
  }, [clubs]);

  const list = useMemo(
    () =>
      clubs.filter((c) => {
        const name = pickLocalized(c.title, lang);
        const wilaya = WILAYAS.find((w) => w.code === c.wilayaCode);
        const regionName = wilaya?.fr ?? "";
        return (
          (region === "all" || c.wilayaCode === region) &&
          (q === "" || name.toLowerCase().includes(q.toLowerCase()) || c.city.toLowerCase().includes(q.toLowerCase()))
        );
      }),
    [q, region, clubs, lang],
  );

  return (
    <>
      <PageHero title={t.clubs.title} breadcrumb={t.clubs.breadcrumb} intro={t.clubs.intro} image={hero} />

      <section className="container-px py-14">
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col md:flex-row gap-3 mb-8 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.clubs.search}
              className="w-full ps-10 pe-3 py-2.5 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="px-3 py-2.5 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="all">{t.clubs.filter}</option>
            {regions.map((r) =>
              r ? (
                <option key={r.code} value={r.code}>
                  {lang === "ar" ? r.ar : r.fr}
                </option>
              ) : null,
            )}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((c) => {
            const name = pickLocalized(c.title, lang);
            const wilaya = WILAYAS.find((w) => w.code === c.wilayaCode);
            return (
            <article key={c.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/40 transition group">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="h-12 w-12 rounded-md bg-primary/10 text-primary grid place-items-center font-bold text-lg">
                  {name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-muted px-2 py-1 rounded text-muted-foreground">
                  {wilaya ? (lang === "ar" ? wilaya.ar : wilaya.fr) : c.wilayaCode}
                </span>
              </div>
              <h3 className="font-semibold group-hover:text-primary transition">{name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {c.city}
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> {c.members} {lang === "ar" ? "عضو" : "members"}
              </p>
              <div className="mt-4 pt-4 border-t border-border space-y-1.5 text-xs text-muted-foreground">
                <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {c.phone}</p>
                <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {c.email}</p>
              </div>
            </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default ClubsPage;
