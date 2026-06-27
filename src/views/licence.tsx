"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  IdCard,
  Stethoscope,
  Upload,
  User,
  Users,
  X,
  Info,
} from "lucide-react";
import logo from "@/assets/main logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/i18n/I18nProvider";
import { WILAYAS } from "@/lib/data/wilayas";
import { saveLicenceRequest } from "@/lib/admin/content-store";
import { cn, assetUrl } from "@/lib/utils";

type L = { en: string; fr: string; ar: string };
const t3 = (o: L, lang: string) => (lang === "ar" ? o.ar : lang === "fr" ? o.fr : o.en);

const COPY = {
  title: { en: "Licence application", fr: "Demande de licence", ar: "طلب رخصة" },
  subtitle: {
    en: "Apply for your federal badminton licence in a few guided steps.",
    fr: "Demandez votre licence fédérale en quelques étapes guidées.",
    ar: "قدّم طلب رخصتك الفدرالية في خطوات بسيطة وموجّهة.",
  },
  steps: [
    { en: "Identity", fr: "Identité", ar: "الهوية" },
    { en: "Club", fr: "Club", ar: "النادي" },
    { en: "Documents", fr: "Documents", ar: "الوثائق" },
    { en: "Review", fr: "Vérification", ar: "المراجعة" },
  ],
  licenceType: { en: "Licence type", fr: "Type de licence", ar: "نوع الرخصة" },
  athlete: { en: "Athlete", fr: "Athlète", ar: "رياضي" },
  coach: { en: "Coach", fr: "Entraîneur", ar: "مدرب" },
  fullName: { en: "Full name", fr: "Nom complet", ar: "الاسم الكامل" },
  birthDate: { en: "Date of birth", fr: "Date de naissance", ar: "تاريخ الميلاد" },
  gender: { en: "Gender", fr: "Genre", ar: "الجنس" },
  male: { en: "Male", fr: "Homme", ar: "ذكر" },
  female: { en: "Female", fr: "Femme", ar: "أنثى" },
  wilaya: { en: "Wilaya", fr: "Wilaya", ar: "الولاية" },
  club: { en: "Club", fr: "Club", ar: "النادي" },
  category: { en: "Age category", fr: "Catégorie d'âge", ar: "الفئة العمرية" },
  phone: { en: "Phone", fr: "Téléphone", ar: "الهاتف" },
  email: { en: "Email", fr: "E-mail", ar: "البريد الإلكتروني" },
  required: { en: "Required", fr: "Obligatoire", ar: "إلزامي" },
  optional: { en: "Optional", fr: "Facultatif", ar: "اختياري" },
  next: { en: "Continue", fr: "Continuer", ar: "متابعة" },
  back: { en: "Back", fr: "Retour", ar: "رجوع" },
  submit: { en: "Submit application", fr: "Envoyer la demande", ar: "إرسال الطلب" },
  successTitle: { en: "Application sent", fr: "Demande envoyée", ar: "تم إرسال الطلب" },
  successBody: {
    en: "Your licence request has been recorded. You will receive a confirmation email once reviewed by the federation.",
    fr: "Votre demande a été enregistrée. Vous recevrez un e-mail de confirmation après examen par la fédération.",
    ar: "تم تسجيل طلبكم. ستصلكم رسالة تأكيد بعد مراجعة الاتحادية.",
  },
  newRequest: { en: "New application", fr: "Nouvelle demande", ar: "طلب جديد" },
  reviewNote: {
    en: "Check your details before sending. You can go back to edit any step.",
    fr: "Vérifiez vos informations avant l'envoi. Vous pouvez revenir en arrière pour modifier.",
    ar: "راجعوا معلوماتكم قبل الإرسال. يمكنكم الرجوع لتعديل أي خطوة.",
  },
  docsHint: {
    en: "Upload clear scans or photos (PDF, JPG, PNG · max 5 MB each).",
    fr: "Téléversez des scans ou photos lisibles (PDF, JPG, PNG · max 5 Mo).",
    ar: "ارفعوا نسخاً واضحة (PDF، JPG، PNG · 5 ميغا كحد أقصى).",
  },
  requirements: {
    en: "See full licence requirements",
    fr: "Voir les conditions de licence",
    ar: "اطلعوا على شروط الرخصة",
  },
  photo: { en: "Passport photo", fr: "Photo d'identité", ar: "صورة شخصية" },
  birthCert: { en: "Birth certificate", fr: "Acte de naissance", ar: "شهادة الميلاد" },
  medical: { en: "Medical certificate", fr: "Certificat médical", ar: "شهادة طبية" },
  antiDoping: { en: "Anti-doping certificate", fr: "Certificat non-dopage", ar: "شهادة خلو من المنشطات" },
  idDoc: { en: "ID document", fr: "Pièce d'identité", ar: "وثيقة الهوية" },
  diploma: { en: "Coaching diploma / attestation", fr: "Diplôme ou attestation d'entraîneur", ar: "شهادة أو دبلوم التدريب" },
  selectWilaya: { en: "Select wilaya", fr: "Choisir la wilaya", ar: "اختر الولاية" },
  selectCategory: { en: "Select category", fr: "Choisir la catégorie", ar: "اختر الفئة" },
  placeholders: {
    name: { en: "First and last name", fr: "Prénom et nom", ar: "الاسم واللقب" },
    club: { en: "Your club name", fr: "Nom de votre club", ar: "اسم ناديكم" },
  },
};

