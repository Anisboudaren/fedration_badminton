"use client";

import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/i18n/I18nProvider";
import { TECHNICAL_REGULATIONS, pickReg } from "@/lib/data/technical-regulations";
import { FEDERATION_MEMBERS, pickMemberText, type FederationMember } from "@/lib/data/federation-members";
import { BidiText, LtrNum } from "@/components/ui/bidi-text";
import { assetUrl, cn } from "@/lib/utils";
const statutesFile = "/assets/info/Collegue Technique 2025 (2).docx";
import brandTogether from "@/assets/branded images/ABF together we play.webp";
import photoWide from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.01.webp";

function FederationMemberCard({ member, index, lang }: { member: FederationMember; index: number; lang: string }) {
  const firstName = pickMemberText(member.firstName, lang);
  const lastName = pickMemberText(member.lastName, lang);
  const role = pickMemberText(member.role, lang);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm transition duration-300",
        "hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-footer">
        <img
          src={member.photo}
          alt={`${firstName} ${lastName}`}
          loading="lazy"
          className="h-full w-full object-contain object-center transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-footer/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="border-t border-border/60 px-3 py-3 text-center sm:px-4 sm:py-3.5">
        <p className="text-sm font-semibold leading-snug text-foreground">
          {firstName} {lastName}
        </p>
        <p className="mt-1 text-xs font-medium text-primary">{role}</p>
      </div>
    </article>
  );
}

