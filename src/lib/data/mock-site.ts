import photo1 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.48.webp";
import photo2 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.02.webp";
import photo3 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.06.webp";
import photo4 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.47.webp";
import photo5 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.05.webp";
import photo6 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.42.webp";
import photo7 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.03.webp";
import photo8 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.00.51.webp";
import photo9 from "@/assets/images/WhatsApp Image 2026-06-22 at 10.01.01.webp";

type L = { ar: string; fr: string };

export const OFFICIALS = [
  { id: "1", name: { ar: "كريم بن عودة", fr: "Karim Ben Aouda" }, role: { ar: "حكم دولي", fr: "Arbitre international" }, region: { ar: "الجزائر", fr: "Alger" } },
  { id: "2", name: { ar: "سارة حمودي", fr: "Sara Hamoudi" }, role: { ar: "حكم وطني", fr: "Arbitre national" }, region: { ar: "وهران", fr: "Oran" } },
  { id: "3", name: { ar: "يوسف مرابط", fr: "Youssef Marrabet" }, role: { ar: "حكم إقليمي", fr: "Arbitre régional" }, region: { ar: "قسنطينة", fr: "Constantine" } },
  { id: "4", name: { ar: "نادية بلحاج", fr: "Nadia Belhadj" }, role: { ar: "حكم دولي", fr: "Arbitre international" }, region: { ar: "عنابة", fr: "Annaba" } },
  { id: "5", name: { ar: "أمين زروال", fr: "Amine Zeroual" }, role: { ar: "حكم وطني", fr: "Arbitre national" }, region: { ar: "سطيف", fr: "Sétif" } },
  { id: "6", name: { ar: "ليلى قادري", fr: "Leïla Kadri" }, role: { ar: "حكم إقليمي", fr: "Arbitre régional" }, region: { ar: "باتنة", fr: "Batna" } },
  { id: "7", name: { ar: "فاروق سليماني", fr: "Farouk Slimani" }, role: { ar: "حكم دولي", fr: "Arbitre international" }, region: { ar: "البليدة", fr: "Blida" } },
  { id: "8", name: { ar: "رشida مزياني", fr: "Rachida Meziani" }, role: { ar: "حكم وطني", fr: "Arbitre national" }, region: { ar: "تيزي وزou", fr: "Tizi Ouzou" } },
  { id: "9", name: { ar: "بلال حجاج", fr: "Bilal Hedjadj" }, role: { ar: "حكم إقليمي", fr: "Arbitre régional" }, region: { ar: "بجاية", fr: "Béjaïa" } },
  { id: "10", name: { ar: "سميرة بوعزة", fr: "Samira Bouazza" }, role: { ar: "حكم وطني", fr: "Arbitre national" }, region: { ar: "وهران", fr: "Oran" } },
];

