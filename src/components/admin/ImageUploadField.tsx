import { useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/cms/client";
import { resolveBlobDisplayUrl } from "@/lib/storage/blob-url";

type Props = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
};

export function ImageUploadField({
  label,
  value,
  onChange,
  folder = "uploads",
  accept = "image/jpeg,image/png,image/webp,image/gif",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label ? <label className="text-sm font-medium">{label}</label> : null}
      <div className="flex flex-wrap items-start gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="min-w-[200px] flex-1"
        />
        <label>
          <input
            type="file"
            accept={accept}
            className="sr-only"
            disabled={uploading}
            onChange={(e) => void handleFile(e.target.files?.[0])}
          />
          <Button type="button" variant="outline" size="sm" disabled={uploading} asChild>
            <span>
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {uploading ? "..." : "Upload"}
            </span>
          </Button>
        </label>
        {value ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
            <X className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
      {value ? (
        <img src={resolveBlobDisplayUrl(value)} alt="" className="h-20 w-auto max-w-full rounded border object-cover" />
      ) : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
