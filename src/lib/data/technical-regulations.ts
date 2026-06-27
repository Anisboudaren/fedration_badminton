export type Localized = { en: string; fr: string; ar: string };

export type RegulationHighlight = { label: Localized; value: Localized };

export type RegulationGroup = {
  title: Localized;
  items: Localized[];
};

export type RegulationSection = {
  id: string;
  title: Localized;
  summary?: Localized;
  body?: Localized[];
  highlights?: RegulationHighlight[];
  items?: Localized[];
  groups?: RegulationGroup[];
};

export const TECHNICAL_REGULATIONS = {
  title: {
    en: "Technical College — 2025-2026 Season",
    fr: "Collège Technique — Saison 2025-2026",
    ar: "اللجنة التقنية — الموسم 2025-2026",
  },
  sections: [
    {
      id: "overview",
      title: {
        en: "Official competition guide",
        fr: "Guide officiel des compétitions",
        ar: "الدليل الرسمي للبطولات",
      },
      summary: {
        en: "Key rules, deadlines and formats for the 2025-2026 season.",
        fr: "Règles, délais et formats essentiels pour la saison 2025-2026.",
        ar: "القواعد والآجال والصيغ الأساسية لموسم 2025-2026.",
      },
      body: [
        {
          en: "This page summarises the Technical College regulations published by the Algerian Badminton Federation (FAB). Clubs, leagues, athletes and coaches should use it as a quick reference before registering or competing.",
          fr: "Cette page résume le règlement du Collège Technique publié par la Fédération Algérienne de Badminton (FAB). Clubs, ligues, athlètes et entraîneurs peuvent s’y référer avant toute inscription ou participation.",
          ar: "تلخّص هذه الصفحة لائحة اللجنة التقنية الصادرة عن الاتحادية الجزائرية للريشة الطائرة. يمكن للأندية والروابط واللاعبين والمدربين الرجوع إليها قبل التسجيل أو المشاركة.",
        },
      ],
    },
    {
      id: "affiliation",
      title: {
        en: "Club & league affiliation",
        fr: "Affiliation des clubs et ligues",
        ar: "انخراط الأندية والروابط",
      },
      summary: {
        en: "Who can register, by when, and what documents are required.",
        fr: "Qui peut s’affilier, avant quelle date, et quelles pièces fournir.",
        ar: "من يمكنه الانخراط، والأجل النهائي، والوثائق المطلوبة.",
      },
      highlights: [
        {
          label: { en: "Deadline", fr: "Date limite", ar: "الأجل النهائي" },
          value: { en: "31 December 2025", fr: "31 décembre 2025", ar: "31 ديسمبر 2025" },
        },
        {
          label: { en: "Club fee", fr: "Frais club", ar: "رسوم النادي" },
          value: { en: "25,000 DA", fr: "25 000 DA", ar: "25 000 دج" },
        },
        {
          label: { en: "League fee", fr: "Frais ligue", ar: "رسوم الرابطة" },
          value: { en: "20,000 DA", fr: "20 000 DA", ar: "20 000 دج" },
        },
      ],
      body: [
        {
          en: "Any affiliation file submitted after the deadline will be automatically rejected and will not be considered for the sports season.",
          fr: "Tout dossier déposé après la date limite sera automatiquement refusé et ne sera pas pris en compte pour la saison sportive.",
          ar: "أي ملف يُودَع بعد الأجل النهائي يُرفض تلقائياً ولا يُؤخذ بعين الاعتبار للموسم الرياضي.",
        },
      ],
      groups: [
        {
          title: {
            en: "Club affiliation file",
            fr: "Dossier d’affiliation — Club",
            ar: "ملف انخراط النادي",
          },
          items: [
            {
              en: "Legalised copy of the club approval (agrément).",
              fr: "Agrément du club (copie légalisée).",
              ar: "اعتماد النادي (نسخة مصادق عليها).",
            },
            {
              en: "Executive board list, signed and stamped by the DJS.",
              fr: "Liste du Bureau Exécutif établie et signée, visée par la DJS.",
              ar: "لائحة المكتب التنفيذي موقعة ومختومة من مديرية الشباب والرياضة.",
            },
            {
              en: "List of badminton section members.",
              fr: "Liste des membres de la section Badminton.",
              ar: "لائحة أعضاء قسم الريشة الطائرة.",
            },
            {
              en: "Registration fee: 25,000 DA (cheque payable to the FAB).",
              fr: "Frais d’engagement : 25 000 DA (chèque au nom de la FAB).",
              ar: "رسوم الالتحاق: 25 000 دج (شيك باسم الاتحادية).",
            },
            {
              en: "Completed affiliation form (provided by the Federation).",
              fr: "Formulaire d’affiliation dûment rempli (fourni par la Fédération).",
              ar: "استمارة الانخراط معبأة (تُوفَّر من الاتحادية).",
            },
            {
              en: "Minutes of the general assembly (huissier de justice).",
              fr: "PV de l’assemblée générale (huissier de justice).",
              ar: "محضر الجمعية العامة (عدل منفذ).",
            },
            {
              en: "Insurance list for athletes and staff.",
              fr: "Liste d’assurance des athlètes et de l’encadrement.",
              ar: "لائحة تأمين الرياضيين والطاقم.",
            },
          ],
        },
        {
          title: {
            en: "League affiliation file",
            fr: "Dossier d’affiliation — Ligue",
            ar: "ملف انخراط الرابطة",
          },
          items: [
            {
              en: "Legalised copy of the league approval.",
              fr: "Agrément de la ligue (copie légalisée).",
              ar: "اعتماد الرابطة (نسخة مصادق عليها).",
            },
            {
              en: "Executive board list, signed and stamped by the DJS.",
              fr: "Liste du Bureau Exécutif établie et signée, visée par la DJS.",
              ar: "لائحة المكتب التنفيذي موقعة ومختومة من مديرية الشباب والرياضة.",
            },
            {
              en: "Registration fee: 20,000 DA (cheque payable to the FAB).",
              fr: "Frais d’engagement : 20 000 DA (chèque au nom de la FAB).",
              ar: "رسوم الالتحاق: 20 000 دج (شيك باسم الاتحادية).",
            },
            {
              en: "Moral and financial report for the 2024-2025 season.",
              fr: "Bilan moral et financier saison 2024-2025.",
              ar: "التقرير الأخلاقي والمالي لموسم 2024-2025.",
            },
            {
              en: "Completed affiliation form and general assembly minutes.",
              fr: "Formulaire d’affiliation rempli et PV de l’AGE.",
              ar: "استمارة الانخراط ومحضر الجمعية العامة.",
            },
          ],
        },
      ],
    },
    {
      id: "licences",
      title: {
        en: "Athlete & coach licences",
        fr: "Licences athlètes et entraîneurs",
        ar: "رخص الرياضيين والمدربين",
      },
      summary: {
        en: "Every participant must hold a valid FAB licence.",
        fr: "Chaque participant doit détenir une licence FAB valide.",
        ar: "يجب على كل مشارك امتلاك رخصة سارية من الاتحادية.",
      },
      highlights: [
        {
          label: { en: "Deadline", fr: "Date limite", ar: "الأجل النهائي" },
          value: { en: "31 December 2025", fr: "31 décembre 2025", ar: "31 ديسمبر 2025" },
        },
      ],
      body: [
        {
          en: "No athlete, coach or staff member may take part in any FAB event without a valid individual licence.",
          fr: "Aucun athlète, entraîneur ou encadreur ne peut participer à une activité fédérale sans licence individuelle valide.",
          ar: "لا يُسمح لأي رياضي أو مدرب أو عضو طاقم بالمشاركة في نشاط فدرالي دون رخصة فردية سارية.",
        },
        {
          en: "A dedicated online platform will be opened for licence registration, document upload, tracking and validation. Access details will be announced soon.",
          fr: "Une plateforme numérique dédiée permettra l’enregistrement, le dépôt des documents, le suivi et la validation des licences. Les modalités d’accès seront communiquées prochainement.",
          ar: "ستُفتح منصة رقمية للتسجيل ورفع الوثائق ومتابعة الطلبات والمصادقة على الرخص. سيتم الإعلان عن طريقة الوصول قريباً.",
        },
      ],
      groups: [
        {
          title: {
            en: "Athlete licence file",
            fr: "Dossier licence — Athlète",
            ar: "ملف رخصة الرياضي",
          },
          items: [
            { en: "Photo", fr: "Photo", ar: "صورة شمسية" },
            { en: "Birth certificate", fr: "Acte de naissance", ar: "شهادة الميلاد" },
            { en: "Medical fitness certificate", fr: "Certificat médical de bonne santé", ar: "شهادة طبية باللياقة" },
            {
              en: "Anti-doping certificate (required for +19, U19 and U17).",
              fr: "Certificat de non-dopage (+19, U19, U17).",
              ar: "شهادة خلو من المنشطات (+19، U19، U17).",
            },
            { en: "Licence fee", fr: "Frais de licence", ar: "رسوم الرخصة" },
            {
              en: "Completed form (provided by the Federation).",
              fr: "Formulaire rempli (fourni par la Fédération).",
              ar: "استمارة معبأة (من الاتحادية).",
            },
          ],
        },
        {
          title: {
            en: "Coach licence file",
            fr: "Dossier licence — Entraîneur",
            ar: "ملف رخصة المدرب",
          },
          items: [
            { en: "Photo", fr: "Photo", ar: "صورة شمسية" },
            { en: "Birth certificate", fr: "Acte de naissance", ar: "شهادة الميلاد" },
            { en: "Medical fitness certificate", fr: "Certificat médical de bonne santé", ar: "شهادة طبية باللياقة" },
            { en: "Anti-doping certificate", fr: "Certificat de non-dopage", ar: "شهادة خلو من المنشطات" },
            { en: "Licence fee", fr: "Frais de licence", ar: "رسوم الرخصة" },
            {
              en: "Badminton diploma or attestation.",
              fr: "Diplôme ou attestation de Badminton.",
              ar: "شهادة أو دبلوم في الريشة الطائرة.",
            },
            {
              en: "Completed form (provided by the Federation).",
              fr: "Formulaire rempli (fourni par la Fédération).",
              ar: "استمارة معبأة (من الاتحادية).",
            },
          ],
        },
      ],
    },
    {
      id: "national-individual",
      title: {
        en: "National individual championship",
        fr: "Championnat national individuel",
        ar: "البطولة الوطنية الفردية",
      },
      summary: {
        en: "Five events over three match days — singles and doubles.",
        fr: "Cinq tableaux sur trois journées — simples et doubles.",
        ar: "خمس منافسات على ثلاث أيام — فردي وزوجي.",
      },
      highlights: [
        {
          label: { en: "Events", fr: "Tableaux", ar: "الفئات" },
          value: { en: "MS, WS, MD, WD, XD", fr: "SH, SD, DH, DD, Mixte", ar: "رجال، سيدات، زوجي رجال، زوجي سيدات، مختلط" },
        },
        {
          label: { en: "Match days", fr: "Journées", ar: "الأيام" },
          value: { en: "3", fr: "3", ar: "3" },
        },
        {
          label: { en: "Club entry fee", fr: "Frais d’engagement", ar: "رسوم الاشتراك" },
          value: { en: "5,000 DA", fr: "5 000 DA", ar: "5 000 دج" },
        },
      ],
      body: [
        {
          en: "Open to affiliated clubs in good standing and athletes competing abroad. Overall champion is decided on total points across all three days.",
          fr: "Réservé aux clubs affiliés en règle et aux athlètes évoluant à l’étranger. Le champion est désigné sur la base du total des points des trois journées.",
          ar: "مفتوحة للأندية المنخرطة في وضعية قانونية والرياضيين المنافسين بالخارج. يُحدَّد البطل حسب مجموع النقاط على مدار الأيام الثلاثة.",
        },
      ],
      items: [
        {
          en: "Singles (men & women): two phases per day — elimination then main draw of 16. Top 8 from the previous season skip the first elimination round.",
          fr: "Simples (H & F) : deux phases par journée — éliminatoire puis tableau principal de 16. Les 8 premiers de la saison précédente sont exemptés du 1er tour éliminatoire.",
          ar: "الفردي (رجال وسيدات): مرحلتان في كل يوم — إقصاء ثم دور رئيسي لـ16 لاعباً. يُعفى أفضل 8 من الموسم السابق من الدور الأول.",
        },
        {
          en: "Doubles events are played in a straight knockout format.",
          fr: "Les doubles se jouent en système éliminatoire direct.",
          ar: "تُلعب منافسات الزوجي بنظام الإقصاء المباشر.",
        },
        {
          en: "A player may enter at most two different events.",
          fr: "Un joueur ne peut participer qu’à deux tableaux maximum.",
          ar: "لا يمكن للاعب المشاركة في أكثر من منافستين.",
        },
        {
          en: "Boys U17 and girls U15 may compete in the senior individual championship (cardiologist certificate + ECG required).",
          fr: "Garçons U17 et filles U15 autorisés en séniors (certificat cardiologue + ECG obligatoires).",
          ar: "يُسمح لأولاد U17 وبنات U15 بالمشاركة في الأكابر (شهادة طبيب القلب + تخطيط القلب إلزاميان).",
        },
        {
          en: "Unjustified withdrawal: the athlete loses that day’s points and is eliminated from other events.",
          fr: "Abandon non justifié : perte des points de la journée et élimination des autres tableaux.",
          ar: "الانسحاب غير المبرر: فقدان نقاط اليوم والإقصاء من باقي المنافسات.",
        },
        {
          en: "Played under BWF and FAB rules. Unlisted cases are decided by the Federation.",
          fr: "Compétition selon les règles BWF et FAB. Cas non prévus : décision de la Fédération.",
          ar: "تُنظم وفق قواعد الاتحاد العالمي والاتحادية. الحالات غير المنصوص عليها تُحسم من طرف الاتحادية.",
        },
      ],
    },
    {
      id: "individual-points",
      title: {
        en: "Individual championship — points",
        fr: "Barème — Championnat individuel",
        ar: "نظام النقاط — البطولة الفردية",
      },
      summary: {
        en: "How ranking points are awarded per round.",
        fr: "Attribution des points de classement par tour.",
        ar: "كيفية احتساب نقاط الترتيب في كل دور.",
      },
      highlights: [
        { label: { en: "Winner", fr: "Vainqueur", ar: "الفائز" }, value: { en: "150 pts", fr: "150 pts", ar: "150 نقطة" } },
        { label: { en: "2nd place", fr: "2e place", ar: "المركز 2" }, value: { en: "130 pts", fr: "130 pts", ar: "130 نقطة" } },
        { label: { en: "3rd place", fr: "3e place", ar: "المركز 3" }, value: { en: "110 pts", fr: "110 pts", ar: "110 نقطة" } },
        { label: { en: "4th place", fr: "4e place", ar: "المركز 4" }, value: { en: "90 pts", fr: "90 pts", ar: "90 نقطة" } },
        {
          label: { en: "Per win", fr: "Par victoire", ar: "لكل فوز" },
          value: { en: "+20 pts", fr: "+20 pts", ar: "+20 نقطة" },
        },
      ],
      items: [
        {
          en: "Seeding — Round 1: based on previous season. Round 2: previous round. Round 3: cumulative points from rounds 1 & 2.",
          fr: "Têtes de série — Tour 1 : saison précédente. Tour 2 : tour précédent. Tour 3 : cumul des points des tours 1 et 2.",
          ar: "التصنيف — الدور 1: الموسم السابق. الدور 2: الدور السابق. الدور 3: مجموع نقاط الدورين 1 و2.",
        },
        {
          en: "Seeds per draw size: 16 → 2 | 32 → 4 | 64 → 8 | 120 → 16.",
          fr: "Têtes de série par tableau : 16 → 2 | 32 → 4 | 64 → 8 | 120 → 16.",
          ar: "عدد المصنفين: 16 → 2 | 32 → 4 | 64 → 8 | 120 → 16.",
        },
      ],
    },
    {
      id: "master",
      title: {
        en: "Master Seniors competition",
        fr: "Compétition Master Seniors",
        ar: "بطولة الماستر للأكابر",
      },
      summary: {
        en: "Elite round-robin for the top 8 men and 8 women.",
        fr: "Tournoi tous contre tous pour les 8 meilleurs H et F.",
        ar: "نظام الدوري لأفضل 8 لاعبين و8 لاعبات.",
      },
      body: [
        {
          en: "The Master brings together the country’s best seniors in separate men’s and women’s singles draws. Qualification is based on the national ranking after each individual championship round; the technical cell may grant wildcards.",
          fr: "Le Master réunit les meilleurs seniors en simple hommes et simple dames. La qualification se fait sur le classement national après chaque tour du championnat individuel ; la cellule technique peut accorder des repêchages.",
          ar: "تجمع بطولة الماستر أفضل لاعبي ولاعبات الأكابر في الفردي. التأهل يعتمد على الترتيب الوطني بعد كل دور من البطولة الفردية، ويمكن للجنة التقنية منح بطاقات wildcard.",
        },
      ],
      highlights: [
        { label: { en: "Format", fr: "Format", ar: "الصيغة" }, value: { en: "Round-robin, 3 phases", fr: "Tous contre tous, 3 phases", ar: "دوري، 3 مراحل" } },
        { label: { en: "Win", fr: "Victoire", ar: "فوز" }, value: { en: "2 pts", fr: "2 pts", ar: "2 نقطة" } },
        { label: { en: "Loss", fr: "Défaite", ar: "خسارة" }, value: { en: "1 pt", fr: "1 pt", ar: "1 نقطة" } },
        { label: { en: "Walkover", fr: "Forfait", ar: "انسحاب" }, value: { en: "0 pt", fr: "0 pt", ar: "0 نقطة" } },
      ],
      items: [
        {
          en: "Bonus: +0.5 pt for a win in 2 sets or a loss in 3 sets.",
          fr: "Bonus : +0,5 pt pour victoire en 2 sets ou défaite en 3 sets.",
          ar: "مكافأة: +0.5 نقطة للفوز في مجموعتين أو الخسارة في ثلاث مجموعات.",
        },
        {
          en: "Tie-break order: total points → wins → point average → head-to-head → draw.",
          fr: "Départage : points totaux → victoires → différence de points → confrontations directes → tirage au sort.",
          ar: "كسر التعادل: مجموع النقاط ← عدد الانتصارات ← فارق النقاط ← المواجهة المباشرة ← قرعة.",
        },
      ],
    },
    {
      id: "team-championship",
      title: {
        en: "National team championship",
        fr: "Championnat national par équipes",
        ar: "البطولة الوطنية للفرق",
      },
      summary: {
        en: "Elite & Division 1 — three match days, five ties per match.",
        fr: "Élite & Division 1 — trois journées, cinq épreuves par rencontre.",
        ar: "النخبة والدرجة الأولى — ثلاث أيام، خمس مواجهات في كل لقاء.",
      },
      highlights: [
        {
          label: { en: "Elite teams", fr: "Équipes Élite", ar: "فرق النخبة" },
          value: { en: "10 clubs", fr: "10 clubs", ar: "10 أندية" },
        },
        {
          label: { en: "Final format", fr: "Finale", ar: "النهائي" },
          value: { en: "First to 5 wins", fr: "5 victoires", ar: "5 انتصارات" },
        },
      ],
      body: [
        {
          en: "Elite: two groups of five (round-robin), top two per group advance to semi-finals (A1 vs B2, B1 vs A2). Division 1 format depends on entries: pools if 6+ teams, otherwise round-robin.",
          fr: "Élite : deux poules de cinq (tous contre tous), les deux premiers de chaque poule accèdent aux demi-finales (A1-B2, B1-A2). Division 1 : poules si 6 clubs ou plus, sinon tous contre tous.",
          ar: "النخبة: مجموعتان من خمسة أندية (دوري)، يتأهل الأول والثاني من كل مجموعة لنصف النهائي. الدرجة الأولى: مجموعات إذا شارك 6 أندية فأكثر، وإلا دوري كامل.",
        },
      ],
      items: [
        {
          en: "Match order: men’s singles → women’s singles → men’s doubles → women’s doubles → mixed doubles.",
          fr: "Ordre des épreuves : SH → SD → DH → DD → Mixte.",
          ar: "ترتيب المواجهات: فردي رجال ← فردي سيدات ← زوجي رجال ← زوجي سيدات ← مختلط.",
        },
        {
          en: "Team must include at least 2 women and 2 men. No athlete plays more than 3 events.",
          fr: "Équipe : minimum 2 filles et 2 garçons. Aucun athlète ne joue plus de 3 épreuves.",
          ar: "الفريق: لاعبتان ولاعبان على الأقل. لا يلعب أي رياضي أكثر من 3 منافسات.",
        },
        {
          en: "Elite points per day (top 10): 1000, 900, 800… down to 100. Division 1 uses a reduced scale (100, 90, 80…).",
          fr: "Points Élite par journée (top 10) : 1000, 900, 800… jusqu’à 100. Division 1 : barème réduit (100, 90, 80…).",
          ar: "نقاط النخبة لكل يوم (أفضل 10): 1000، 900، 800… حتى 100. الدرجة الأولى بمقياس أقل.",
        },
        {
          en: "Overall ranking valid only if the team competes in all 3 days. Unjustified absence = 0 points for that day.",
          fr: "Classement général valide si participation aux 3 journées. Absence non justifiée = 0 point pour la journée.",
          ar: "الترتيب العام ساري إذا شارك الفريق في الأيام الثلاثة. الغياب غير المبرر = 0 نقطة لذلك اليوم.",
        },
      ],
    },
    {
      id: "youth",
      title: {
        en: "Youth competitions",
        fr: "Compétitions jeunes",
        ar: "بطولات الشباب",
      },
      summary: {
        en: "Young talents, youth teams and age-category rules.",
        fr: "Jeunes talents, équipes jeunes et catégories d’âge.",
        ar: "مواهب الشباب، فرق الناشئين وقواعد الفئات العمرية.",
      },
      groups: [
        {
          title: {
            en: "National Young Talents (U13–U19)",
            fr: "Championnat national Jeunes Talents (U13–U19)",
            ar: "بطولة المواهب الشبابية (U13–U19)",
          },
          items: [
            {
              en: "Singles only. One national elimination day (pre-selection) + two national round-robin days.",
              fr: "Simple uniquement. Une journée éliminatoire nationale + deux journées tous contre tous.",
              ar: "فردي فقط. يوم إقصاء وطني + يومان بنظام الدوري.",
            },
            {
              en: "Top 8 qualify for the national round-robin phase. Season champion decided on cumulative points.",
              fr: "Les 8 premiers accèdent à la phase nationale. Champion sur cumul des points.",
              ar: "يتأهل أفضل 8 للمرحلة الوطنية. البطل حسب مجموع النقاط.",
            },
            {
              en: "No age overruling allowed. Same Master-style point system (2/1/0 + bonuses).",
              fr: "Aucun surclassement autorisé. Même barème de points que le Master.",
              ar: "لا يُسمح بالتصعيد العمري. نفس نظام نقاط الماستر.",
            },
          ],
        },
        {
          title: {
            en: "National youth team championship (U15–U19)",
            fr: "Championnat national par équipe U15–U19",
            ar: "البطولة الوطنية للفرق U15–U19",
          },
          items: [
            {
              en: "Single round. Pool or round-robin depending on entries. Finals played to 3 wins.",
              fr: "Un seul tour. Poules ou tous contre tous selon les engagés. Finales au score de 3 victoires.",
              ar: "دور واحد. مجموعات أو دوري حسب المشاركين. النهائي حتى 3 انتصارات.",
            },
            {
              en: "Entry fee: 5,000 DA. Each athlete plays only in their own age category.",
              fr: "Frais d’engagement : 5 000 DA. Chaque athlète joue dans sa catégorie d’âge.",
              ar: "رسوم الاشتراك: 5 000 دج. كل رياضي يلعب في فئته العمرية فقط.",
            },
            {
              en: "No player may play more than two consecutive matches.",
              fr: "Aucun joueur ne dispute plus de deux matchs consécutifs.",
              ar: "لا يلعب أي لاعب أكثر من مباراتين متتاليتين.",
            },
          ],
        },
      ],
    },
    {
      id: "age-categories",
      title: {
        en: "Age categories 2025/2026",
        fr: "Catégories d’âge 2025/2026",
        ar: "الفئات العمرية 2025/2026",
      },
      summary: {
        en: "Birth years used to determine competitive age groups.",
        fr: "Années de naissance pour déterminer les catégories.",
        ar: "سنوات الميلاد لتحديد الفئات العمرية.",
      },
      highlights: [
        { label: { en: "U11", fr: "U11", ar: "U11" }, value: { en: "2016–2017", fr: "2016–2017", ar: "2016–2017" } },
        { label: { en: "U13", fr: "U13", ar: "U13" }, value: { en: "2014–2015", fr: "2014–2015", ar: "2014–2015" } },
        { label: { en: "U15", fr: "U15", ar: "U15" }, value: { en: "2012–2013", fr: "2012–2013", ar: "2012–2013" } },
        { label: { en: "U17", fr: "U17", ar: "U17" }, value: { en: "2010–2011", fr: "2010–2011", ar: "2010–2011" } },
        { label: { en: "U19", fr: "U19", ar: "U19" }, value: { en: "2008–2009", fr: "2008–2009", ar: "2008–2009" } },
        { label: { en: "Seniors (+19)", fr: "Séniors (+19)", ar: "أكابر (+19)" }, value: { en: "2007 and earlier", fr: "2007 et avant", ar: "2007 فما قبل" } },
      ],
    },
    {
      id: "algeria-cup",
      title: {
        en: "Algeria Cup 2025–2026",
        fr: "Coupe d’Algérie 2025–2026",
        ar: "كأس الجزائر 2025–2026",
      },
      summary: {
        en: "Knockout tournament across all age groups.",
        fr: "Tournoi à élimination directe, toutes catégories.",
        ar: "بطولة إقصاء لجميع الفئات العمرية.",
      },
      highlights: [
        {
          label: { en: "Entry fee", fr: "Frais d’engagement", ar: "رسوم الاشتراك" },
          value: { en: "5,000 DA", fr: "5 000 DA", ar: "5 000 دج" },
        },
        {
          label: { en: "Seniors scoring", fr: "Score séniors", ar: "نظام الأكابر" },
          value: { en: "Best of 3 × 15 pts", fr: "3 manches × 15 pts", ar: "3 مجموعات × 15 نقطة" },
        },
        {
          label: { en: "Youth scoring", fr: "Score jeunes", ar: "نظام الناشئين" },
          value: { en: "Best of 2 × 15 pts", fr: "2 manches × 15 pts", ar: "2 مجموعة × 15 نقطة" },
        },
      ],
      items: [
        {
          en: "Categories: seniors (5 events), U19, U17, U15, U13 and U11 — boys and girls singles.",
          fr: "Catégories : séniors (5 épreuves), U19, U17, U15, U13 et U11 — simples garçons et filles.",
          ar: "الفئات: أكابر (5 منافسات)، U19، U17، U15، U13 وU11 — فردي أولاد وبنات.",
        },
        {
          en: "Open to affiliated clubs in good standing. No individual entries outside club representation.",
          fr: "Réservé aux clubs affiliés en règle. Pas de participation individuelle hors club.",
          ar: "للأندية المنخرطة في وضعية قانونية. لا مشاركة فردية خارج النادي.",
        },
        {
          en: "Seeding from young talents and current-season individual rankings. All entries via the Federation platform only.",
          fr: "Têtes de série issues des jeunes talents et du classement individuel en cours. Engagements uniquement via la plateforme fédérale.",
          ar: "التصنيف من مواهب الشباب والترتيب الفردي للموسم. التسجيل حصرياً عبر منصة الاتحادية.",
        },
        {
          en: "Winners receive medal + diploma + trophy; 2nd and 3rd receive medal + diploma. Senior points count toward Elite team ranking.",
          fr: "Vainqueurs : médaille + diplôme + trophée ; 2e et 3e : médaille + diplôme. Points séniors comptés pour le classement Élite.",
          ar: "الفائزون: ميدالية + شهادة + كأس؛ المركز 2 و3: ميدالية + شهادة. نقاط الأكابر تُحتسب لترتيب النخبة.",
        },
      ],
    },
    {
      id: "national-selection",
      title: {
        en: "National team selection",
        fr: "Sélection des équipes nationales",
        ar: "اختيار المنتخبات الوطنية",
      },
      summary: {
        en: "How athletes are chosen for international events.",
        fr: "Critères de sélection pour les compétitions internationales.",
        ar: "معايير اختيار الرياضيين للمنافسات الدولية.",
      },
      body: [
        {
          en: "Selection aims to field the most competitive and representative squads for international championships, based on performance, commitment and medical fitness.",
          fr: "La sélection vise à constituer des équipes compétitives et représentatives pour les championnats internationaux, selon la performance, l’engagement et l’aptitude médicale.",
          ar: "تهدف الاختيارات إلى تشكيل منتخبات تنافسية وممثِّلة للبطولات الدولية، وفق الأداء والالتزام واللياقة الطبية.",
        },
      ],
      items: [
        {
          en: "Sporting criteria: national ranking, individual championship, Master, BWF-sanctioned tournaments.",
          fr: "Critères sportifs : classement national, championnat individuel, Master, tournois homologués BWF.",
          ar: "معايير رياضية: الترتيب الوطني، البطولة الفردية، الماستر، البطولات المعتمدة من الاتحاد العالمي.",
        },
        {
          en: "Technical & physical: fitness, skill level, tactics and season progression (assessed by coach / DTN).",
          fr: "Technique & physique : condition, niveau technique, tactique et progression (évalués par l’entraîneur / DTN).",
          ar: "تقني وبدني: اللياقة، المستوى التقني، التكتيك والتطور (تقييم المدرب والمدير التقني).",
        },
        {
          en: "Medical: valid certificate, no injury preventing competition.",
          fr: "Médical : certificat valide, absence de blessure incompatible avec la compétition.",
          ar: "طبي: شهادة سارية، وعدم وجود إصابة تمنع المشاركة.",
        },
        {
          en: "Commitment: training attendance (~90%), national camps, sporting behaviour.",
          fr: "Engagement : assiduité aux entraînements (~90 %), stages nationaux, comportement sportif.",
          ar: "الالتزام: حضور التدريبات (~90%)، المعسكرات الوطنية، السلوك الرياضي.",
        },
        {
          en: "Final decision by head coach, technical director and sports commission. Athletes may request a review within 48 h of publication.",
          fr: "Décision finale : entraîneur principal, directeur technique et commission sportive. Révision possible sous 48 h après publication.",
          ar: "القرار النهائي: المدرب الرئيسي والمدير التقني واللجنة الرياضية. يمكن طلب مراجعة خلال 48 ساعة من النشر.",
        },
      ],
    },
  ] satisfies RegulationSection[],
} as const;

export function pickReg(text: Localized, lang: string): string {
  if (lang === "ar") return text.ar;
  if (lang === "fr") return text.fr;
  return text.en;
}
