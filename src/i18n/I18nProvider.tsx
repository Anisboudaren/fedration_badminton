"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, LANGS, type Lang, type Dict } from "./translations";
import type { SiteSettings } from "@/lib/admin/types";
import { defaultSiteSettings } from "@/lib/admin/content-store";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  dir: "ltr" | "rtl";
  siteSettings: SiteSettings;
};

const I18nCtx = createContext<Ctx | null>(null);

function getInitialLang(settings: SiteSettings): Lang {
  if (typeof window === "undefined") return settings.defaultLang;
  const saved = localStorage.getItem("abf-lang") as Lang | null;
  if (saved && LANGS.some((l) => l.code === saved)) return saved;
  return settings.defaultLang;
}

export function I18nProvider({
  children,
  initialSettings,
}: {
  children: ReactNode;
  initialSettings?: SiteSettings;
}) {
  const settings = initialSettings ?? defaultSiteSettings();
  const [siteSettings] = useState<SiteSettings>(settings);
  const [lang, setLangState] = useState<Lang>(() => getInitialLang(settings));

  useEffect(() => {
    const saved = localStorage.getItem("abf-lang") as Lang | null;
    if (saved && LANGS.some((l) => l.code === saved)) {
      setLangState(saved);
    } else {
      setLangState(settings.defaultLang);
    }
  }, [settings.defaultLang]);

  const dir = LANGS.find((l) => l.code === lang)?.dir ?? "ltr";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("abf-lang", l);
  };

  return (
    <I18nCtx.Provider value={{ lang, setLang, t: dict[lang], dir, siteSettings }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be inside I18nProvider");
  return ctx;
}
