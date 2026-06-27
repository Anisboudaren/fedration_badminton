"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, LANGS, type Lang, type Dict } from "./translations";
import { getSiteSettings } from "@/lib/admin/content-store";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict; dir: "ltr" | "rtl" };
const I18nCtx = createContext<Ctx | null>(null);

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "ar";
  const saved = localStorage.getItem("abf-lang") as Lang | null;
  if (saved && LANGS.some((l) => l.code === saved)) return saved;
  return getSiteSettings().defaultLang;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    const saved = localStorage.getItem("abf-lang") as Lang | null;
    if (saved && LANGS.some((l) => l.code === saved)) {
      setLangState(saved);
    } else {
      setLangState(getSiteSettings().defaultLang);
    }
  }, []);

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
    <I18nCtx.Provider value={{ lang, setLang, t: dict[lang], dir }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be inside I18nProvider");
  return ctx;
}
