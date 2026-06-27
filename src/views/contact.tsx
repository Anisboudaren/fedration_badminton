"use client";


import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Share2, Facebook, Instagram, Youtube, Paperclip, Send, Info, Trophy, Users, Newspaper, Handshake, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { useI18n } from "@/i18n/I18nProvider";
import { assetUrl } from "@/lib/utils";
import hero from "@/assets/hero-badminton.jpg";
import shuttle from "@/assets/hero-badminton.jpg";

function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const cards = [
    { Icon: MapPin, title: t.contact.address, lines: ["Maison des Fédérations", "Dely Ibrahim, Algiers", "Algeria"] },
    { Icon: Phone, title: t.contact.phone, lines: ["+213 23 25 82 52", "+213 23 25 86 10"] },
    { Icon: Mail, title: t.contact.email, lines: ["contact@badminton.dz", "info@badminton.dz"] },
    { Icon: Clock, title: t.contact.hours, lines: [`${t.contact.sunThu}`, "08:30 – 17:00", `${t.contact.fri}`, "08:30 – 13:00"] },
  ];

  const help = [
    { Icon: Info, k: "general" as const },
    { Icon: Trophy, k: "competitions" as const },
    { Icon: Users, k: "clubs" as const },
    { Icon: Newspaper, k: "press" as const },
    { Icon: Handshake, k: "partners" as const },
  ];

  return (
    <>
      <PageHero title={t.contact.title} breadcrumb={t.contact.breadcrumb} intro={t.contact.intro} image={hero} />

      {/* Coordinates */}
      <section className="container-px py-14">
        <h2 className="section-title mb-8">{t.contact.details}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map(({ Icon, title, lines }) => (
            <div key={title} className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition">
              <Icon className="h-7 w-7 text-primary mb-3" strokeWidth={1.5} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">{title}</h3>
              <div className="mt-2 space-y-0.5 text-sm text-muted-foreground">
                {lines.map((l, i) => <p key={i}>{l}</p>)}
              </div>
            </div>
          ))}
          <div className="bg-card border border-border rounded-lg p-5">
            <Share2 className="h-7 w-7 text-primary mb-3" strokeWidth={1.5} />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">{t.contact.social}</h3>
            <div className="mt-3 flex gap-2">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="container-px py-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="section-title mb-6">{t.contact.findUs}</h2>
          <div className="rounded-lg overflow-hidden border border-border h-[420px] bg-muted">
            <iframe
              title="Maison des Fédérations"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.9650%2C36.7400%2C3.0250%2C36.7700&layer=mapnik&marker=36.7540%2C2.9950"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <h2 className="section-title mb-6">{t.contact.sendMessage}</h2>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); }}
            className="bg-card border border-border rounded-lg p-6 space-y-4 shadow-sm"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder={t.contact.name} className="px-4 py-3 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <input required type="email" placeholder={t.contact.emailField} className="px-4 py-3 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <input required placeholder={t.contact.subject} className="w-full px-4 py-3 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <textarea required rows={6} placeholder={t.contact.message} className="w-full px-4 py-3 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
            <label className="flex items-center gap-2 text-xs text-muted-foreground border border-dashed border-border rounded-md px-4 py-3 cursor-pointer hover:bg-muted/40">
              <Paperclip className="h-4 w-4" />
              <span>{t.contact.attach} <span className="text-muted-foreground/60">(PDF, JPG, PNG · max 5MB)</span></span>
              <input type="file" className="hidden" />
            </label>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-md text-sm font-semibold uppercase tracking-wide hover:bg-primary-dark transition shadow-md shadow-primary/20">
              {sent ? "✓ Sent" : t.contact.submit} {!sent && <Send className="h-4 w-4 rtl:rotate-180" />}
            </button>
          </form>
        </div>
      </section>

      {/* Help cards */}
      <section className="container-px py-14">
        <h2 className="section-title mb-8">{t.contact.helpTitle}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {help.map(({ Icon, k }) => (
            <div key={k} className="bg-footer text-white rounded-lg p-6 hover:bg-primary-dark transition cursor-pointer group">
              <Icon className="h-9 w-9 mb-4 text-primary group-hover:text-white transition" strokeWidth={1.5} />
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">{t.contact.help[`${k}` as keyof typeof t.contact.help] as string}</h3>
              <p className="text-xs text-white/70 leading-relaxed">{t.contact.help[`${k}Desc` as keyof typeof t.contact.help] as string}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-px py-8">
        <div className="relative bg-gradient-to-r from-primary-dark to-primary rounded-xl p-6 md:p-8 overflow-hidden flex flex-col md:flex-row md:items-center gap-5">
          <img src={assetUrl(shuttle)} alt="" className="hidden md:block h-20 w-auto opacity-30" />
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-white uppercase">{t.contact.newsletter}</h3>
            <p className="text-sm text-white/80 mt-1">{t.contact.newsletterCopy}</p>
          </div>
          <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={t.contact.newsletterPlaceholder} className="flex-1 md:w-72 px-4 py-3 bg-white text-foreground rounded-s-md text-sm focus:outline-none" />
            <button className="inline-flex items-center gap-2 bg-white text-primary px-5 py-3 rounded-e-md text-sm font-bold uppercase hover:bg-white/90 transition">
              {t.contact.subscribe} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
