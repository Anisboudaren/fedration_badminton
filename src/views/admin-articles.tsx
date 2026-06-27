"use client";


import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ContentManagerPage } from "@/components/admin/ContentManagerPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import { useI18n } from "@/i18n/I18nProvider";
import { createId, slugify } from "@/lib/admin/content-store";
import { emptyLocalizedText, type Article } from "@/lib/admin/types";

const emptyArticle = (): Article => ({
  id: "",
  slug: "",
  title: emptyLocalizedText(),
  summary: emptyLocalizedText(),
  body: emptyLocalizedText(),
  coverImage: "",
  publishedAt: getDefaultDateTimeLocal(),
  category: "national" as const,
  sections: [],
  status: "draft",
  createdAt: "",
  updatedAt: "",
});

function ArticlesAdminPage() {
  const { t } = useI18n();

  return (
    <ContentManagerPage<Article>
      collection="articles"
      title={t.admin.pages.articles.title}
      description={t.admin.pages.articles.description}
      createEmpty={emptyArticle}
      validate={(item) => {
        if (!item.slug.trim()) return t.admin.validation.slugRequired;
        if (item.sections.some((s) => s.videoUrl?.trim() && !isYouTubeLink(s.videoUrl))) {
          return t.admin.validation.invalidYoutube;
        }
        return null;
      }}
      getSummary={(item) => item.slug}
      getViewHref={(item) => `/preview/article/${item.id}`}
      renderFormFields={({ draft, setDraft }) => (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.slug}</label>
              <Input
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: slugify(e.target.value) })}
                placeholder="national-open-2026"
              />
            </div>
            <div className="space-y-1.5">
              <ImageUploadField
                label={t.admin.forms.coverImage}
                value={draft.coverImage}
                onChange={(coverImage) => setDraft({ ...draft, coverImage })}
                folder="articles"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.publishDateTime}</label>
              <Input
                type="datetime-local"
                value={draft.publishedAt ?? ""}
                onChange={(e) => setDraft({ ...draft, publishedAt: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.publishStatus}</label>
              <Select
                value={draft.status}
                onValueChange={(value) => setDraft({ ...draft, status: value as Article["status"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">{t.admin.status.draft}</SelectItem>
                  <SelectItem value="published">{t.admin.status.published}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.admin.forms.articleCategory}</label>
              <Select
                value={draft.category}
                onValueChange={(value) => setDraft({ ...draft, category: value as Article["category"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national">{t.admin.articleCategories.national}</SelectItem>
                  <SelectItem value="international">{t.admin.articleCategories.international}</SelectItem>
                  <SelectItem value="youth">{t.admin.articleCategories.youth}</SelectItem>
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
                    onChange={(e) =>
                      setDraft({ ...draft, title: { ...draft.title, [lang]: e.target.value } })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.admin.forms.summary}</label>
                  <Textarea
                    value={draft.summary[lang]}
                    onChange={(e) =>
                      setDraft({ ...draft, summary: { ...draft.summary, [lang]: e.target.value } })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.admin.forms.body}</label>
                  <Textarea
                    className="min-h-[200px]"
                    value={draft.body[lang]}
                    onChange={(e) =>
                      setDraft({ ...draft, body: { ...draft.body, [lang]: e.target.value } })
                    }
                  />
                </div>
              </div>
            )}
          </MultiLangTabs>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold">{t.admin.forms.sections}</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setDraft({
                    ...draft,
                    sections: [
                      ...draft.sections,
                      {
                        id: createId(),
                        title: emptyLocalizedText(),
                        body: emptyLocalizedText(),
                        imageUrl: "",
                        imageTitle: emptyLocalizedText(),
                        videoUrl: "",
                      },
                    ],
                  })
                }
              >
                <Plus className="h-3.5 w-3.5" />
                {t.admin.actions.addSection}
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              {draft.sections.map((section, idx) => (
                <div key={section.id} className="rounded-md border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">
                      {t.admin.forms.sectionLabel} {idx + 1}
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          sections: draft.sections.filter((x) => x.id !== section.id),
                        })
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {t.admin.actions.removeSection}
                    </Button>
                  </div>

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <ImageUploadField
                        label={t.admin.forms.sectionImageUrl}
                        value={section.imageUrl ?? ""}
                        onChange={(imageUrl) =>
                          setDraft({
                            ...draft,
                            sections: draft.sections.map((x) =>
                              x.id === section.id ? { ...x, imageUrl } : x,
                            ),
                          })
                        }
                        folder="articles/sections"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">{t.admin.forms.sectionVideoUrl}</label>
                      <Input
                        value={section.videoUrl ?? ""}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            sections: draft.sections.map((x) =>
                              x.id === section.id ? { ...x, videoUrl: e.target.value } : x,
                            ),
                          })
                        }
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                  </div>

                  <MultiLangTabs>
                    {(lang) => (
                      <div className="mt-3 space-y-2.5">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium">{t.admin.forms.sectionTitle}</label>
                          <Input
                            value={section.title[lang]}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                sections: draft.sections.map((x) =>
                                  x.id === section.id
                                    ? { ...x, title: { ...x.title, [lang]: e.target.value } }
                                    : x,
                                ),
                              })
                            }
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium">{t.admin.forms.sectionBody}</label>
                          <Textarea
                            value={section.body[lang]}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                sections: draft.sections.map((x) =>
                                  x.id === section.id
                                    ? { ...x, body: { ...x.body, [lang]: e.target.value } }
                                    : x,
                                ),
                              })
                            }
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium">{t.admin.forms.sectionImageTitle}</label>
                          <Input
                            value={section.imageTitle[lang]}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                sections: draft.sections.map((x) =>
                                  x.id === section.id
                                    ? {
                                        ...x,
                                        imageTitle: { ...x.imageTitle, [lang]: e.target.value },
                                      }
                                    : x,
                                ),
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                  </MultiLangTabs>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    />
  );
}

function isYouTubeLink(value: string) {
  return /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/i.test(value);
}

function getDefaultDateTimeLocal() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 16);
}

export default ArticlesAdminPage;