export const PLAYERS = [
  { id: "1", name: { ar: "محمد عبد الرحيم", fr: "Mohamed Abderrahim" }, club: { ar: "نادي الجزائر", fr: "Club Alger" }, category: { ar: "أكابر", fr: "Seniors" }, wilaya: { ar: "الجزائر", fr: "Alger" }, ranking: 12, img: photo1 },
  { id: "2", name: { ar: "آية بن سالم", fr: "Aya Ben Salem" }, club: { ar: "نادي وهران", fr: "Club Oran" }, category: { ar: "إناث", fr: "Dames" }, wilaya: { ar: "وهران", fr: "Oran" }, ranking: 8, img: photo2 },
  { id: "3", name: { ar: "رياض قاسمي", fr: "Riadh Kacem" }, club: { ar: "نادي قسنطينة", fr: "Club Constantine" }, category: { ar: "أواسط", fr: "Cadets" }, wilaya: { ar: "قسنطينة", fr: "Constantine" }, ranking: 24, img: photo3 },
  { id: "4", name: { ar: "إيناس حداد", fr: "Inès Haddad" }, club: { ar: "نادي سطيف", fr: "Club Sétif" }, category: { ar: "أصاغر", fr: "Juniors" }, wilaya: { ar: "سطيف", fr: "Sétif" }, ranking: 31, img: photo4 },
  { id: "5", name: { ar: "أنيس بومدين", fr: "Anis Boumediene" }, club: { ar: "نادي عنابة", fr: "Club Annaba" }, category: { ar: "أكابر", fr: "Seniors" }, wilaya: { ar: "عنابة", fr: "Annaba" }, ranking: 19, img: photo5 },
  { id: "6", name: { ar: "هاجر مسعودي", fr: "Hajar Messaoudi" }, club: { ar: "نادي البليدة", fr: "Club Blida" }, category: { ar: "إناث", fr: "Dames" }, wilaya: { ar: "البليدة", fr: "Blida" }, ranking: 15, img: photo6 },
  { id: "7", name: { ar: "ياسين براهimi", fr: "Yacine Brahimi" }, club: { ar: "MC Alger Badminton", fr: "MC Alger Badminton" }, category: { ar: "أكابر", fr: "Seniors" }, wilaya: { ar: "الجزائر", fr: "Alger" }, ranking: 6, img: photo7 },
  { id: "8", name: { ar: "سلma كhelifi", fr: "Salma Khelifi" }, club: { ar: "USM Oran Shuttle", fr: "USM Oran Shuttle" }, category: { ar: "إناث", fr: "Dames" }, wilaya: { ar: "وهران", fr: "Oran" }, ranking: 11, img: photo8 },
  { id: "9", name: { ar: "كريم زروقي", fr: "Karim Zerouki" }, club: { ar: "JS Constantine BC", fr: "JS Constantine BC" }, category: { ar: "أواسط", fr: "Cadets" }, wilaya: { ar: "قسنطينة", fr: "Constantine" }, ranking: 28, img: photo9 },
  { id: "10", name: { ar: "نور الهدى عيسani", fr: "Nour El Houda Issani" }, club: { ar: "Sétif Badminton Académie", fr: "Sétif Badminton Académie" }, category: { ar: "أصاغر", fr: "Juniors" }, wilaya: { ar: "سطيف", fr: "Sétif" }, ranking: 22, img: photo1 },
  { id: "11", name: { ar: "أمين رحmani", fr: "Amine Rahmani" }, club: { ar: "Tlemcen Shuttle Club", fr: "Tlemcen Shuttle Club" }, category: { ar: "أكابر", fr: "Seniors" }, wilaya: { ar: "تلمسان", fr: "Tlemcen" }, ranking: 17, img: photo2 },
  { id: "12", name: { ar: "دنيا بوzid", fr: "Donia Bouzid" }, club: { ar: "Annaba Smash Club", fr: "Annaba Smash Club" }, category: { ar: "إناث", fr: "Dames" }, wilaya: { ar: "عنابة", fr: "Annaba" }, ranking: 9, img: photo3 },
];

export const TOURNAMENTS = [
  { id: "e1", name: { ar: "البطولة الوطنية للأكابر", fr: "Championnat National Seniors" }, start: "2026-04-25", end: "2026-04-28", location: { ar: "قاعة OMS، الجزائر", fr: "Salle OMS, Alger" }, status: "upcoming" as const },
  { id: "e2", name: { ar: "الدورة الدولية للجزائر", fr: "Tournoi International d'Alger" }, start: "2026-05-05", end: "2026-05-09", location: { ar: "القبة، الجزائر", fr: "Coupole, Alger" }, status: "upcoming" as const },
  { id: "e5", name: { ar: "البطولة الوطنية للأصاغر", fr: "Championnat National Juniors" }, start: "2026-06-15", end: "2026-06-18", location: { ar: "قاعة محمد بوضياف، قسنطينة", fr: "Salle Boumediene, Constantine" }, status: "upcoming" as const },
  { id: "e6", name: { ar: "الأوپen de Sétif", fr: "Open de Sétif" }, start: "2026-07-10", end: "2026-07-12", location: { ar: "قاعة الرياضة، سطيف", fr: "Salle des Sports, Sétif" }, status: "upcoming" as const },
  { id: "e7", name: { ar: "بطولة شمال أفريقيا", fr: "Championnat Maghreb" }, start: "2026-08-20", end: "2026-08-24", location: { ar: "تونس العاصمة", fr: "Tunis, Tunisie" }, status: "upcoming" as const },
  { id: "e3", name: { ar: "بطولة أفريقيا", fr: "Championnat d'Afrique" }, start: "2025-11-18", end: "2025-11-23", location: { ar: "القاهرة، مصر", fr: "Le Caire, Égypte" }, status: "finished" as const },
  { id: "e4", name: { ar: "كأس الجزائر", fr: "Coupe d'Algérie" }, start: "2025-09-10", end: "2025-09-14", location: { ar: "وهران", fr: "Oran" }, status: "finished" as const },
  { id: "e8", name: { ar: "كأس الولايات", fr: "Coupe Inter-Wilayas" }, start: "2026-02-08", end: "2026-02-10", location: { ar: "البليدة", fr: "Blida" }, status: "finished" as const },
  { id: "e9", name: { ar: "ماسترز الأكابر", fr: "Masters Seniors Alger" }, start: "2026-01-14", end: "2026-01-16", location: { ar: "باب الزوار، الجزائر", fr: "Bab Ezzouar, Alger" }, status: "finished" as const },
  { id: "e10", name: { ar: "دورة وهران الدولية", fr: "Tournoi International d'Oran" }, start: "2025-12-05", end: "2025-12-08", location: { ar: "قاعة وهران، وهران", fr: "Salle Oranaise, Oran" }, status: "finished" as const },
];

