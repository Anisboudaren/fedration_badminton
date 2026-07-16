"use client";

import Link from "next/link";
import { LOGO_WHITE_TEXT } from "@/lib/brand-logos";
import { ContactDetailsList, SocialLinks } from "@/components/layout/ContactLinks";
import { useI18n } from "@/i18n/I18nProvider";
import { pickLocalized } from "@/lib/db/mappers";

export function Footer() {
  const { t, lang, siteSettings } = useI18n();
  const footerAbout = pickLocalized(siteSettings.footerAbout, lang) || t.footer.about;
  const footerOrgName =
    pickLocalized(siteSettings.footerOrgName, lang) || "Algerian Badminton Federation";
  const footerRights = pickLocalized(siteSettings.footerRights, lang) || t.footer.rights;
  const mainLinks = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/events", label: t.nav.events },
    { to: "/players", label: t.nav.players },
    { to: "/licence", label: t.nav.licence },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container-px grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <img src={LOGO_WHITE_TEXT} alt="ABF" className="h-14 w-auto max-w-[220px]" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{footerAbout}</p>
          <SocialLinks className="mt-4" />
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t.footer.links}</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {mainLinks.map((l) => (
              <li key={l.to}>
                <Link href={l.to} className="transition hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t.nav.officials}</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/officials" className="transition hover:text-primary">
                {t.nav.officials}
              </Link>
            </li>
            <li>
              <Link href="/sponsors" className="transition hover:text-primary">
                {t.nav.sponsors}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t.footer.contact}</h4>
          <ContactDetailsList variant="footer" />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {footerOrgName} — {footerRights}
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              {t.footer.legal}
            </a>
            <a href="#" className="hover:text-white">
              {t.footer.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
