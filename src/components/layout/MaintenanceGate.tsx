"use client";

import { Mail, Phone } from "lucide-react";
import { LOGO_WHITE_TEXT } from "@/lib/brand-logos";
import { ContactDetailsList, SocialLinks, useSiteContact } from "@/components/layout/ContactLinks";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { pickLocalized } from "@/lib/data/site-data";

export function MaintenancePage() {
  const { t, lang, siteSettings } = useI18n();
  const { emails, phones } = useSiteContact();
  const message = pickLocalized(siteSettings.maintenanceMessage, lang) || t.maintenance.body;
  const primaryEmail = emails[0];
  const primaryPhone = phones[0];

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a1628] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary) / 0.35) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <header className="relative z-10 flex items-center justify-end px-4 py-4 sm:px-6">
        <LangSwitcher variant="topbar" className="border-0 ps-0" />
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-4">
        <div className="w-full max-w-lg text-center">
          <img
            src={LOGO_WHITE_TEXT}
            alt="ABF"
            className="mx-auto h-16 w-auto max-w-[240px] sm:h-20"
          />
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            {pickLocalized(siteSettings.heroTagline, lang)}
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-primary" />
            <h1 className="font-display text-2xl font-bold sm:text-3xl">{t.maintenance.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-white/75">{message}</p>
            <p className="mt-3 text-sm text-white/60">{t.maintenance.contactPrompt}</p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-start backdrop-blur-sm">
            <h2 className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-white/80">
              {t.maintenance.reachUs}
            </h2>
            <ContactDetailsList
              variant="footer"
              className="[&_li]:text-white/75 [&_a]:text-white/75 [&_a:hover]:text-primary"
            />
            <div className="mt-5 flex justify-center">
              <SocialLinks iconClassName="border-white/25 text-white hover:text-white" />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {primaryEmail && (
              <Button asChild size="lg" className="gap-2">
                <a href={`mailto:${primaryEmail}`}>
                  <Mail className="h-4 w-4" />
                  {t.maintenance.emailUs}
                </a>
              </Button>
            )}
            {primaryPhone && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a href={`tel:${primaryPhone.replace(/\s/g, "")}`}>
                  <Phone className="h-4 w-4" />
                  {t.maintenance.callUs}
                </a>
              </Button>
            )}
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} ABF — {t.footer.rights}
      </footer>
    </div>
  );
}
