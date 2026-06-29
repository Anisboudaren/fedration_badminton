"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { MaintenancePage } from "@/components/layout/MaintenanceGate";
import { useI18n } from "@/i18n/I18nProvider";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { siteSettings } = useI18n();
  const isAdmin = pathname.startsWith("/admin");
  const maintenance =
    process.env.NEXT_PUBLIC_MAINTENANCE === "true" || siteSettings.maintenanceMode;

  if (isAdmin) {
    return <>{children}</>;
  }

  if (maintenance) {
    return <MaintenancePage />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