const CATEGORIES = [
  { value: "u11", label: { en: "U11", fr: "U11", ar: "U11" } },
  { value: "u13", label: { en: "U13", fr: "U13", ar: "U13" } },
  { value: "u15", label: { en: "U15", fr: "U15", ar: "U15" } },
  { value: "u17", label: { en: "U17", fr: "U17", ar: "U17" } },
  { value: "u19", label: { en: "U19", fr: "U19", ar: "U19" } },
  { value: "seniors", label: { en: "Seniors (+19)", fr: "Séniors (+19)", ar: "أكابر (+19)" } },
];

const schema = z.object({
  licenceType: z.enum(["athlete", "coach"]),
  fullName: z.string().min(3, "min"),
  birthDate: z.string().min(1, "required"),
  gender: z.enum(["male", "female"]),
  wilaya: z.string().min(1, "required"),
  club: z.string().min(2, "min"),
  category: z.string().min(1, "required"),
  phone: z.string().min(9, "min"),
  email: z.string().email("email"),
  photo: z.custom<FileList | undefined>(),
  birthCert: z.custom<FileList | undefined>(),
  medical: z.custom<FileList | undefined>(),
  antiDoping: z.custom<FileList | undefined>(),
  idDoc: z.custom<FileList | undefined>(),
  diploma: z.custom<FileList | undefined>(),
});

type FormValues = z.infer<typeof schema>;

const STEP_FIELDS: (keyof FormValues)[][] = [
  ["licenceType", "fullName", "birthDate", "gender"],
  ["wilaya", "club", "category", "phone", "email"],
  ["photo", "birthCert", "medical", "antiDoping", "idDoc", "diploma"],
  [],
];

