"use client";


import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentManagerPage } from "@/components/admin/ContentManagerPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import { useI18n } from "@/i18n/I18nProvider";
import { emptyLocalizedText, type TeamProfile } from "@/lib/admin/types";

const emptyTeam = (): TeamProfile => ({
  id: "",
  title: emptyLocalizedText(),
  description: emptyLocalizedText(),
  category: "senior-men",
  image: "",
  status: "draft",
  createdAt: "",
  updatedAt: "",
});

function TeamsAdminPage() {
  const { t } = useI18n();

  return (
    <ContentManagerPage<TeamProfile>
      collection="teams"
      title={t.admin.pages.teams.title}
      description={t.admin.pages.teams.description}
      createEmpty={emptyTeam}
      validate={() => null}
      getSummary={(item) => t.admin.teamCategories[item.category]}
      renderFormFields={({ draft, setDraft }) => (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <ImageUploadField
              label={t.admin.forms.imageUrl}
              value={draft.image}
              onChange={(image) => setDraft({ ...draft, image })}
              folder="teams"
            />
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.category}</label>
              <Select
                value={draft.category}
                onValueChange={(value) => setDraft({ ...draft, category: value as TeamProfile["category"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="senior-men">{t.admin.teamCategories["senior-men"]}</SelectItem>
                  <SelectItem value="senior-women">{t.admin.teamCategories["senior-women"]}</SelectItem>
                  <SelectItem value="junior-boys">{t.admin.teamCategories["junior-boys"]}</SelectItem>
                  <SelectItem value="junior-girls">{t.admin.teamCategories["junior-girls"]}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <MultiLangTabs>
            {(lang) => (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.admin.forms.teamName}</label>
                  <Input
                    value={draft.title[lang]}
                    onChange={(e) => setDraft({ ...draft, title: { ...draft.title, [lang]: e.target.value } })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.admin.forms.description}</label>
                  <Textarea
                    value={draft.description[lang]}
                    onChange={(e) =>
                      setDraft({ ...draft, description: { ...draft.description, [lang]: e.target.value } })
                    }
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

export default TeamsAdminPage;
