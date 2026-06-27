"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";
import { Toaster } from "@/components/ui/sonner";
import type { SiteSettings } from "@/lib/admin/types";
import { defaultSiteSettings } from "@/lib/admin/content-store";

export function Providers({
  children,
  initialSettings,
}: {
  children: ReactNode;
  initialSettings?: SiteSettings;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const settings = initialSettings ?? defaultSiteSettings();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider initialSettings={settings}>
        {children}
        <Toaster />
      </I18nProvider>
    </QueryClientProvider>
  );
}
