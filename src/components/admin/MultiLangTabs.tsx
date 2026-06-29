import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/i18n/I18nProvider";

type LangCode = "en" | "fr" | "ar";

export function MultiLangTabs({
  children,
  defaultTab = "en",
}: {
  children: (lang: LangCode) => ReactNode;
  defaultTab?: LangCode;
}) {
  const { t } = useI18n();

  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
        <TabsTrigger value="en">{t.admin.languages.en}</TabsTrigger>
        <TabsTrigger value="fr">{t.admin.languages.fr}</TabsTrigger>
        <TabsTrigger value="ar">{t.admin.languages.ar}</TabsTrigger>
      </TabsList>
      <TabsContent value="en">{children("en")}</TabsContent>
      <TabsContent value="fr">{children("fr")}</TabsContent>
      <TabsContent value="ar">{children("ar")}</TabsContent>
    </Tabs>
  );
}
