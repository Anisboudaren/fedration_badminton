"use client";


import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentManagerPage } from "@/components/admin/ContentManagerPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import { YouTubeInput, extractYouTubeVideoId } from "@/components/admin/forms/YouTubeInput";
import { useI18n } from "@/i18n/I18nProvider";
import { emptyLocalizedText, type MediaItem } from "@/lib/admin/types";

const emptyMedia = (): MediaItem => ({
  id: "",
  title: emptyLocalizedText(),
  type: "image",
  imageUrl: "",
  youtubeUrl: "",
  youtubeVideoId: "",
  status: "draft",
  createdAt: "",
  updatedAt: "",
});

function MediaAdminPage() {
  const { t } = useI18n();

  return (
    <ContentManagerPage<MediaItem>
      collection="media"
      title={t.admin.pages.media.title}
      description={t.admin.pages.media.description}
      createEmpty={emptyMedia}
      validate={(item) => {
        if (item.type === "image" && !item.imageUrl?.trim()) return t.admin.validation.imageRequired;
        if (item.type === "youtube") {
          const id = extractYouTubeVideoId(item.youtubeUrl ?? "");
          if (!id) return t.admin.validation.invalidYoutube;
        }
        return null;
      }}
      getSummary={(item) => t.admin.mediaTypes[item.type]}
      renderFormFields={({ draft, setDraft }) => (
        <>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">{t.admin.forms.mediaType}</label>
            <Select
              value={draft.type}
              onValueChange={(value) =>
                setDraft({
                  ...draft,
                  type: value as MediaItem["type"],
                  youtubeVideoId:
                    value === "youtube" ? extractYouTubeVideoId(draft.youtubeUrl ?? "") ?? "" : "",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">{t.admin.mediaTypes.image}</SelectItem>
                <SelectItem value="youtube">{t.admin.mediaTypes.youtube}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {draft.type === "image" ? (
            <ImageUploadField
              label={t.admin.forms.imageUrl}
              value={draft.imageUrl ?? ""}
              onChange={(imageUrl) => setDraft({ ...draft, imageUrl })}
              folder="media"
            />
          ) : (
            <YouTubeInput
              value={draft.youtubeUrl ?? ""}
              onChange={(value) =>
                setDraft({
                  ...draft,
                  youtubeUrl: value,
                  youtubeVideoId: extractYouTubeVideoId(value) ?? "",
                })
              }
            />
          )}

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

export default MediaAdminPage;
