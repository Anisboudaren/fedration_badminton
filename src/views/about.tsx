"use client";

import Link from "next/link";
import { Download, FileText, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/i18n/I18nProvider";
import { TECHNICAL_REGULATIONS, pickReg } from "@/lib/data/technical-regulations";
import type { AboutPageData } from "@/lib/data/site-data.server";
import type { FederationMemberItem } from "@/lib/admin/types";
import { pickLocalized } from "@/lib/data/site-data";
import { BidiText, LtrNum } from "@/components/ui/bidi-text";
import { cmsImageUrl } from "@/lib/storage/blob-url";
import { cn } from "@/lib/utils";
import brandTogether from "@/assets/branded images/ABF together we play.webp";
import photoWide from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.01.webp";

function FederationMemberCard({
  member,
  index,
  lang,
}: {
  member: FederationMemberItem;
  index: number;
  lang: string;
}) {
  const firstName = pickLocalized(member.firstName, lang as "en" | "fr" | "ar");
  const lastName = pickLocalized(member.lastName, lang as "en" | "fr" | "ar");
  const role = pickLocalized(member.role, lang as "en" | "fr" | "ar");
  const photo = cmsImageUrl(member.photoUrl);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm transition duration-300",
        "hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-footer">
        {photo ? (
          <img
            src={photo}
            alt={`${firstName} ${lastName}`}
            loading="lazy"
            className="h-full w-full object-contain object-center transition duration-500 group-hover:scale-[1.02]"
          />
        ) : null}
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

function AboutPage({ initialData }: { initialData: AboutPageData }) {
  const { t, lang } = useI18n();
  const { content, members } = initialData;

  const heroTitle = pickLocalized(content.heroTitle, lang);
  const heroIntro = pickLocalized(content.heroIntro, lang);
  const heroImage = cmsImageUrl(content.heroImageUrl, photoWide);
  const missionTitle = pickLocalized(content.missionTitle, lang);
  const missionP1 = pickLocalized(content.missionP1, lang);
  const missionP2 = pickLocalized(content.missionP2, lang);
  const missionImage = cmsImageUrl(content.missionImageUrl, brandTogether);
  const leadershipTitle = pickLocalized(content.leadershipTitle, lang);
  const leadershipIntro = pickLocalized(content.leadershipIntro, lang);
  const orgTitle = pickLocalized(content.orgTitle, lang);
  const regulationsTitle =
    pickLocalized(content.regulationsTitle, lang) || pickReg(TECHNICAL_REGULATIONS.title, lang);
  const regulationsIntro = pickLocalized(content.regulationsIntro, lang);
  const documentsTitle = pickLocalized(content.documentsTitle, lang);

  const downloadLabel = lang === "ar" ? "تحميل" : lang === "fr" ? "Télécharger" : "Download";
  const viewLabel = lang === "ar" ? "عرض" : lang === "fr" ? "Voir" : "View";

  return (
    <>
      <PageHero
        title={heroTitle}
        breadcrumb={`${t.nav.home} / ${t.nav.about}`}
        intro={heroIntro}
        image={heroImage}
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
            <h2 className="section-title">{missionTitle}</h2>
            {missionP1 ? (
              <p className="mt-6 text-sm leading-7 text-muted-foreground md:text-base">{missionP1}</p>
            ) : null}
            {missionP2 ? (
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">{missionP2}</p>
            ) : null}
          </div>
          {missionImage ? (
            <div className="overflow-hidden rounded-2xl border shadow-lg">
              <img src={missionImage} alt="" className="w-full object-cover" loading="lazy" />
            </div>
          ) : null}
        </div>
      </section>

      {(leadershipTitle || members.length > 0) && (
        <section className="border-y border-border/60 bg-gradient-to-b from-muted/40 to-background py-14 md:py-16">
          <div className="container-px">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              {leadershipTitle ? <h2 className="section-title">{leadershipTitle}</h2> : null}
              {leadershipIntro ? (
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  {leadershipIntro}
                </p>
              ) : null}
            </div>

            {members.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
                {members.map((member, index) => (
                  <FederationMemberCard key={member.id} member={member} index={index} lang={lang} />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      )}

      {content.orgNodes.length > 0 ? (
        <section className="bg-muted/30 py-14">
          <div className="container-px">
            {orgTitle ? <h2 className="section-title mb-8">{orgTitle}</h2> : null}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.orgNodes.map((node) => {
                const image = cmsImageUrl(node.imageUrl);
                return (
                  <div
                    key={node.id}
                    className="rounded-xl border bg-card p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {image ? (
                      <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full border border-border bg-muted">
                        <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
                      </div>
                    ) : (
                      <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-primary/10" />
                    )}
                    <h3 className="font-semibold">{pickLocalized(node.title, lang)}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {pickLocalized(node.subtitle, lang)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-px py-14">
        <div className="mb-8 max-w-3xl">
          <h2 className="section-title">{regulationsTitle}</h2>
          {regulationsIntro ? (
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              {regulationsIntro}
            </p>
          ) : null}
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

      {content.documents.length > 0 ? (
        <section className="border-t bg-muted/30 py-14">
          <div className="container-px">
            {documentsTitle ? <h2 className="section-title mb-8">{documentsTitle}</h2> : null}
            <div className="grid gap-4 md:grid-cols-2">
              {content.documents.map((doc) => {
                const title = pickLocalized(doc.title, lang);
                const subtitle = pickLocalized(doc.subtitle, lang);
                const isFile = doc.kind === "file" && doc.fileUrl;
                const href = isFile ? doc.fileUrl! : doc.href || "#";

                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between gap-4 rounded-xl border bg-card p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold">{title}</p>
                        {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      {isFile ? (
                        <a href={href} download>
                          <Download className="h-4 w-4" />
                          {downloadLabel}
                        </a>
                      ) : (
                        <Link href={href}>
                          {href.startsWith("http") ? (
                            <ExternalLink className="h-4 w-4" />
                          ) : null}
                          {viewLabel}
                        </Link>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export default AboutPage;
