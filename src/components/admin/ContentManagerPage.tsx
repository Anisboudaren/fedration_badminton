import { useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BaseContentItem, ContentStatus } from "@/lib/admin/types";
import { createId, listItems, saveItems, type CollectionKey, type CollectionMap } from "@/lib/admin/content-store";
import { useI18n } from "@/i18n/I18nProvider";

type Props<T extends BaseContentItem> = {
  collection: {
    [K in CollectionKey]: T[] extends CollectionMap[K] ? K : never;
  }[CollectionKey];
  title: string;
  description: string;
  createEmpty: () => T;
  renderFormFields: (args: { draft: T; setDraft: (next: T) => void }) => ReactNode;
  validate: (item: T) => string | null;
  getSummary?: (item: T) => string;
  getViewHref?: (item: T) => string;
};

const hasAnyTitle = (item: BaseContentItem) =>
  item.title.en.trim() || item.title.fr.trim() || item.title.ar.trim();

export function ContentManagerPage<T extends BaseContentItem>({
  collection,
  title,
  description,
  createEmpty,
  renderFormFields,
  validate,
  getSummary,
  getViewHref,
}: Props<T>) {
  const { t, lang } = useI18n();
  const [items, setItems] = useState<T[]>(() => listItems(collection) as unknown as T[]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<T>(() => createEmpty());
  const [error, setError] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...items].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)),
    [items],
  );

  const persist = (next: T[]) => {
    setItems(next);
    saveItems(collection, next as unknown as CollectionMap[typeof collection]);
  };

  const openCreate = () => {
    setError(null);
    setEditingId(null);
    setDraft(createEmpty());
    setIsEditing(true);
  };

  const openEdit = (item: T) => {
    setError(null);
    setEditingId(item.id);
    setDraft(item);
    setIsEditing(true);
  };

  const removeItem = (id: string) => {
    persist(items.filter((x) => x.id !== id));
  };

  const saveDraft = (status: ContentStatus) => {
    if (!hasAnyTitle(draft)) {
      setError(t.admin.validation.requireOneLanguage);
      return;
    }
    const validation = validate(draft);
    if (validation) {
      setError(validation);
      return;
    }

    const now = new Date().toISOString();
    const normalized = { ...draft, status, updatedAt: now } as T;

    if (editingId) {
      persist(items.map((x) => (x.id === editingId ? normalized : x)));
    } else {
      persist([{ ...normalized, id: createId(), createdAt: now }, ...items]);
    }
    setIsEditing(false);
    setEditingId(null);
    setError(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setError(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          {t.admin.actions.newItem}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Button variant="outline" onClick={cancelEdit}>
                <ArrowLeft className="h-4 w-4" />
                {t.admin.actions.backToList}
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => saveDraft("draft")}>
                  {t.admin.actions.saveDraft}
                </Button>
                <Button onClick={() => saveDraft("published")}>{t.admin.actions.publish}</Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <p className="mb-4 text-sm text-muted-foreground">{t.admin.forms.fillRequired}</p>
              <div className="space-y-4">{renderFormFields({ draft, setDraft })}</div>
              {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
            </div>
          </>
        ) : sorted.length === 0 ? (
          <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
            {t.admin.empty}
          </p>
        ) : (
          sorted.map((item) => (
            <div key={item.id} className="rounded-md border p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold truncate">{item.title[lang] || item.title.en || item.title.fr || item.title.ar}</p>
                {getSummary ? <p className="text-xs text-muted-foreground mt-0.5">{getSummary(item)}</p> : null}
                <p className="text-xs text-muted-foreground mt-1">
                  {t.admin.meta.updated}: {new Date(item.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={item.status === "published" ? "default" : "secondary"}>
                  {item.status === "published" ? t.admin.status.published : t.admin.status.draft}
                </Badge>
                {getViewHref ? (
                  <Button size="sm" variant="outline" asChild>
                    <a href={getViewHref(item)} target="_blank" rel="noreferrer">
                      {t.admin.actions.view}
                    </a>
                  </Button>
                ) : null}
                <Button size="sm" variant="outline" onClick={() => openEdit(item)}>
                  <Pencil className="h-3.5 w-3.5" />
                  {t.admin.actions.edit}
                </Button>
                <Button size="sm" variant="outline" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                  {t.admin.actions.delete}
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
