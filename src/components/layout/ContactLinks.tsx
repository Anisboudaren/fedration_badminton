"use client";

import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Printer,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import type { SiteContactInfo } from "@/lib/admin/types";
import { pickLocalized } from "@/lib/data/site-data";
import { useI18n } from "@/i18n/I18nProvider";
import { LtrNum } from "@/components/ui/bidi-text";
import { cn } from "@/lib/utils";

type SocialKey = "facebook" | "instagram" | "youtube" | "twitter";

const SOCIAL_META: Record<SocialKey, { Icon: LucideIcon; label: string }> = {
  facebook: { Icon: Facebook, label: "Facebook" },
  instagram: { Icon: Instagram, label: "Instagram" },
  youtube: { Icon: Youtube, label: "YouTube" },
  twitter: { Icon: Twitter, label: "X" },
};

function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function useSiteContact() {
  const { siteSettings, lang } = useI18n();
  const contact = siteSettings.contact;
  const address = pickLocalized(contact.address, lang);

  const emails = [contact.email1, contact.email2].map((e) => e.trim()).filter(Boolean);
  const phones = [contact.phone1, contact.phone2].map((p) => p.trim()).filter(Boolean);
  const fax = contact.fax.trim();

  const socials = (Object.keys(SOCIAL_META) as SocialKey[])
    .map((key) => ({ key, url: normalizeUrl(contact[key]), ...SOCIAL_META[key] }))
    .filter((s) => s.url);

  return { contact, address, emails, phones, fax, socials };
}

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
  contact?: SiteContactInfo;
  theme?: "dark" | "light";
};

export function SocialLinks({
  className,
  iconClassName,
  contact: contactProp,
  theme = "dark",
}: SocialLinksProps) {
  const { siteSettings } = useI18n();
  const contact = contactProp ?? siteSettings.contact;

  const socials = (Object.keys(SOCIAL_META) as SocialKey[])
    .map((key) => ({ key, url: normalizeUrl(contact[key]), ...SOCIAL_META[key] }))
    .filter((s) => s.url);

  if (socials.length === 0) return null;

  const defaultIcon =
    theme === "light"
      ? "border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
      : "border-white/20 transition hover:border-primary hover:bg-primary";

  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      {socials.map(({ key, url, Icon, label }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn("grid h-9 w-9 place-items-center rounded-full border", defaultIcon, iconClassName)}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

type ContactDetailsListProps = {
  variant?: "footer" | "card";
  showAddress?: boolean;
  showFax?: boolean;
  className?: string;
};

export function ContactDetailsList({
  variant = "footer",
  showAddress = true,
  showFax = true,
  className,
}: ContactDetailsListProps) {
  const { t } = useI18n();
  const { address, emails, phones, fax } = useSiteContact();

  const itemClass =
    variant === "footer"
      ? "flex gap-2 text-sm text-white/70"
      : "flex gap-2 text-sm text-muted-foreground";

  const linkClass =
    variant === "footer" ? "transition hover:text-primary" : "transition hover:text-foreground";

  const iconClass = variant === "footer" ? "shrink-0 text-primary" : "mt-0.5 h-4 w-4 shrink-0 text-primary";

  return (
    <ul className={cn("space-y-3", className)}>
      {showAddress && address && (
        <li className={itemClass}>
          <MapPin className={cn("h-4 w-4", iconClass)} />
          <span className="whitespace-pre-line">{address}</span>
        </li>
      )}
      {phones.map((phone) => (
        <li key={phone} className={itemClass}>
          <Phone className={cn("h-4 w-4", iconClass)} />
          <a href={`tel:${phone.replace(/\s/g, "")}`} className={linkClass}>
            <LtrNum value={phone} />
          </a>
        </li>
      ))}
      {emails.map((email) => (
        <li key={email} className={itemClass}>
          <Mail className={cn("h-4 w-4", iconClass)} />
          <a href={`mailto:${email}`} className={linkClass}>
            <LtrNum value={email} />
          </a>
        </li>
      ))}
      {showFax && fax && (
        <li className={itemClass}>
          <Printer className={cn("h-4 w-4", iconClass)} />
          <span>
            {t.footer.fax}: <LtrNum value={fax} />
          </span>
        </li>
      )}
    </ul>
  );
}
