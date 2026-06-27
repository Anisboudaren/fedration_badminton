"use client";


import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentManagerPage } from "@/components/admin/ContentManagerPage";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/i18n/I18nProvider";
import { listItems } from "@/lib/cms/client";
import { emptyLocalizedText, type MatchResult } from "@/lib/admin/types";

const emptyMatch = (): MatchResult => ({
  id: "",
  title: emptyLocalizedText(),
  eventId: "",
  category: "ms",
  player1Name: emptyLocalizedText(),
  player2Name: emptyLocalizedText(),
  score: "",
  stage: "",
  playedAt: "",
  status: "draft",
  createdAt: "",
  updatedAt: "",
});

function MatchesAdminPage() {
  const { t } = useI18n();
  const { data: events = [] } = useQuery({
    queryKey: ["cms", "events"],
    queryFn: () => listItems("events"),
  });

  return (
    <ContentManagerPage<MatchResult>
      collection="matches"
      title={t.admin.pages.matches.title}
      description={t.admin.pages.matches.description}
      createEmpty={emptyMatch}
      validate={(item) => {
        if (!item.eventId) return t.admin.validation.dateRequired;
        if (!item.score.trim()) return t.admin.validation.requireOneLanguage;
        return null;
      }}
      getSummary={(item) => item.score}
      renderFormFields={({ draft, setDraft }) => (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.event}</label>
              <Select value={draft.eventId} onValueChange={(v) => setDraft({ ...draft, eventId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder={t.admin.forms.event} />
                </SelectTrigger>
                <SelectContent>
                  {events.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.title.en || e.title.fr || e.title.ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.category}</label>
              <Select value={draft.category} onValueChange={(v) => setDraft({ ...draft, category: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["ms", "ws", "md", "wd", "xd"] as const).map((c) => (
                    <SelectItem key={c} value={c}>
                      {t.admin.matchCategories[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.score}</label>
              <Input
                value={draft.score}
                placeholder="21-18, 21-15"
                onChange={(e) => setDraft({ ...draft, score: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.stage}</label>
              <Input value={draft.stage ?? ""} onChange={(e) => setDraft({ ...draft, stage: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.playedAt}</label>
              <Input
                type="date"
                value={draft.playedAt ?? ""}
                onChange={(e) => setDraft({ ...draft, playedAt: e.target.value })}
              />
            </div>
          </div>
          <MultiLangTabs>
            {(lang) => (
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.admin.forms.player1}</label>
                  <Input
                    value={draft.player1Name[lang]}
                    onChange={(e) =>
                      setDraft({ ...draft, player1Name: { ...draft.player1Name, [lang]: e.target.value } })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.admin.forms.player2}</label>
                  <Input
                    value={draft.player2Name[lang]}
                    onChange={(e) =>
                      setDraft({ ...draft, player2Name: { ...draft.player2Name, [lang]: e.target.value } })
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

export default MatchesAdminPage;