function AboutPage() {
  const { t, lang } = useI18n();
  const isFr = lang === "fr" || lang === "en";

  const org = [
    { title: isFr ? "Présidence" : "الرئاسة", sub: isFr ? "Direction stratégique" : "التوجيه الاستراتيجي" },
    { title: isFr ? "Secrétariat Général" : "الأمانة العامة", sub: isFr ? "Coordination administrative" : "التنسيق الإداري" },
    { title: isFr ? "Commission Technique" : "اللجنة التقنية", sub: isFr ? "Formation & compétitions" : "التكوين والبطولات" },
    { title: isFr ? "Arbitrage" : "التحكيم", sub: isFr ? "Officiels & règlements" : "الحكام واللوائح" },
  ];

  return (
    <>
      <PageHero
        title={isFr ? "À propos de la Fédération" : "عن الاتحادية"}
        breadcrumb={isFr ? "Accueil / À propos" : "الرئيسية / من نحن"}
        intro={
          isFr
            ? "La Fédération Algérienne de Badminton œuvre pour le développement du sport à travers tout le territoire national."
            : "تعمل الاتحادية الجزائرية للريشة الطائرة على تطوير الرياضة عبر كامل التراب الوطني."
        }
        image={photoWide}
      />

      <section className="container-px py-14">
        <Breadcrumb
          items={[
            { label: t.nav.home, to: "/" },
            { label: t.nav.about },
          ]}
        />
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title">{isFr ? "Notre mission" : "مهمتنا"}</h2>
            <p className="mt-6 text-sm leading-7 text-muted-foreground md:text-base">
              {isFr
                ? "Promouvoir le badminton en Algérie, organiser les compétitions officielles, former les joueurs et encadrer les clubs affiliés selon les standards internationaux de la BWF."
                : "ترقية الريشة الطائرة في الجزائر، وتنظيم البطولات الرسمية، وتكوين اللاعبين ومرافقة الأندية المنخرطة وفق المعايير الدولية للاتحاد العالمي."}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              {isFr
                ? "Nous visons à faire du badminton un sport accessible, compétitif et fédérateur pour toutes les générations."
                : "نهدف إلى جعل الريشة الطائرة رياضة متاحة وتنافسية وجامعة لكل الأجيال."}
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border shadow-lg">
            <img src={assetUrl(brandTogether)} alt="" className="w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-gradient-to-b from-muted/40 to-background py-14 md:py-16">
        <div className="container-px">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="section-title">
              {lang === "ar"
                ? "فريق الاتحادية"
                : lang === "fr"
                  ? "L'équipe dirigeante"
                  : "Federation leadership"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              {lang === "ar"
                ? "الأعضاء الذين يقودون الاتحادية ويطلقون رؤية تطوير الريشة الطائرة في الجزائر."
                : lang === "fr"
                  ? "Les membres qui portent la vision et le développement du badminton algérien à travers le pays."
                  : "The leaders driving the federation's vision and the growth of badminton across Algeria."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {FEDERATION_MEMBERS.map((member, index) => (
              <FederationMemberCard key={member.photo} member={member} index={index} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-14">
        <div className="container-px">
          <h2 className="section-title mb-8">{isFr ? "Structure organisationnelle" : "الهيكل التنظيمي"}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {org.map((node) => (
              <div
                key={node.title}
                className="rounded-xl border bg-card p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-primary/10" />
                <h3 className="font-semibold">{node.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{node.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-px py-14">
        <div className="mb-8 max-w-3xl">
          <h2 className="section-title">{pickReg(TECHNICAL_REGULATIONS.title, lang)}</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            {lang === "ar"
              ? "ملخّص عملي للوائح الرسمية: انخراط، رخص، بطولات ومعايير الاختيار — منظّم حسب الموضوع لتسهيل القراءة."
              : lang === "fr"
                ? "Résumé pratique du règlement officiel : affiliation, licences, compétitions et sélection — organisé par thème pour une lecture rapide."
                : "Practical summary of official regulations: affiliation, licences, competitions and selection — organised by topic for easy reading."}
          </p>
        </div>

        <Accordion type="multiple" className="space-y-3">
          {TECHNICAL_REGULATIONS.sections.map((section) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="overflow-hidden rounded-2xl border bg-card px-4 shadow-sm md:px-6"
            >
              <AccordionTrigger className="py-5 hover:no-underline">
                <div className="pe-4 text-start">
                  <span className="font-display text-base font-semibold md:text-lg">
                    {pickReg(section.title, lang)}
                  </span>
                  {section.summary ? (
                    <p className="mt-1 text-sm font-normal text-muted-foreground">
                      <BidiText text={pickReg(section.summary, lang)} />
                    </p>
                  ) : null}
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t pt-4 text-sm leading-7 text-muted-foreground">
                {section.highlights && section.highlights.length > 0 ? (
                  <div className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {section.highlights.map((h, i) => (
                      <div key={i} className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-2.5">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                          {pickReg(h.label, lang)}
                        </p>
                        <p className="mt-0.5 font-medium text-foreground">
                          <LtrNum value={pickReg(h.value, lang)} />
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.body?.map((paragraph, j) => (
                  <p key={j} className={j > 0 ? "mt-3" : undefined}>
                    <BidiText text={pickReg(paragraph, lang)} />
                  </p>
                ))}

                {section.items && section.items.length > 0 ? (
                  <ul className="mt-4 space-y-2.5">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex gap-2.5 text-foreground/90">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>
                          <BidiText text={pickReg(item, lang)} />
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.groups?.map((group, gi) => (
                  <div key={gi} className={gi > 0 || section.body?.length ? "mt-6" : undefined}>
                    <h4 className="mb-3 font-semibold text-foreground">{pickReg(group.title, lang)}</h4>
                    <ul className="space-y-2">
                      {group.items.map((item, j) => (
                        <li key={j} className="flex gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                            {j + 1}
                          </span>
                          <span>
                          <BidiText text={pickReg(item, lang)} />
                        </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="border-t bg-muted/30 py-14">
        <div className="container-px">
          <h2 className="section-title mb-8">
            {lang === "ar" ? "الوثائق الرسمية" : lang === "fr" ? "Documents officiels" : "Official documents"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">{pickReg(TECHNICAL_REGULATIONS.title, lang)}</p>
                  <p className="text-xs text-muted-foreground">DOCX · Collège Technique 2025</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={statutesFile} download>
                  <Download className="h-4 w-4" />
                  {lang === "ar" ? "تحميل" : lang === "fr" ? "Télécharger" : "Download"}
                </a>
              </Button>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">
                    {lang === "ar"
                      ? "ترتيب البطولة الوطنية للأكابر 2026"
                      : lang === "fr"
                        ? "Classement national seniors 2026"
                        : "National seniors ranking 2026"}
                  </p>
                  <p className="text-xs text-muted-foreground">XLS · Championnat national</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/events">{lang === "ar" ? "عرض" : lang === "fr" ? "Voir" : "View"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
