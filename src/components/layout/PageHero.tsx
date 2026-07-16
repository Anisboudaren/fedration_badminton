import { useI18n } from "@/i18n/I18nProvider";
import { assetUrl, type AssetImport } from "@/lib/utils";

export function PageHero({
  title,
  breadcrumb,
  intro,
  image,
}: {
  title: string;
  breadcrumb: string;
  intro?: string;
  image: AssetImport | string;
}) {
  const { dir } = useI18n();
  const src = typeof image === "string" ? image : assetUrl(image);

  return (
    <section className="relative h-[340px] md:h-[420px] overflow-hidden bg-footer">
      {src ? (
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      ) : null}
      <div
        className="absolute inset-0 bg-gradient-to-r from-footer via-footer/80 to-transparent"
        style={
          dir === "rtl"
            ? {
                backgroundImage:
                  "linear-gradient(to left, var(--footer), color-mix(in oklab, var(--footer) 80%, transparent), transparent)",
              }
            : undefined
        }
      />
      <div className="relative container-px h-full flex flex-col justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">{title}</h1>
        <p className="mt-3 text-sm text-white/70">
          <span className="text-primary">●</span> {breadcrumb}
        </p>
        {intro && <p className="mt-5 max-w-xl text-white/80 leading-relaxed">{intro}</p>}
        <div className="mt-4 h-0.5 w-16 bg-accent" />
      </div>
    </section>
  );
}
