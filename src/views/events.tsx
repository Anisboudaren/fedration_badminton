"use client";


import { useState } from "react";
import { Calendar, MapPin, ChevronDown, Download, Trophy } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BidiText, LtrNum } from "@/components/ui/bidi-text";
import { useI18n } from "@/i18n/I18nProvider";
import { pickLocalized } from "@/lib/data/site-data";
import type { ArchiveYear, EventItem, MatchResult, RankingsData } from "@/lib/admin/types";
const rankingsFile = "/assets/info/CLASSEMENT CHAMPIONNAT NATIONAL SENIORS 2026(1)(1) (1).xls";
import photo3 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.06.webp";

function pickLabel(obj: { fr: string; ar: string }, lang: string) {
  return lang === "ar" ? obj.ar : obj.fr;
}

function EventsPage({
  initialUpcoming,
  initialFinished,
  initialEvents,
  initialMatchResults,
  initialRankings,
  initialArchiveYears,
}: {
  initialUpcoming: EventItem[];
  initialFinished: EventItem[];
  initialEvents: EventItem[];
  initialMatchResults: MatchResult[];
  initialRankings: RankingsData;
  initialArchiveYears: ArchiveYear[];
}) {
  const { t, lang } = useI18n();
  const isFr = lang === "fr" || lang === "en";
  const [tab, setTab] = useState("upcoming");
  const [rankingCat, setRankingCat] = useState("teams");

  const upcoming = initialUpcoming;
  const finished = initialFinished;
  const allEvents = initialEvents;
  const matchResults = initialMatchResults;
  const NATIONAL_RANKINGS = initialRankings;
  const archiveYears = initialArchiveYears;
  const activeRanking = NATIONAL_RANKINGS.categories.find((c) => c.id === rankingCat);

  return (
    <>
      <PageHero
        title={isFr ? "Événements & Compétitions" : "الفعاليات والبطولات"}
        breadcrumb={isFr ? "Accueil / Événements" : "الرئيسية / الفعاليات"}
        image={photo3}
      />

      <section className="container-px py-14">
        <Breadcrumb items={[{ label: t.nav.home, to: "/" }, { label: t.nav.events }]} />

        <Tabs value={tab} onValueChange={setTab} className="mt-8">
          <TabsList className="h-auto flex-wrap">
            <TabsTrigger value="upcoming">{isFr ? "À venir" : "قادمة"}</TabsTrigger>
            <TabsTrigger value="results">{isFr ? "Résultats" : "النتائج"}</TabsTrigger>
            <TabsTrigger value="rankings">{isFr ? "Classements" : "الترتيب"}</TabsTrigger>
            <TabsTrigger value="archive">{isFr ? "Archives" : "الأرشيف"}</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6 space-y-4">
            {upcoming.map((e) => (
              <EventCard key={e.id} e={e} lang={lang} badge={isFr ? "À venir" : "قادم"} />
            ))}
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            <div className="overflow-hidden rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isFr ? "Événement" : "الفعالية"}</TableHead>
                    <TableHead>{isFr ? "Joueur 1" : "اللاعب 1"}</TableHead>
                    <TableHead>{isFr ? "Joueur 2" : "اللاعب 2"}</TableHead>
                    <TableHead>{isFr ? "Score" : "النتيجة"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matchResults.map((r, i) => {
                    const event = allEvents.find((e) => e.id === r.eventId);
                    const eventName = event ? pickLocalized(event.title, lang) : pickLocalized(r.title, lang);
                    return (
                    <TableRow key={r.id ?? i}>
                      <TableCell>{eventName}</TableCell>
                      <TableCell>{pickLocalized(r.player1Name, lang)}</TableCell>
                      <TableCell>{pickLocalized(r.player2Name, lang)}</TableCell>
                      <TableCell className="font-mono text-sm">
                        <LtrNum value={r.score} />
                      </TableCell>
                    </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="mt-6 space-y-4">
              {finished.map((e) => (
                <EventCard key={e.id} e={e} lang={lang} badge={isFr ? "Terminé" : "انتهى"} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rankings" className="mt-6 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border bg-primary/5 p-5">
              <div>
                <div className="flex items-center gap-2 text-primary">
                  <Trophy className="h-5 w-5" />
                  <h3 className="font-display text-lg font-bold">
                    {pickLabel(NATIONAL_RANKINGS.title, lang)}
                  </h3>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  {isFr
                    ? "Classement officiel du championnat national seniors — mis à jour à partir du fichier fédéral."
                    : "الترتيب الرسمي للبطولة الوطنية للأكابر — محدّث من ملف الاتحادية."}
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={rankingsFile} download>
                  <Download className="h-4 w-4" />
                  {isFr ? "Télécharger le fichier" : "تحميل الملف"}
                </a>
              </Button>
            </div>

            <Tabs value={rankingCat} onValueChange={setRankingCat}>
              <TabsList className="h-auto w-full flex-wrap justify-start">
                {NATIONAL_RANKINGS.categories.map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id} className="text-xs sm:text-sm">
                    {pickLabel(cat, lang)}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-4 overflow-hidden rounded-xl border bg-card shadow-sm">
                {activeRanking?.id === "teams" && "teams" in activeRanking ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>{isFr ? "Club" : "النادي"}</TableHead>
                        <TableHead>{isFr ? "Wilaya" : "الولاية"}</TableHead>
                        <TableHead className="text-end">{isFr ? "1ʳᵉ J." : "الج. 1"}</TableHead>
                        <TableHead className="text-end">{isFr ? "2ᵉ J." : "الج. 2"}</TableHead>
                        <TableHead className="text-end">{isFr ? "3ᵉ J." : "الج. 3"}</TableHead>
                        <TableHead className="text-end font-bold">{isFr ? "Total" : "المجموع"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeRanking.teams.map((team, i) => (
                        <TableRow key={`${team.club}-${i}`} className={i < 3 ? "bg-primary/5" : undefined}>
                          <TableCell className="font-semibold text-primary">
                            <LtrNum value={i + 1} />
                          </TableCell>
                          <TableCell className="font-medium">{team.club}</TableCell>
                          <TableCell className="text-muted-foreground">{team.wilaya}</TableCell>
                          <TableCell className="text-end font-mono text-sm">
                            <LtrNum value={team.j1 || "—"} />
                          </TableCell>
                          <TableCell className="text-end font-mono text-sm">
                            <LtrNum value={team.j2 || "—"} />
                          </TableCell>
                          <TableCell className="text-end font-mono text-sm">
                            <LtrNum value={team.j3 || "—"} />
                          </TableCell>
                          <TableCell className="text-end font-mono text-sm font-bold">
                            <LtrNum value={team.total} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : activeRanking && "players" in activeRanking ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>{isFr ? "Joueur" : "اللاعب"}</TableHead>
                        <TableHead>{isFr ? "Club" : "النادي"}</TableHead>
                        <TableHead>{isFr ? "Ligue" : "الرابطة"}</TableHead>
                        <TableHead className="text-end">{isFr ? "1ʳᵉ J." : "الج. 1"}</TableHead>
                        <TableHead className="text-end">{isFr ? "2ᵉ J." : "الج. 2"}</TableHead>
                        <TableHead className="text-end">{isFr ? "3ᵉ J." : "الج. 3"}</TableHead>
                        <TableHead className="text-end font-bold">{isFr ? "Total" : "المجموع"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeRanking.players.map((player, i) => (
                        <TableRow key={`${player.name}-${i}`} className={i < 3 ? "bg-primary/5" : undefined}>
                          <TableCell className="font-semibold text-primary">
                            <LtrNum value={i + 1} />
                          </TableCell>
                          <TableCell className="font-medium">{player.name}</TableCell>
                          <TableCell>{player.club}</TableCell>
                          <TableCell className="text-muted-foreground">{player.league}</TableCell>
                          <TableCell className="text-end font-mono text-sm">
                            <LtrNum value={player.j1 || "—"} />
                          </TableCell>
                          <TableCell className="text-end font-mono text-sm">
                            <LtrNum value={player.j2 || "—"} />
                          </TableCell>
                          <TableCell className="text-end font-mono text-sm">
                            <LtrNum value={player.j3 || "—"} />
                          </TableCell>
                          <TableCell className="text-end font-mono text-sm font-bold">
                            <LtrNum value={player.total} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : null}
              </div>
            </Tabs>
          </TabsContent>

          <TabsContent value="archive" className="mt-6 space-y-3">
            {archiveYears.map((y) => (
              <details key={y.year} className="group rounded-xl border bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold">
                  <span>{y.year}</span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    {y.count} {isFr ? "événements" : "فعالية"}
                    <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                  </span>
                </summary>
                <div className="border-t px-4 py-3 text-sm text-muted-foreground">
                  {isFr ? "Liste des compétitions archivées (données statiques)." : "قائمة البطولات المؤرشفة (بيانات ثابتة)."}
                </div>
              </details>
            ))}
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}

function EventCard({
  e,
  lang,
  badge,
}: {
  e: EventItem;
  lang: "ar" | "fr" | "en";
  badge: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border bg-card p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md">
      <div>
        <Badge variant={e.eventStatus === "upcoming" ? "default" : "secondary"}>{badge}</Badge>
        <h3 className="mt-2 text-lg font-semibold">{pickLocalized(e.title, lang)}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <BidiText text={`${e.startDate} — ${e.endDate}`} />
        </p>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {e.location}
        </p>
      </div>
    </div>
  );
}

export default EventsPage;
