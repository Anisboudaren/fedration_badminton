import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/I18nProvider";

const YOUTUBE_REGEX = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/i;

export const extractYouTubeVideoId = (url: string): string | null => {
  const match = url.match(YOUTUBE_REGEX);
  return match?.[1] ?? null;
};

export function YouTubeInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const { t } = useI18n();
  const videoId = extractYouTubeVideoId(value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{t.admin.forms.youtubeUrl}</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=..."
      />
      {value && !videoId ? (
        <p className="text-xs text-destructive">{t.admin.validation.invalidYoutube}</p>
      ) : null}
      {videoId ? (
        <div className="overflow-hidden rounded-md border bg-muted/30">
          <iframe
            title="YouTube preview"
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
          />
        </div>
      ) : null}
    </div>
  );
}
