"use client";


import { Input } from "@/components/ui/input";
import { ContentManagerPage } from "@/components/admin/ContentManagerPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import { useI18n } from "@/i18n/I18nProvider";
import { emptyLocalizedText, type Official } from "@/lib/admin/types";

const emptyOfficial = (): Official => ({
  id: "",
  title: emptyLocalizedText(),
  role: emptyLocalizedText(),
  region: emptyLocalizedText(),
  photoUrl: "",
  certificationLevel: "",
  status: "draft",
  createdAt: "",
  updatedAt: "",
});

function OfficialsAdminPage() {
  const { t } = useI18n();

  return (
    <ContentManagerPage<Official>
      collection="officials"
      title={t.admin.pages.officials.title}
      description={t.admin.pages.officials.description}
      createEmpty={emptyOfficial}
      validate={() => null}
      renderFormFields={({ draft, setDraft }) => (
        <>
          <ImageUploadField
            label={t.admin.forms.photoUrl}
            value={draft.photoUrl ?? ""}
            onChange={(photoUrl) => setDraft({ ...draft, photoUrl })}
            folder="officials"
          />
          <MultiLangTabs>
            {(lang) => (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.admin.forms.title}</label>
                  <Input
                    value={draft.title[lang]}
                    onChange={(e) => setDraft({ ...draft, title: { ...draft.title, [lang]: e.target.value } })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.admin.forms.role}</label>
                  <Input
                    value={draft.role[lang]}
                    onChange={(e) => setDraft({ ...draft, role: { ...draft.role, [lang]: e.target.value } })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.admin.forms.region}</label>
                  <Input
                    value={draft.region[lang]}
                    onChange={(e) => setDraft({ ...draft, region: { ...draft.region, [lang]: e.target.value } })}
                  />
                </div>
              </div>
            )}
          </MultiLangTabs>
        </>
      )}
    />
  );
}

export default OfficialsAdminPage;
