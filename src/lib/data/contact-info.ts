import type { SiteContactInfo } from "@/lib/admin/types";

export function defaultSiteContactInfo(): SiteContactInfo {
  return {
    address: {
      en: "Maison des Fédérations\nDely Ibrahim, Algiers\nAlgeria",
      fr: "Maison des Fédérations\nDely Ibrahim, Alger\nAlgérie",
      ar: "دار الاتحاديات\nدالي إبراهيم، الجزائر\nالجزائر",
    },
    email1: "contact@badminton.dz",
    email2: "info@badminton.dz",
    phone1: "+213 23 25 82 52",
    phone2: "+213 23 25 86 10",
    fax: "",
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
  };
}

export function normalizeSiteContactInfo(value: unknown): SiteContactInfo {
  const defaults = defaultSiteContactInfo();
  if (!value || typeof value !== "object" || Array.isArray(value)) return defaults;
  const obj = value as Record<string, unknown>;
  const address =
    obj.address && typeof obj.address === "object" && !Array.isArray(obj.address)
      ? {
          en: typeof (obj.address as Record<string, unknown>).en === "string" ? (obj.address as Record<string, string>).en : defaults.address.en,
          fr: typeof (obj.address as Record<string, unknown>).fr === "string" ? (obj.address as Record<string, string>).fr : defaults.address.fr,
          ar: typeof (obj.address as Record<string, unknown>).ar === "string" ? (obj.address as Record<string, string>).ar : defaults.address.ar,
        }
      : defaults.address;

  const str = (key: keyof Omit<SiteContactInfo, "address">) =>
    typeof obj[key] === "string" ? (obj[key] as string) : defaults[key];

  return {
    address,
    email1: str("email1"),
    email2: str("email2"),
    phone1: str("phone1"),
    phone2: str("phone2"),
    fax: str("fax"),
    facebook: str("facebook"),
    instagram: str("instagram"),
    youtube: str("youtube"),
    twitter: str("twitter"),
  };
}

import type { Prisma } from "@/generated/prisma/client";

export function contactInfoToJson(contact: SiteContactInfo): Prisma.InputJsonValue {
  return {
    address: { en: contact.address.en, fr: contact.address.fr, ar: contact.address.ar },
    email1: contact.email1,
    email2: contact.email2,
    phone1: contact.phone1,
    phone2: contact.phone2,
    fax: contact.fax,
    facebook: contact.facebook,
    instagram: contact.instagram,
    youtube: contact.youtube,
    twitter: contact.twitter,
  };
}
