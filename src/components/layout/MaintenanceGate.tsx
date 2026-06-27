"use client";

import { assetUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import logo from "@/assets/main logo.png";
import { useI18n } from "@/i18n/I18nProvider";
import { isMaintenanceMode, readSiteSettings, pickLocalized } from "@/lib/data/site-data";

export function MaintenanceGate({ children }: { children: ReactNode }) {
  const { t, lang } = useI18n();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const maintenance = isMaintenanceMode();

  if (!maintenance || isAdmin) return <>{children}</>;

  const settings = readSiteSettings();
  const message = pickLocalized(settings.maintenanceMessage, lang) || t.maintenance.body;

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 30%, hsl(var(--primary)) 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-md text-center">
        <img src={assetUrl(logo)} alt="ABF" className="mx-auto h-20 w-auto object-contain" />
        <h1 className="mt-6 font-display text-2xl font-bold text-foreground">{t.maintenance.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{message}</p>
        <p className="mt-4 text-xs text-muted-foreground/70">{t.maintenance.adminNote}</p>
        <Link
          href="/admin/login"
          className="mt-6 inline-flex text-xs text-primary hover:underline"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}
