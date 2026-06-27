"use client";


import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentManagerPage } from "@/components/admin/ContentManagerPage";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import { useI18n } from "@/i18n/I18nProvider";
import { WILAYAS } from "@/lib/data/wilayas";
import { emptyLocalizedText, type Club } from "@/lib/admin/types";

const emptyClub = (): Club => ({
  id: "",
  title: emptyLocalizedText(),
  wilayaCode: "",
  city: "",
  members: 0,
  founded: new Date().getFullYear(),
  phone: "",
  email: "",
  logoUrl: "",
  status: "draft",
  createdAt: "",
  updatedAt: "",
});

function ClubsAdminPage() {
  const { t } = useI18n();

  return (
    <ContentManagerPage<Club>
      collection="clubs"
      title={t.admin.pages.clubs.title}
      description={t.admin.pages.clubs.description}
      createEmpty={emptyClub}
      validate={(item) => {
        if (!item.wilayaCode) return t.admin.validation.requireOneLanguage;
        return null;
      }}
      renderFormFields={({ draft, setDraft }) => (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.wilaya}</label>
              <Select value={draft.wilayaCode} onValueChange={(v) => setDraft({ ...draft, wilayaCode: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WILAYAS.map((w) => (
                    <SelectItem key={w.code} value={w.code}>
                      {w.fr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.city}</label>
              <Input value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.members}</label>
              <Input
                type="number"
                value={draft.members || ""}
                onChange={(e) => setDraft({ ...draft, members: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.founded}</label>
              <Input
                type="number"
                value={draft.founded || ""}
                onChange={(e) => setDraft({ ...draft, founded: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.phone}</label>
              <Input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.email}</label>
              <Input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
            </div>
          </div>
          <MultiLangTabs>
            {(lang) => (
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t.admin.forms.title}</label>
                <Input
                  value={draft.title[lang]}
                  onChange={(e) => setDraft({ ...draft, title: { ...draft.title, [lang]: e.target.value } })}
                />
              </div>
            )}
          </MultiLangTabs>
        </>
      )}
    />
  );
}

export default ClubsAdminPage;
