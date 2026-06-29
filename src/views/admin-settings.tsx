"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import type { SiteSettings } from "@/lib/admin/types";
import { LANGS, type Lang } from "@/i18n/translations";
import { useI18n } from "@/i18n/I18nProvider";
import { fetchSiteSettings, saveSiteSettingsApi } from "@/lib/cms/client";
import { toast } from "sonner";

function SettingsAdminPage() {
  const { t } = useI18n();
  const queryClient = useQueryClient();

  const { data: loaded, isLoading } = useQuery({
    queryKey: ["cms", "settings"],
    queryFn: fetchSiteSettings,
  });

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const draft = settings ?? loaded;

  const saveMutation = useMutation({
    mutationFn: saveSiteSettingsApi,
    onSuccess: (data) => {
      setSettings(data);
      queryClient.invalidateQueries({ queryKey: ["cms", "settings"] });
      toast.success(t.admin.settings.saved);
    },
    onError: () => toast.error("Save failed"),
  });

  const updateContact = (field: keyof SiteSettings["contact"], value: string) => {
    if (!draft) return;
    setSettings({
      ...draft,
      contact: { ...draft.contact, [field]: value },
    });
  };

  const updateContactAddress = (lang: Lang, value: string) => {
    if (!draft) return;
    setSettings({
      ...draft,
      contact: {
        ...draft.contact,
        address: { ...draft.contact.address, [lang]: value },
      },
    });
  };

  const onSave = () => {
    if (!draft) return;
    saveMutation.mutate(draft);
  };

  if (isLoading || !draft) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{t.admin.pages.settings.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.admin.pages.settings.description}</p>
        </div>
        <Button onClick={onSave} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {t.admin.settings.save}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.admin.pages.settings.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <MultiLangTabs>
            {(lang) => (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>{t.admin.settings.heroTitle}</Label>
                  <Textarea
                    value={draft.heroTitle[lang]}
                    onChange={(e) =>
                      setSettings({ ...draft, heroTitle: { ...draft.heroTitle, [lang]: e.target.value } })
                    }
                    rows={2}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t.admin.settings.heroTagline}</Label>
                  <Textarea
                    value={draft.heroTagline[lang]}
                    onChange={(e) =>
                      setSettings({ ...draft, heroTagline: { ...draft.heroTagline, [lang]: e.target.value } })
                    }
                    rows={2}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t.admin.settings.maintenanceMessage}</Label>
                  <Textarea
                    value={draft.maintenanceMessage[lang]}
                    onChange={(e) =>
                      setSettings({
                        ...draft,
                        maintenanceMessage: { ...draft.maintenanceMessage, [lang]: e.target.value },
                      })
                    }
                    rows={2}
                  />
                </div>
              </div>
            )}
          </MultiLangTabs>

          <div className="grid gap-4 md:grid-cols-2 max-w-lg">
            <div className="space-y-1.5">
              <Label>{t.admin.settings.defaultLang}</Label>
              <Select
                value={draft.defaultLang}
                onValueChange={(v) => setSettings({ ...draft, defaultLang: v as Lang })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGS.map((l) => (
                    <SelectItem key={l.code} value={l.code}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div>
                <Label>{t.admin.settings.maintenanceMode}</Label>
              </div>
              <Switch
                checked={draft.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...draft, maintenanceMode: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.admin.settings.contactSection}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <MultiLangTabs>
            {(lang) => (
              <div className="space-y-1.5">
                <Label>{t.admin.settings.contactAddress}</Label>
                <Textarea
                  value={draft.contact.address[lang]}
                  onChange={(e) => updateContactAddress(lang, e.target.value)}
                  rows={3}
                  placeholder="Maison des Fédérations&#10;Dely Ibrahim, Algiers&#10;Algeria"
                />
              </div>
            )}
          </MultiLangTabs>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>{t.admin.settings.email1}</Label>
              <Input
                type="email"
                value={draft.contact.email1}
                onChange={(e) => updateContact("email1", e.target.value)}
                placeholder="contact@badminton.dz"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t.admin.settings.email2}</Label>
              <Input
                type="email"
                value={draft.contact.email2}
                onChange={(e) => updateContact("email2", e.target.value)}
                placeholder="info@badminton.dz"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t.admin.settings.phone1}</Label>
              <Input
                value={draft.contact.phone1}
                onChange={(e) => updateContact("phone1", e.target.value)}
                placeholder="+213 23 25 82 52"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t.admin.settings.phone2}</Label>
              <Input
                value={draft.contact.phone2}
                onChange={(e) => updateContact("phone2", e.target.value)}
                placeholder="+213 23 25 86 10"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>{t.admin.settings.fax}</Label>
              <Input
                value={draft.contact.fax}
                onChange={(e) => updateContact("fax", e.target.value)}
                placeholder="+213 ..."
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">{t.admin.settings.socialSection}</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["facebook", t.admin.settings.facebook],
                  ["instagram", t.admin.settings.instagram],
                  ["youtube", t.admin.settings.youtube],
                  ["twitter", t.admin.settings.twitter],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="space-y-1.5">
                  <Label>{label}</Label>
                  <Input
                    value={draft.contact[key]}
                    onChange={(e) => updateContact(key, e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsAdminPage;
