"use client";

import { assetUrl } from "@/lib/utils";
import Link from "next/link";
import logo from "@/assets/main logo.png";
import shuttleIcon from "@/assets/icons/badminton-svgrepo-com.svg";
import { useI18n } from "@/i18n/I18nProvider";

export function NotFoundPage() {
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 20%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(var(--primary)) 0%, transparent 40%)",
        }}
      />
      <div className="relative max-w-lg text-center">
        <img src={assetUrl(logo)} alt="ABF" className="mx-auto h-16 w-auto object-contain opacity-90" />
        <div className="mt-6 flex items-center justify-center gap-3">
          <img src={assetUrl(shuttleIcon)} alt="" className="h-10 w-10 opacity-60" aria-hidden />
          <h1 className="font-display text-7xl font-bold text-primary sm:text-8xl">404</h1>
          <img src={assetUrl(shuttleIcon)} alt="" className="h-10 w-10 scale-x-[-1] opacity-60" aria-hidden />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t.notFound.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.notFound.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
          >
            {t.notFound.home}
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent transition"
          >
            {t.notFound.events}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent transition"
          >
            {t.notFound.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}