function LicencePage() {
  const { lang } = useI18n();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const stepTopRef = useRef<HTMLDivElement>(null);
  const skipInitialScroll = useRef(true);

  useEffect(() => {
    if (skipInitialScroll.current) {
      skipInitialScroll.current = false;
      return;
    }
    stepTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [submitted]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      licenceType: "athlete",
      gender: "male",
      fullName: "",
      birthDate: "",
      wilaya: "",
      club: "",
      category: "",
      phone: "",
      email: "",
    },
    mode: "onBlur",
  });

  const { register, control, watch, trigger, getValues, formState: { errors } } = form;
  const licenceType = watch("licenceType");
  const progress = ((step + 1) / COPY.steps.length) * 100;

  const err = (key: keyof FormValues) => {
    if (!errors[key]) return null;
    if (lang === "ar") return "يرجى التحقق من هذا الحقل";
    if (lang === "fr") return "Veuillez vérifier ce champ";
    return "Please check this field";
  };

  const goNext = async () => {
    const fields = STEP_FIELDS[step];
    const valid = fields.length === 0 || (await trigger(fields));
    if (valid) setStep((s) => Math.min(s + 1, COPY.steps.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (values: FormValues) => {
    const fileName = (files?: FileList) => (files?.[0]?.name ? files[0].name : undefined);
    saveLicenceRequest({
      licenceType: values.licenceType,
      fullName: values.fullName,
      birthDate: values.birthDate,
      gender: values.gender,
      wilaya: values.wilaya,
      club: values.club,
      category: values.category,
      phone: values.phone,
      email: values.email,
      documents: {
        photo: fileName(values.photo),
        birthCert: fileName(values.birthCert),
        medical: fileName(values.medical),
        antiDoping: fileName(values.antiDoping),
        idDoc: fileName(values.idDoc),
        diploma: fileName(values.diploma),
      },
      status: "pending",
      adminNotes: "",
      submittedAt: new Date().toISOString(),
    });
    setSubmitted(true);
    setStep(0);
    form.reset();
  };

  if (submitted) {
    return (
      <div className="container-px flex min-h-[70vh] items-center justify-center py-16">
        <Card className="max-w-md w-full text-center shadow-lg border-primary/20">
          <CardContent className="pt-10 pb-8 px-6">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-9 w-9 text-primary" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold">{t3(COPY.successTitle, lang)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t3(COPY.successBody, lang)}</p>
            <Button className="mt-8 w-full" onClick={() => setSubmitted(false)}>
              {t3(COPY.newRequest, lang)}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 py-10 md:py-14">
      <div ref={stepTopRef} className="scroll-mt-24 container-px mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <img src={assetUrl(logo)} alt="ABF" className="mx-auto h-14 w-auto md:h-16" />
          <h1 className="mt-4 font-display text-2xl font-bold md:text-3xl">{t3(COPY.title, lang)}</h1>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">{t3(COPY.subtitle, lang)}</p>
          <Link
            href="/about"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <Info className="h-3.5 w-3.5" />
            {t3(COPY.requirements, lang)}
          </Link>
        </div>

        {/* Step indicator */}
        <div className="mb-6">
          <div className="mb-3 flex justify-between gap-2">
            {COPY.steps.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1.5 text-center",
                  i <= step ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-colors",
                    i < step && "bg-primary text-primary-foreground",
                    i === step && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    i > step && "bg-muted text-muted-foreground",
                  )}
                >
                  {i < step ? "✓" : i + 1}
                </span>
                <span className="hidden text-[10px] font-semibold uppercase tracking-wide sm:block">
                  {t3(s, lang)}
                </span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < COPY.steps.length - 1) goNext();
            else form.handleSubmit(onSubmit)();
          }}
        >
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle className="font-display text-lg">{t3(COPY.steps[step], lang)}</CardTitle>
              <CardDescription>
                {step === 2 ? t3(COPY.docsHint, lang) : `${t3(COPY.required, lang)} *`}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {/* Step 1 — Identity */}
              {step === 0 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Field label={t3(COPY.licenceType, lang)} error={err("licenceType")}>
                    <Controller
                      name="licenceType"
                      control={control}
                      render={({ field }) => (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {(["athlete", "coach"] as const).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => field.onChange(type)}
                              className={cn(
                                "flex items-center gap-3 rounded-xl border p-4 text-start transition",
                                field.value === type
                                  ? "border-primary bg-primary/5 shadow-sm"
                                  : "border-border hover:border-primary/40 hover:bg-muted/40",
                              )}
                            >
                              {type === "athlete" ? (
                                <User className="h-5 w-5 text-primary" />
                              ) : (
                                <Users className="h-5 w-5 text-primary" />
                              )}
                              <div>
                                <p className="font-semibold">{t3(COPY[type], lang)}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    />
                  </Field>

                  <Field label={`${t3(COPY.fullName, lang)} *`} error={err("fullName")}>
                    <Input
                      {...register("fullName")}
                      placeholder={t3(COPY.placeholders.name, lang)}
                      className={cn(errors.fullName && "border-destructive")}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={`${t3(COPY.birthDate, lang)} *`} error={err("birthDate")}>
                      <Input
                        {...register("birthDate")}
                        type="date"
                        dir="ltr"
                        className={cn(errors.birthDate && "border-destructive")}
                      />
                    </Field>

                    <Field label={`${t3(COPY.gender, lang)} *`} error={err("gender")}>
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex gap-4 pt-2"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male" className="cursor-pointer font-normal">
                                {t3(COPY.male, lang)}
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female" className="cursor-pointer font-normal">
                                {t3(COPY.female, lang)}
                              </Label>
                            </div>
                          </RadioGroup>
                        )}
                      />
                    </Field>
                  </div>
                </div>
              )}

              {/* Step 2 — Club & contact */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Field label={`${t3(COPY.wilaya, lang)} *`} error={err("wilaya")}>
                    <Controller
                      name="wilaya"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className={cn(errors.wilaya && "border-destructive")}>
                            <SelectValue placeholder={t3(COPY.selectWilaya, lang)} />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {WILAYAS.map((w) => (
                              <SelectItem key={w.code} value={w.code}>
                                {lang === "ar" ? w.ar : w.fr}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>

                  <Field label={`${t3(COPY.club, lang)} *`} error={err("club")}>
                    <Input
                      {...register("club")}
                      placeholder={t3(COPY.placeholders.club, lang)}
                      className={cn(errors.club && "border-destructive")}
                    />
                  </Field>

                  <Field label={`${t3(COPY.category, lang)} *`} error={err("category")}>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className={cn(errors.category && "border-destructive")}>
                            <SelectValue placeholder={t3(COPY.selectCategory, lang)} />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((c) => (
                              <SelectItem key={c.value} value={c.value}>
                                {t3(c.label, lang)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={`${t3(COPY.phone, lang)} *`} error={err("phone")}>
                      <Input
                        {...register("phone")}
                        type="tel"
                        placeholder="+213"
                        dir="ltr"
                        className={cn(errors.phone && "border-destructive")}
                      />
                    </Field>
                    <Field label={`${t3(COPY.email, lang)} *`} error={err("email")}>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="email@example.com"
                        dir="ltr"
                        className={cn(errors.email && "border-destructive")}
                      />
                    </Field>
                  </div>
                </div>
              )}

              {/* Step 3 — Documents */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <DocChecklist lang={lang} licenceType={licenceType} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <UploadField
                      label={t3(COPY.photo, lang)}
                      name="photo"
                      required
                      register={register}
                      icon={User}
                    />
                    <UploadField
                      label={t3(COPY.birthCert, lang)}
                      name="birthCert"
                      required
                      register={register}
                      icon={FileText}
                    />
                    <UploadField
                      label={t3(COPY.medical, lang)}
                      name="medical"
                      required
                      register={register}
                      icon={Stethoscope}
                    />
                    <UploadField
                      label={t3(COPY.antiDoping, lang)}
                      name="antiDoping"
                      register={register}
                      icon={FileText}
                    />
                    <UploadField
                      label={t3(COPY.idDoc, lang)}
                      name="idDoc"
                      register={register}
                      icon={IdCard}
                    />
                    {licenceType === "coach" && (
                      <UploadField
                        label={t3(COPY.diploma, lang)}
                        name="diploma"
                        required
                        register={register}
                        icon={FileText}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Step 4 — Review */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-sm text-muted-foreground">{t3(COPY.reviewNote, lang)}</p>
                  <ReviewSection lang={lang} values={getValues()} />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-wrap gap-3">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={goBack} className="gap-2">
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                {t3(COPY.back, lang)}
              </Button>
            )}
            <Button type="submit" className="ms-auto min-w-[140px] gap-2">
              {step < COPY.steps.length - 1 ? (
                <>
                  {t3(COPY.next, lang)}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </>
              ) : (
                t3(COPY.submit, lang)
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string | null;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function UploadField({
  label,
  name,
  register,
  required,
  icon: Icon,
}: {
  label: string;
  name: keyof FormValues;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  required?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const [fileName, setFileName] = useState<string | null>(null);
  const { onChange, ...rest } = register(name);

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required ? " *" : ""}
      </Label>
      <label
        htmlFor={name}
        className={cn(
          "group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-6 text-center transition",
          fileName ? "border-primary/40 bg-primary/5" : "border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/40",
        )}
      >
        {fileName ? (
          <>
            <FileText className="mb-2 h-6 w-6 text-primary" />
            <span className="line-clamp-2 text-xs font-medium text-foreground">{fileName}</span>
            <span className="mt-1 text-[10px] text-muted-foreground">PNG, JPG, PDF · max 5MB</span>
          </>
        ) : (
          <>
            <Icon className="mb-2 h-6 w-6 text-muted-foreground transition group-hover:text-primary" />
            <Upload className="mb-1 h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">PNG, JPG, PDF · max 5MB</span>
          </>
        )}
        <input
          id={name}
          type="file"
          className="hidden"
          accept="image/*,.pdf"
          {...rest}
          onChange={(e) => {
            onChange(e);
            setFileName(e.target.files?.[0]?.name ?? null);
          }}
        />
      </label>
      {fileName ? (
        <button
          type="button"
          className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-destructive"
          onClick={() => setFileName(null)}
        >
          <X className="h-3 w-3" /> Remove
        </button>
      ) : null}
    </div>
  );
}

function DocChecklist({ lang, licenceType }: { lang: string; licenceType: string }) {
  const items =
    licenceType === "coach"
      ? [COPY.photo, COPY.birthCert, COPY.medical, COPY.diploma]
      : [COPY.photo, COPY.birthCert, COPY.medical, COPY.antiDoping];

  return (
    <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
        {lang === "ar" ? "الوثائق المطلوبة" : lang === "fr" ? "Documents requis" : "Required documents"}
      </p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-foreground/90">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
            {t3(item, lang)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewSection({ lang, values }: { lang: string; values: FormValues }) {
  const wilaya = WILAYAS.find((w) => w.code === values.wilaya);
  const category = CATEGORIES.find((c) => c.value === values.category);

  const rows: { label: L; value: string }[] = [
    { label: COPY.licenceType, value: t3(COPY[values.licenceType], lang) },
    { label: COPY.fullName, value: values.fullName },
    { label: COPY.birthDate, value: values.birthDate },
    { label: COPY.gender, value: t3(values.gender === "male" ? COPY.male : COPY.female, lang) },
    { label: COPY.wilaya, value: wilaya ? (lang === "ar" ? wilaya.ar : wilaya.fr) : "—" },
    { label: COPY.club, value: values.club },
    { label: COPY.category, value: category ? t3(category.label, lang) : "—" },
    { label: COPY.phone, value: values.phone },
    { label: COPY.email, value: values.email },
  ];

  return (
    <dl className="divide-y rounded-xl border">
      {rows.map(({ label, value }) => (
        <div key={label.en} className="flex flex-wrap justify-between gap-2 px-4 py-3 text-sm">
          <dt className="text-muted-foreground">{t3(label, lang)}</dt>
          <dd className="font-medium text-end" dir={label.en === "Phone" || label.en === "Email" ? "ltr" : undefined}>
            {value || "—"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default LicencePage;