export const MATCH_RESULTS = [
  { event: { ar: "كأس الجزائر", fr: "Coupe d'Algérie" }, player1: { ar: "م. عبد الرحيم", fr: "M. Abderrahim" }, player2: { ar: "أ. بومدين", fr: "A. Boumediene" }, score: "21-18, 21-15" },
  { event: { ar: "كأس الجزائر", fr: "Coupe d'Algérie" }, player1: { ar: "آ. بن سalem", fr: "A. Ben Salem" }, player2: { ar: "إ. حداد", fr: "I. Haddad" }, score: "21-12, 21-19" },
  { event: { ar: "بطولة أفريقيا", fr: "Championnat d'Afrique" }, player1: { ar: "م. عبد الرحيم", fr: "M. Abderrahim" }, player2: { ar: "لاعب مصري", fr: "Joueur égyptien" }, score: "21-17, 19-21, 21-16" },
  { event: { ar: "ماسترز الأكابر", fr: "Masters Seniors Alger" }, player1: { ar: "ي. براهimi", fr: "Y. Brahimi" }, player2: { ar: "أ. رحmani", fr: "A. Rahmani" }, score: "21-14, 21-11" },
  { event: { ar: "ماسترز الأكابر", fr: "Masters Seniors Alger" }, player1: { ar: "س. خلifi", fr: "S. Khelifi" }, player2: { ar: "د. بوzid", fr: "D. Bouzid" }, score: "21-19, 21-17" },
  { event: { ar: "كأس الولايات", fr: "Coupe Inter-Wilayas" }, player1: { ar: "ر. قاسمي", fr: "R. Kacem" }, player2: { ar: "ك. زروقي", fr: "K. Zerouki" }, score: "21-16, 18-21, 21-13" },
  { event: { ar: "دورة وهران الدولية", fr: "Tournoi International d'Oran" }, player1: { ar: "م. عبد الرحيم", fr: "M. Abderrahim" }, player2: { ar: "لاعب تونسي", fr: "Joueur tunisien" }, score: "21-10, 21-18" },
  { event: { ar: "دورة وهران الدولية", fr: "Tournoi International d'Oran" }, player1: { ar: "ه. مسoudi", fr: "H. Messaoudi" }, player2: { ar: "لاعبة مغربية", fr: "Joueuse marocaine" }, score: "21-15, 21-12" },
  { event: { ar: "بطولة أفريقيا", fr: "Championnat d'Afrique" }, player1: { ar: "ن. عيسani", fr: "N. Issani" }, player2: { ar: "لاعبة نيجيرية", fr: "Joueuse nigériane" }, score: "21-8, 21-6" },
];

export const ARCHIVE_YEARS = [
  { year: 2026, count: 8 },
  { year: 2025, count: 14 },
  { year: 2024, count: 18 },
  { year: 2023, count: 15 },
  { year: 2022, count: 11 },
];

