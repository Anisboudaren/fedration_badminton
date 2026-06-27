"use client";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import { getSiteSettings, saveSiteSettings } from "@/lib/admin/content-store";
import type { SiteSettings } from "@/lib/admin/types";
import { LANGS, type Lang } from "@/i18n/translations";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "sonner";

function SettingsAdminPage() {
  const { t } = useI18n();
  const [settings, setSettings] = useState<SiteSettings>(() => getSiteSettings());

  const onSave = () => {
    saveSiteSettings(settings);
    toast.success(t.admin.settings.saved);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{t.admin.pages.settings.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.admin.pages.settings.description}</p>
        </div>
        <Button onClick={onSave}>{t.admin.settings.save}</Button>
      </div>

      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="py-4 text-sm text-muted-foreground space-y-1">
          <p>{t.admin.settings.localStorageNote}</p>
          <p>{t.admin.settings.envNote}</p>
        </CardContent>
      </Card>

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
                    value={settings.heroTitle[lang]}
                    onChange={(e) =>
                      setSettings({ ...settings, heroTitle: { ...settings.heroTitle, [lang]: e.target.value } })
                    }
                    rows={2}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t.admin.settings.heroTagline}</Label>
                  <Textarea
                    value={settings.heroTagline[lang]}
                    onChange={(e) =>
                      setSettings({ ...settings, heroTagline: { ...settings.heroTagline, [lang]: e.target.value } })
                    }
                    rows={2}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t.admin.settings.maintenanceMessage}</Label>
                  <Textarea
                    value={settings.maintenanceMessage[lang]}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maintenanceMessage: { ...settings.maintenanceMessage, [lang]: e.target.value },
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
                value={settings.defaultLang}
                onValueChange={(v) => setSettings({ ...settings, defaultLang: v as Lang })}
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
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsAdminPage;
