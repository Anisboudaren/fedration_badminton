"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Facebook, Instagram, Youtube, Sparkles } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/main logo.png";
import { BadmintonIcon } from "@/components/icons/BadmintonIcon";
import { useI18n } from "@/i18n/I18nProvider";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { cn, assetUrl } from "@/lib/utils";

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/officials", label: t.nav.officials },
    { to: "/events", label: t.nav.events },
    { to: "/players", label: t.nav.players },
    { to: "/licence", label: t.nav.licence, cta: true },
    { to: "/sponsors", label: t.nav.sponsors },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-topbar text-topbar-foreground text-[11px]">
        <div className="container-px flex h-8 items-center justify-between">
          <span className="hidden truncate sm:inline">🏸 {t.welcome}</span>
          <div className="flex items-center gap-3 ms-auto">
            <Link href="/about" className="hidden md:inline hover:text-white/80">
              {t.about}
            </Link>
            <LangSwitcher variant="topbar" />
            <div className="hidden items-center gap-2 border-s border-white/20 ps-2 sm:flex">
              <Facebook className="h-3 w-3" />
              <Instagram className="h-3 w-3" />
              <Youtube className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 shadow-sm backdrop-blur">
        <div className="container-px flex h-14 items-center justify-between gap-3 md:h-16">
          <Link href="/" className="flex shrink-0 items-center">
            <img src={assetUrl(logo)} alt="ABF" className="h-9 w-auto md:h-11" />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {links.map((l) =>
              "cta" in l && l.cta ? (
                <Link
                  key={l.to}
                  href={l.to}
                  className={cn(
                    "ms-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-primary-foreground shadow-md transition hover:shadow-lg",
                    isActive(l.to)
                      ? "bg-primary-dark shadow-primary/30 ring-2 ring-primary/30"
                      : "bg-primary shadow-primary/25 hover:bg-primary-dark hover:shadow-primary/30",
                  )}
                >
                  <BadmintonIcon className="h-4 w-4 text-primary-foreground" />
                  {l.label}
                  <Sparkles className="h-3 w-3 shrink-0 opacity-90" />
                </Link>
              ) : (
                <Link
                  key={l.to}
                  href={l.to}
                  className={cn(
                    "px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition",
                    isActive(l.to)
                      ? "border-b-2 border-primary text-primary"
                      : "text-foreground/75 hover:text-primary",
                  )}
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
          <button
            onClick={() => setOpen(!open)}
            className="relative z-[60] p-1.5 text-foreground xl:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[55] xl:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-gradient-to-b from-footer/70 via-footer/55 to-footer/45 backdrop-blur-[6px] backdrop-saturate-150"
            onClick={() => setOpen(false)}
          />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute end-4 top-4 z-[60] grid h-16 w-16 place-items-center rounded-full border-2 border-white/35 bg-white/15 text-white shadow-lg backdrop-blur-sm transition hover:bg-white/25 active:scale-95 sm:end-6 sm:top-6"
            aria-label="Close menu"
          >
            <X className="h-9 w-9" strokeWidth={2.5} />
          </button>

          <nav className="relative z-[58] flex h-full flex-col items-center justify-center gap-2 px-6 py-20">
            {links.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-display w-full max-w-md rounded-2xl px-6 py-4 text-center text-2xl font-semibold leading-snug tracking-wide transition sm:text-[1.65rem]",
                  "cta" in l && l.cta
                    ? isActive(l.to)
                      ? "flex items-center justify-center gap-3 border-2 border-primary bg-primary/30 text-primary shadow-lg"
                      : "flex items-center justify-center gap-3 border-2 border-primary/60 bg-primary/20 text-white shadow-lg shadow-primary/20 hover:bg-primary/30"
                    : isActive(l.to)
                      ? "bg-white/10 text-primary"
                      : "text-white/95 hover:bg-white/10 hover:text-white",
                )}
              >
                {"cta" in l && l.cta ? (
                  <>
                    <BadmintonIcon className="h-7 w-7 text-inherit" />
                    <span>{l.label}</span>
                    <Sparkles className="h-5 w-5 shrink-0 text-primary" />
                  </>
                ) : (
                  l.label
                )}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