export const SPONSORS = [
  { id: "s1", name: { ar: "موبيليس", fr: "Mobilis" }, tier: "gold" as const },
  { id: "s2", name: { ar: "سوناطراك", fr: "Sonatrach" }, tier: "gold" as const },
  { id: "s3", name: { ar: "يونيكس", fr: "YONEX" }, tier: "silver" as const },
  { id: "s4", name: { ar: "الخطوط الجوية الجزائرية", fr: "Air Algérie" }, tier: "silver" as const },
  { id: "s5", name: { ar: "بيك", fr: "PEAK" }, tier: "bronze" as const },
  { id: "s6", name: { ar: "BWF", fr: "BWF" }, tier: "bronze" as const },
];

export const MOCK_ARTICLES = [
  {
    img: photo1,
    cat: "national" as const,
    date: "2026-03-18",
    title: {
      en: "Junior national team wins gold at Oran international",
      fr: "L'équipe juniors remporte l'or à Oran",
      ar: "المنتخب الوطني للأصاغر يحرز الذهب بوهران",
    },
    excerpt: {
      en: "Algeria's young shuttlers dominated the Oran tournament with a sweeping performance.",
      fr: "Les jeunes algériens ont dominé le tournoi d'Oran.",
      ar: "هيمن لاعبو الجزائر الشباب على بطولة وهران بأداء مميز.",
    },
  },
  {
    img: photo2,
    cat: "international" as const,
    date: "2026-03-12",
    title: {
      en: "African Championship: Abderrahim into semi-final",
      fr: "Championnat d'Afrique : Abderrahim en demi-finale",
      ar: "بطولة أفريقيا: عبد الرحيم في نصف النهائي",
    },
    excerpt: {
      en: "A historic run for Algerian men's singles continues in Cairo.",
      fr: "Une épopée historique se poursuit au Caire.",
      ar: "مشوار تاريخي يتواصل بالقاهرة.",
    },
  },
  {
    img: photo3,
    cat: "national" as const,
    date: "2026-03-05",
    title: {
      en: "Senior national team training camp in Annaba",
      fr: "Stage de l'équipe senior à Annaba",
      ar: "تربص المنتخب للأكابر بعنابة",
    },
    excerpt: {
      en: "Two weeks of intense preparation ahead of upcoming continental events.",
      fr: "Deux semaines de préparation intense.",
      ar: "أسبوعان من التحضيرات المكثفة.",
    },
  },
  {
    img: photo4,
    cat: "national" as const,
    date: "2026-02-22",
    title: {
      en: "2026 licence campaign now open across all wilayas",
      fr: "Campagne de licences 2026 ouverte dans toutes les wilayas",
      ar: "انطلاق حملة الرخص الرياضية 2026 في جميع الولايات",
    },
    excerpt: {
      en: "Athletes and coaches can submit licence requests online through the federation portal.",
      fr: "Les athlètes et entraîneurs peuvent déposer leurs demandes en ligne.",
      ar: "يمكن للاعبين والمدربين تقديم طلبات الرخص عبر البوابة الإلكترونية.",
    },
  },
  {
    img: photo5,
    cat: "international" as const,
    date: "2026-02-10",
    title: {
      en: "Women's team clinches bronze at Mediterranean Games",
      fr: "L'équipe féminine décroche le bronze aux Jeux méditerranéens",
      ar: "المنتخب النسائي يحرز برونزية ألعاب المتوسط",
    },
    excerpt: {
      en: "Aya Ben Salem and Salma Khelifi led Algeria to a historic team medal.",
      fr: "Aya Ben Salem et Salma Khelifi mènent l'Algérie vers une médaille historique.",
      ar: "آية بن سالم وسلma خلifi تقودان الجزائر نحو ميدالية تاريخية.",
    },
  },
  {
    img: photo6,
    cat: "international" as const,
    date: "2026-01-28",
    title: {
      en: "Three Algerians enter BWF top 50 rankings",
      fr: "Trois Algériens entrent dans le top 50 BWF",
      ar: "ثلاثة جزائريين يدخلون أفضل 50 في ترتيب BWF",
    },
    excerpt: {
      en: "Mohamed Abderrahim reaches a career-high world ranking of 42.",
      fr: "Mohamed Abderrahim atteint son meilleur classement mondial : 42e.",
      ar: "محمد عبد الرحيم يحقق أفضل تصنيف عالمي له: المركز 42.",
    },
  },
  {
    img: photo7,
    cat: "youth" as const,
    date: "2026-01-15",
    title: {
      en: "MC Alger opens new high-performance training hall",
      fr: "MC Alger inaugure une nouvelle salle de haut niveau",
      ar: "MC Alger يفتتح قاعة تدريب جديدة للأداء العالي",
    },
    excerpt: {
      en: "Six courts and a fitness centre will serve elite and youth players in the capital.",
      fr: "Six terrains et une salle de fitness pour les élites et les jeunes.",
      ar: "ست خمسات وقاعة لياقة لخدمة النخبة والشباب في العاصمة.",
    },
  },
  {
    img: photo8,
    cat: "youth" as const,
    date: "2025-12-20",
    title: {
      en: "National youth development programme launched",
      fr: "Lancement du programme national de développement des jeunes",
      ar: "إطلاق البرنامج الوطني لتطوير الناشئين",
    },
    excerpt: {
      en: "120 young players selected from 48 clubs will join regional academies.",
      fr: "120 jeunes sélectionnés dans 48 clubs intègrent les académies régionales.",
      ar: "120 لاعباً شاباً من 48 نادياً ينضمون للأكاديميات الجهوية.",
    },
  },
  {
    img: photo9,
    cat: "national" as const,
    date: "2025-12-08",
    title: {
      en: "National coaches seminar held in Algiers",
      fr: "Séminaire national des entraîneurs à Alger",
      ar: "ندوة وطنية للمدربين بالجزائر العاصمة",
    },
    excerpt: {
      en: "Over 80 certified coaches attended workshops on modern training methods.",
      fr: "Plus de 80 entraîneurs certifiés aux ateliers sur les méthodes modernes.",
      ar: "أكثر من 80 مدرباً معتمداً في ورش حول أساليب التدريب الحديثة.",
    },
  },
];

