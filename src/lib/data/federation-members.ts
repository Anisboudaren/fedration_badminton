/** Branded portrait cards — `public/fideration memebers/` */
const BASE = "/fideration%20memebers";

export type FederationMember = {
  photo: string;
  firstName: { en: string; fr: string; ar: string };
  lastName: { en: string; fr: string; ar: string };
  role: { en: string; fr: string; ar: string };
};

/** Placeholder names & roles — replace with real data when available. */
export const FEDERATION_MEMBERS: readonly FederationMember[] = [
  {
    photo: `${BASE}/1%20(1).png`,
    firstName: { en: "Ahmed", fr: "Ahmed", ar: "أحمد" },
    lastName: { en: "Benali", fr: "Benali", ar: "بن علي" },
    role: { en: "President", fr: "Président", ar: "الرئيس" },
  },
  {
    photo: `${BASE}/2.png`,
    firstName: { en: "Karim", fr: "Karim", ar: "كريم" },
    lastName: { en: "Mansouri", fr: "Mansouri", ar: "منصوري" },
    role: { en: "General Secretary", fr: "Secrétaire général", ar: "الأمين العام" },
  },
  {
    photo: `${BASE}/3.png`,
    firstName: { en: "Youssef", fr: "Youssef", ar: "يوسف" },
    lastName: { en: "Khelifi", fr: "Khelifi", ar: "خليفي" },
    role: { en: "Technical Director", fr: "Directeur technique", ar: "المدير التقني" },
  },
  {
    photo: `${BASE}/4.png`,
    firstName: { en: "Nadia", fr: "Nadia", ar: "نادية" },
    lastName: { en: "Hamidi", fr: "Hamidi", ar: "حميدي" },
    role: { en: "Treasurer", fr: "Trésorière", ar: "أمينة المال" },
  },
  {
    photo: `${BASE}/5.png`,
    firstName: { en: "Rachid", fr: "Rachid", ar: "رشيد" },
    lastName: { en: "Boudiaf", fr: "Boudiaf", ar: "بوضياف" },
    role: { en: "Vice President", fr: "Vice-président", ar: "نائب الرئيس" },
  },
  {
    photo: `${BASE}/7.png`,
    firstName: { en: "Samir", fr: "Samir", ar: "سمير" },
    lastName: { en: "Zerrouki", fr: "Zerrouki", ar: "زرّوقي" },
    role: { en: "Competition Manager", fr: "Responsable compétitions", ar: "مسؤول المسابقات" },
  },
  {
    photo: `${BASE}/8.png`,
    firstName: { en: "Leila", fr: "Leila", ar: "ليلى" },
    lastName: { en: "Amrani", fr: "Amrani", ar: "عمراني" },
    role: { en: "Refereeing Coordinator", fr: "Coordonnatrice arbitrage", ar: "منسقة التحكيم" },
  },
  {
    photo: `${BASE}/11.png`,
    firstName: { en: "Omar", fr: "Omar", ar: "عمر" },
    lastName: { en: "Cherif", fr: "Cherif", ar: "شريف" },
    role: { en: "Development Officer", fr: "Chargé du développement", ar: "مسؤول التطوير" },
  },
  {
    photo: `${BASE}/22.png`,
    firstName: { en: "Fatima", fr: "Fatima", ar: "فاطمة" },
    lastName: { en: "Belkacem", fr: "Belkacem", ar: "بلقاسم" },
    role: { en: "Board Member", fr: "Membre du bureau", ar: "عضو المكتب" },
  },
  {
    photo: `${BASE}/33.png`,
    firstName: { en: "Hocine", fr: "Hocine", ar: "حسين" },
    lastName: { en: "Taleb", fr: "Taleb", ar: "طالب" },
    role: { en: "Board Member", fr: "Membre du bureau", ar: "عضو المكتب" },
  },
];

export function pickMemberText<T extends { en: string; fr: string; ar: string }>(
  value: T,
  lang: string,
): string {
  if (lang === "ar") return value.ar;
  if (lang === "fr") return value.fr;
  return value.en;
}
