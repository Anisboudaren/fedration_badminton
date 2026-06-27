"use client";


import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ContentManagerPage } from "@/components/admin/ContentManagerPage";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import { useI18n } from "@/i18n/I18nProvider";
import { WILAYAS } from "@/lib/data/wilayas";
import { emptyLocalizedText, type Player } from "@/lib/admin/types";

const emptyPlayer = (): Player => ({
  id: "",
  title: emptyLocalizedText(),
  club: emptyLocalizedText(),
  category: emptyLocalizedText(),
  wilayaCode: "",
  ranking: 0,
  photoUrl: "",
  bio: emptyLocalizedText(),
  achievements: [],
  status: "draft",
  createdAt: "",
  updatedAt: "",
});

function PlayersAdminPage() {
  const { t } = useI18n();

  return (
    <ContentManagerPage<Player>
      collection="players"
      title={t.admin.pages.players.title}
      description={t.admin.pages.players.description}
      createEmpty={emptyPlayer}
      validate={(item) => {
        if (!item.wilayaCode) return t.admin.validation.requireOneLanguage;
        return null;
      }}
      getSummary={(item) => `#${item.ranking}`}
      getViewHref={(item) => `/players/${item.id}`}
      renderFormFields={({ draft, setDraft }) => (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.photoUrl}</label>
              <Input value={draft.photoUrl} onChange={(e) => setDraft({ ...draft, photoUrl: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.ranking}</label>
              <Input
                type="number"
                value={draft.ranking || ""}
                onChange={(e) => setDraft({ ...draft, ranking: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.wilaya}</label>
              <Select value={draft.wilayaCode} onValueChange={(v) => setDraft({ ...draft, wilayaCode: v })}>
                <SelectTrigger>
                  <SelectValue placeholder={t.admin.forms.wilaya} />
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
          </div>
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
                  <label className="text-sm font-medium">{t.admin.forms.category}</label>
                  <Input
                    value={draft.category[lang]}
                    onChange={(e) => setDraft({ ...draft, category: { ...draft.category, [lang]: e.target.value } })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.admin.forms.teamName}</label>
                  <Input
                    value={draft.club[lang]}
                    onChange={(e) => setDraft({ ...draft, club: { ...draft.club, [lang]: e.target.value } })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.admin.forms.bio}</label>
                  <Textarea
                    value={draft.bio[lang]}
                    onChange={(e) => setDraft({ ...draft, bio: { ...draft.bio, [lang]: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">{t.admin.forms.achievements}</label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setDraft({ ...draft, achievements: [...draft.achievements, emptyLocalizedText()] })
                      }
                    >
                      <Plus className="h-4 w-4" />
                      {t.admin.forms.addAchievement}
                    </Button>
                  </div>
                  {draft.achievements.map((ach, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={ach[lang]}
                        onChange={(e) => {
                          const next = [...draft.achievements];
                          next[i] = { ...ach, [lang]: e.target.value };
                          setDraft({ ...draft, achievements: next });
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setDraft({ ...draft, achievements: draft.achievements.filter((_, j) => j !== i) })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </MultiLangTabs>
        </>
      )}
    />
  );
}

export default PlayersAdminPage;