export const PLAYER_BIOS: Record<string, { bio: L; achievements: L[] }> = {
  "1": {
    bio: {
      ar: "لاعب دولي جزائري متخصص في الفردي الرجالي. يمثل الاتحادية في البطولات القارية والدولية منذ 2018.",
      fr: "Joueur international algérien spécialisé en simple hommes. Représente la fédération en compétitions continentales et internationales depuis 2018.",
    },
    achievements: [
      { ar: "ذهبية بطولة شمال أفريقيا 2024", fr: "Or — Championnat d'Afrique du Nord 2024" },
      { ar: "نصف نهائي بطولة أفريقيا 2025", fr: "Demi-finale — Championnat d'Afrique 2025" },
      { ar: "بطل الجزائر 2023", fr: "Champion d'Algérie 2023" },
    ],
  },
  "2": {
    bio: {
      ar: "لاعبة دولية متخصصة في الفردي السيدات. من أبرز وجوه الريشة الطائرة النسائية في الجزائر.",
      fr: "Joueuse internationale spécialisée en simple dames. Figure emblématique du badminton féminin algérien.",
    },
    achievements: [
      { ar: "برونزية ألعاب المتوسط 2026", fr: "Bronze — Jeux méditerranéens 2026" },
      { ar: "بطلة الجزائر 2024", fr: "Championne d'Algérie 2024" },
    ],
  },
  "7": {
    bio: {
      ar: "متصدر الترتيب الوطني للرجال. يشارك في البطولات الدولية BWF منذ 2019.",
      fr: "N°1 national en simple hommes. Compétiteur BWF depuis 2019.",
    },
    achievements: [
      { ar: "فضية Open de Sétif 2025", fr: "Argent — Open de Sétif 2025" },
      { ar: "بطل Masters Seniors 2026", fr: "Champion Masters Seniors 2026" },
    ],
  },
};

export function pickL<T extends L>(obj: T, lang: "ar" | "fr" | "en"): string {
  if (lang === "fr") return obj.fr;
  return obj.ar;
}
