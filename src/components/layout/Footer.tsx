"use client";

import { assetUrl } from "@/lib/utils";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/main logo.png";
import { useI18n } from "@/i18n/I18nProvider";
import { LtrNum } from "@/components/ui/bidi-text";

export function Footer() {
  const { t } = useI18n();
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
          <img src={assetUrl(logo)} alt="ABF" className="h-14 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{t.footer.about}</p>
          <div className="mt-4 flex gap-2.5">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition hover:border-primary hover:bg-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
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
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="whitespace-pre-line">{t.footer.address}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <LtrNum value="+213 23 25 82 52" />
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <LtrNum value="contact@badminton.dz" />
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Algerian Badminton Federation — {t.footer.rights}
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
