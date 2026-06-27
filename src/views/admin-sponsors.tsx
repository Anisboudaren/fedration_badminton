"use client";


import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentManagerPage } from "@/components/admin/ContentManagerPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import { useI18n } from "@/i18n/I18nProvider";
import { emptyLocalizedText, type Sponsor } from "@/lib/admin/types";

const emptySponsor = (): Sponsor => ({
  id: "",
  title: emptyLocalizedText(),
  tier: "gold",
  logoUrl: "",
  websiteUrl: "",
  status: "draft",
  createdAt: "",
  updatedAt: "",
});

function SponsorsAdminPage() {
  const { t } = useI18n();

  return (
    <ContentManagerPage<Sponsor>
      collection="sponsors"
      title={t.admin.pages.sponsors.title}
      description={t.admin.pages.sponsors.description}
      createEmpty={emptySponsor}
      validate={() => null}
      renderFormFields={({ draft, setDraft }) => (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.tier}</label>
              <Select value={draft.tier} onValueChange={(v) => setDraft({ ...draft, tier: v as Sponsor["tier"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["gold", "silver", "bronze"] as const).map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {t.admin.sponsorTiers[tier]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ImageUploadField
              label={t.admin.forms.logoUrl}
              value={draft.logoUrl ?? ""}
              onChange={(logoUrl) => setDraft({ ...draft, logoUrl })}
              folder="sponsors"
            />
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.websiteUrl}</label>
              <Input
                value={draft.websiteUrl ?? ""}
                onChange={(e) => setDraft({ ...draft, websiteUrl: e.target.value })}
              />
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

export default SponsorsAdminPage;
