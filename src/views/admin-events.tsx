"use client";


import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";import { ContentManagerPage } from "@/components/admin/ContentManagerPage";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import { useI18n } from "@/i18n/I18nProvider";
import { emptyLocalizedText, type EventItem } from "@/lib/admin/types";

const emptyEvent = (): EventItem => ({
  id: "",
  title: emptyLocalizedText(),
  description: emptyLocalizedText(),
  location: "",
  startDate: "",
  endDate: "",
  eventStatus: "upcoming",
  status: "draft",
  createdAt: "",
  updatedAt: "",
});

function EventsAdminPage() {
  const { t } = useI18n();

  return (
    <ContentManagerPage<EventItem>
      collection="events"
      title={t.admin.pages.events.title}
      description={t.admin.pages.events.description}
      createEmpty={emptyEvent}
      validate={(item) => {
        if (!item.startDate || !item.endDate) return t.admin.validation.dateRequired;
        if (item.endDate < item.startDate) return t.admin.validation.dateOrder;
        return null;
      }}
      getSummary={(item) => `${item.location} • ${item.startDate}`}
      renderFormFields={({ draft, setDraft }) => (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-sm font-medium">{t.admin.forms.location}</label>
              <Input
                value={draft.location}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.startDate}</label>
              <Input
                type="date"
                value={draft.startDate}
                onChange={(e) => setDraft({ ...draft, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.endDate}</label>
              <Input
                type="date"
                value={draft.endDate}
                onChange={(e) => setDraft({ ...draft, endDate: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.eventStatus}</label>
              <Select
                value={draft.eventStatus}
                onValueChange={(v) => setDraft({ ...draft, eventStatus: v as EventItem["eventStatus"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">{t.admin.eventStatuses.upcoming}</SelectItem>
                  <SelectItem value="finished">{t.admin.eventStatuses.finished}</SelectItem>
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

export default EventsAdminPage;
