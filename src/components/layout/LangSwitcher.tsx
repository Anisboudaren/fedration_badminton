import { LANGS } from "@/i18n/translations";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

type LangSwitcherProps = {
  variant?: "topbar" | "admin";
  className?: string;
};

export function LangSwitcher({ variant = "admin", className }: LangSwitcherProps) {
  const { lang, setLang } = useI18n();

  if (variant === "topbar") {
    return (
      <div className={cn("flex items-center gap-0.5 border-s border-white/20 ps-2", className)}>
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            className={cn(
              "rounded px-1.5 py-0.5 text-[10px] font-semibold transition",
              lang === l.code ? "bg-white/15 text-white" : "text-white/60 hover:text-white",
            )}
            aria-label={l.label}
            aria-pressed={lang === l.code}
          >
            {l.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border border-border bg-muted/40 p-0.5",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className={cn(
            "rounded px-2 py-1 text-[11px] font-semibold transition",
            lang === l.code
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={lang === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
