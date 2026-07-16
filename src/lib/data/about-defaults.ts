import { TECHNICAL_REGULATIONS } from "@/lib/data/technical-regulations";
import { createId } from "@/lib/admin/content-store";
import { emptyLocalizedText } from "@/lib/admin/types";
import type { AboutDocument, AboutOrgNode, AboutPageContent } from "@/lib/admin/types";

export function defaultAboutOrgNodes(): AboutOrgNode[] {
  return [
    {
      id: "org-presidency",
      title: { en: "Presidency", fr: "Présidence", ar: "الرئاسة" },
      subtitle: {
        en: "Strategic direction",
        fr: "Direction stratégique",
        ar: "التوجيه الاستراتيجي",
      },
      imageUrl: "",
    },
    {
      id: "org-secretariat",
      title: { en: "General Secretariat", fr: "Secrétariat Général", ar: "الأمانة العامة" },
      subtitle: {
        en: "Administrative coordination",
        fr: "Coordination administrative",
        ar: "التنسيق الإداري",
      },
      imageUrl: "",
    },
    {
      id: "org-technical",
      title: { en: "Technical Commission", fr: "Commission Technique", ar: "اللجنة التقنية" },
      subtitle: {
        en: "Training & competitions",
        fr: "Formation & compétitions",
        ar: "التكوين والبطولات",
      },
      imageUrl: "",
    },
    {
      id: "org-refereeing",
      title: { en: "Refereeing", fr: "Arbitrage", ar: "التحكيم" },
      subtitle: {
        en: "Officials & regulations",
        fr: "Officiels & règlements",
        ar: "الحكام واللوائح",
      },
      imageUrl: "",
    },
  ];
}

export function defaultAboutDocuments(): AboutDocument[] {
  return [
    {
      id: "doc-college",
      title: { ...TECHNICAL_REGULATIONS.title },
      subtitle: {
        en: "DOCX · Technical College 2025",
        fr: "DOCX · Collège Technique 2025",
        ar: "DOCX · الكلية التقنية 2025",
      },
      kind: "file",
      fileUrl: "/assets/info/Collegue Technique 2025 (2).docx",
    },
    {
      id: "doc-ranking",
      title: {
        en: "National seniors ranking 2026",
        fr: "Classement national seniors 2026",
        ar: "ترتيب البطولة الوطنية للأكابر 2026",
      },
      subtitle: {
        en: "XLS · National championship",
        fr: "XLS · Championnat national",
        ar: "XLS · البطولة الوطنية",
      },
      kind: "link",
      href: "/events",
    },
  ];
}

export function defaultAboutPageContent(): AboutPageContent {
  return {
    heroTitle: {
      en: "About the Federation",
      fr: "À propos de la Fédération",
      ar: "عن الاتحادية",
    },
    heroIntro: {
      en: "The Algerian Badminton Federation works to develop the sport across the national territory.",
      fr: "La Fédération Algérienne de Badminton œuvre pour le développement du sport à travers tout le territoire national.",
      ar: "تعمل الاتحادية الجزائرية للريشة الطائرة على تطوير الرياضة عبر كامل التراب الوطني.",
    },
    heroImageUrl: "",
    missionTitle: {
      en: "Our mission",
      fr: "Notre mission",
      ar: "مهمتنا",
    },
    missionP1: {
      en: "Promote badminton in Algeria, organise official competitions, train players and support affiliated clubs according to BWF international standards.",
      fr: "Promouvoir le badminton en Algérie, organiser les compétitions officielles, former les joueurs et encadrer les clubs affiliés selon les standards internationaux de la BWF.",
      ar: "ترقية الريشة الطائرة في الجزائر، وتنظيم البطولات الرسمية، وتكوين اللاعبين ومرافقة الأندية المنخرطة وفق المعايير الدولية للاتحاد العالمي.",
    },
    missionP2: {
      en: "We aim to make badminton an accessible, competitive and unifying sport for every generation.",
      fr: "Nous visons à faire du badminton un sport accessible, compétitif et fédérateur pour toutes les générations.",
      ar: "نهدف إلى جعل الريشة الطائرة رياضة متاحة وتنافسية وجامعة لكل الأجيال.",
    },
    missionImageUrl: "",
    leadershipTitle: {
      en: "Federation leadership",
      fr: "L'équipe dirigeante",
      ar: "فريق الاتحادية",
    },
    leadershipIntro: {
      en: "The leaders driving the federation's vision and the growth of badminton across Algeria.",
      fr: "Les membres qui portent la vision et le développement du badminton algérien à travers le pays.",
      ar: "الأعضاء الذين يقودون الاتحادية ويطلقون رؤية تطوير الريشة الطائرة في الجزائر.",
    },
    orgTitle: {
      en: "Organisational structure",
      fr: "Structure organisationnelle",
      ar: "الهيكل التنظيمي",
    },
    orgNodes: defaultAboutOrgNodes(),
    regulationsTitle: { ...TECHNICAL_REGULATIONS.title },
    regulationsIntro: {
      en: "Practical summary of official regulations: affiliation, licences, competitions and selection — organised by topic for easy reading.",
      fr: "Résumé pratique du règlement officiel : affiliation, licences, compétitions et sélection — organisé par thème pour une lecture rapide.",
      ar: "ملخّص عملي للوائح الرسمية: انخراط، رخص، بطولات ومعايير الاختيار — منظّم حسب الموضوع لتسهيل القراءة.",
    },
    documentsTitle: {
      en: "Official documents",
      fr: "Documents officiels",
      ar: "الوثائق الرسمية",
    },
    documents: defaultAboutDocuments(),
  };
}

export function emptyAboutOrgNode(): AboutOrgNode {
  return {
    id: createId(),
    title: emptyLocalizedText(),
    subtitle: emptyLocalizedText(),
    imageUrl: "",
  };
}

export function emptyAboutDocument(): AboutDocument {
  return {
    id: createId(),
    title: emptyLocalizedText(),
    subtitle: emptyLocalizedText(),
    kind: "file",
    fileUrl: "",
    href: "",
  };
}
