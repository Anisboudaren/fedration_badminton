import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const STORAGE_KEY = "abf-cookie-consent";

export function CookieConsent() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem(STORAGE_KEY);
  });

  const saveChoice = (value: "accepted" | "rejected") => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 inset-x-0 z-[70] px-4">
      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-background/95 backdrop-blur shadow-2xl p-4 md:p-5">
        <p className="text-sm font-semibold text-foreground">{t.cookies.title}</p>
        <p className="mt-1.5 text-sm text-muted-foreground">{t.cookies.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => saveChoice("accepted")}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-dark transition"
          >
            {t.cookies.accept}
          </button>
          <button
            type="button"
            onClick={() => saveChoice("rejected")}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition"
          >
            {t.cookies.reject}
          </button>
        </div>
      </div>
    </div>
  );
}
