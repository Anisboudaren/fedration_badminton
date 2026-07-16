"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentManagerPage } from "@/components/admin/ContentManagerPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiLangTabs } from "@/components/admin/MultiLangTabs";
import { emptyAboutDocument, emptyAboutOrgNode } from "@/lib/data/about-defaults";
import { emptyLocalizedText, type AboutPageContent, type FederationMemberItem } from "@/lib/admin/types";
import { fetchAboutPage, saveAboutPageApi } from "@/lib/cms/client";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "sonner";

const emptyMember = (): FederationMemberItem => ({
  id: "",
  title: emptyLocalizedText(),
  firstName: emptyLocalizedText(),
  lastName: emptyLocalizedText(),
  role: emptyLocalizedText(),
  photoUrl: "",
  sortOrder: 0,
  status: "draft",
  createdAt: "",
  updatedAt: "",
});

function AboutContentEditor() {
  const { t } = useI18n();
  const queryClient = useQueryClient();

  const { data: loaded, isLoading } = useQuery({
    queryKey: ["cms", "about"],
    queryFn: fetchAboutPage,
  });

  const [draft, setDraft] = useState<AboutPageContent | null>(null);
  const content = draft ?? loaded;

  const saveMutation = useMutation({
    mutationFn: saveAboutPageApi,
    onSuccess: (data) => {
      setDraft(data);
      queryClient.invalidateQueries({ queryKey: ["cms", "about"] });
      toast.success(t.admin.settings.saved);
    },
    onError: () => toast.error("Save failed"),
  });

  if (isLoading || !content) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  const update = (next: AboutPageContent) => setDraft(next);

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-24">
      <div className="sticky top-14 z-20 -mx-1 flex items-center justify-between gap-3 border-b bg-background/95 px-1 py-3 backdrop-blur">
        <p className="text-sm text-muted-foreground">{t.admin.pages.about.description}</p>
        <Button
          size="lg"
          className="shrink-0 px-6"
          onClick={() => saveMutation.mutate(content)}
          disabled={saveMutation.isPending}
        >
          {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {t.admin.settings.save}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t.admin.about.heroSection}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-8 pt-2">
          <ImageUploadField
            label={t.admin.about.heroImage}
            value={content.heroImageUrl}
            onChange={(heroImageUrl) => update({ ...content, heroImageUrl })}
            folder="about"
          />
          <MultiLangTabs>
            {(lang) => (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>{t.admin.about.heroTitle}</Label>
                  <Input
                    className="h-11 text-base"
                    value={content.heroTitle[lang]}
                    onChange={(e) =>
                      update({ ...content, heroTitle: { ...content.heroTitle, [lang]: e.target.value } })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.admin.about.heroIntro}</Label>
                  <Textarea
                    rows={6}
                    className="min-h-[140px] resize-y text-base leading-relaxed"
                    value={content.heroIntro[lang]}
                    onChange={(e) =>
                      update({ ...content, heroIntro: { ...content.heroIntro, [lang]: e.target.value } })
                    }
                  />
                </div>
              </div>
            )}
          </MultiLangTabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t.admin.about.missionSection}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-8 pt-2">
          <ImageUploadField
            label={t.admin.about.missionImage}
            value={content.missionImageUrl}
            onChange={(missionImageUrl) => update({ ...content, missionImageUrl })}
            folder="about"
          />
          <MultiLangTabs>
            {(lang) => (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>{t.admin.about.missionTitle}</Label>
                  <Input
                    className="h-11 text-base"
                    value={content.missionTitle[lang]}
                    onChange={(e) =>
                      update({
                        ...content,
                        missionTitle: { ...content.missionTitle, [lang]: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.admin.about.missionP1}</Label>
                  <Textarea
                    rows={7}
                    className="min-h-[160px] resize-y text-base leading-relaxed"
                    value={content.missionP1[lang]}
                    onChange={(e) =>
                      update({ ...content, missionP1: { ...content.missionP1, [lang]: e.target.value } })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.admin.about.missionP2}</Label>
                  <Textarea
                    rows={7}
                    className="min-h-[160px] resize-y text-base leading-relaxed"
                    value={content.missionP2[lang]}
                    onChange={(e) =>
                      update({ ...content, missionP2: { ...content.missionP2, [lang]: e.target.value } })
                    }
                  />
                </div>
              </div>
            )}
          </MultiLangTabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t.admin.about.leadershipHeadings}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-8 pt-2">
          <MultiLangTabs>
            {(lang) => (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>{t.admin.about.leadershipTitle}</Label>
                  <Input
                    className="h-11 text-base"
                    value={content.leadershipTitle[lang]}
                    onChange={(e) =>
                      update({
                        ...content,
                        leadershipTitle: { ...content.leadershipTitle, [lang]: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.admin.about.leadershipIntro}</Label>
                  <Textarea
                    rows={5}
                    className="min-h-[120px] resize-y text-base leading-relaxed"
                    value={content.leadershipIntro[lang]}
                    onChange={(e) =>
                      update({
                        ...content,
                        leadershipIntro: { ...content.leadershipIntro, [lang]: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </MultiLangTabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-2">
          <CardTitle className="text-lg">{t.admin.about.orgSection}</CardTitle>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => update({ ...content, orgNodes: [...content.orgNodes, emptyAboutOrgNode()] })}
          >
            <Plus className="h-4 w-4" />
            {t.admin.about.addOrgNode}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-8 pt-2">
          <MultiLangTabs>
            {(lang) => (
              <div className="space-y-2">
                <Label>{t.admin.about.orgTitle}</Label>
                <Input
                  className="h-11 text-base"
                  value={content.orgTitle[lang]}
                  onChange={(e) =>
                    update({ ...content, orgTitle: { ...content.orgTitle, [lang]: e.target.value } })
                  }
                />
              </div>
            )}
          </MultiLangTabs>

          {content.orgNodes.map((node, index) => (
            <div key={node.id} className="space-y-4 rounded-xl border bg-muted/20 p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">
                  {t.admin.about.orgNode} {index + 1}
                </p>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    disabled={index === 0}
                    onClick={() => {
                      const nodes = [...content.orgNodes];
                      [nodes[index - 1], nodes[index]] = [nodes[index], nodes[index - 1]];
                      update({ ...content, orgNodes: nodes });
                    }}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    disabled={index === content.orgNodes.length - 1}
                    onClick={() => {
                      const nodes = [...content.orgNodes];
                      [nodes[index], nodes[index + 1]] = [nodes[index + 1], nodes[index]];
                      update({ ...content, orgNodes: nodes });
                    }}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive"
                    onClick={() =>
                      update({ ...content, orgNodes: content.orgNodes.filter((n) => n.id !== node.id) })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ImageUploadField
                label={t.admin.about.orgImage}
                value={node.imageUrl ?? ""}
                onChange={(imageUrl) => {
                  const orgNodes = content.orgNodes.map((n) =>
                    n.id === node.id ? { ...n, imageUrl } : n,
                  );
                  update({ ...content, orgNodes });
                }}
                folder="about/org"
              />
              <MultiLangTabs>
                {(lang) => (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>{t.admin.forms.title}</Label>
                      <Input
                        className="h-11 text-base"
                        value={node.title[lang]}
                        onChange={(e) => {
                          const orgNodes = content.orgNodes.map((n) =>
                            n.id === node.id ? { ...n, title: { ...n.title, [lang]: e.target.value } } : n,
                          );
                          update({ ...content, orgNodes });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t.admin.about.subtitle}</Label>
                      <Input
                        className="h-11 text-base"
                        value={node.subtitle[lang]}
                        onChange={(e) => {
                          const orgNodes = content.orgNodes.map((n) =>
                            n.id === node.id
                              ? { ...n, subtitle: { ...n.subtitle, [lang]: e.target.value } }
                              : n,
                          );
                          update({ ...content, orgNodes });
                        }}
                      />
                    </div>
                  </div>
                )}
              </MultiLangTabs>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t.admin.about.regulationsSection}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-6 pb-8 pt-2">
          <MultiLangTabs>
            {(lang) => (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>{t.admin.about.regulationsTitle}</Label>
                  <Input
                    className="h-11 text-base"
                    value={content.regulationsTitle[lang]}
                    onChange={(e) =>
                      update({
                        ...content,
                        regulationsTitle: { ...content.regulationsTitle, [lang]: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.admin.about.regulationsIntro}</Label>
                  <Textarea
                    rows={6}
                    className="min-h-[140px] resize-y text-base leading-relaxed"
                    value={content.regulationsIntro[lang]}
                    onChange={(e) =>
                      update({
                        ...content,
                        regulationsIntro: { ...content.regulationsIntro, [lang]: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </MultiLangTabs>
          <p className="text-sm text-muted-foreground">{t.admin.about.regulationsNote}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-2">
          <CardTitle className="text-lg">{t.admin.about.documentsSection}</CardTitle>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              update({ ...content, documents: [...content.documents, emptyAboutDocument()] })
            }
          >
            <Plus className="h-4 w-4" />
            {t.admin.about.addDocument}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-8 pt-2">
          <MultiLangTabs>
            {(lang) => (
              <div className="space-y-2">
                <Label>{t.admin.about.documentsTitle}</Label>
                <Input
                  className="h-11 text-base"
                  value={content.documentsTitle[lang]}
                  onChange={(e) =>
                    update({
                      ...content,
                      documentsTitle: { ...content.documentsTitle, [lang]: e.target.value },
                    })
                  }
                />
              </div>
            )}
          </MultiLangTabs>

          {content.documents.map((doc, index) => (
            <div key={doc.id} className="space-y-4 rounded-xl border bg-muted/20 p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">
                  {t.admin.about.document} {index + 1}
                </p>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive"
                  onClick={() =>
                    update({
                      ...content,
                      documents: content.documents.filter((d) => d.id !== doc.id),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t.admin.about.docKind}</Label>
                  <Select
                    value={doc.kind}
                    onValueChange={(kind: "file" | "link") => {
                      const documents = content.documents.map((d) =>
                        d.id === doc.id ? { ...d, kind } : d,
                      );
                      update({ ...content, documents });
                    }}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="file">{t.admin.about.kindFile}</SelectItem>
                      <SelectItem value="link">{t.admin.about.kindLink}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {doc.kind === "file" ? (
                  <div className="space-y-2">
                    <Label>{t.admin.about.fileUrl}</Label>
                    <Input
                      className="h-11 text-base"
                      value={doc.fileUrl ?? ""}
                      onChange={(e) => {
                        const documents = content.documents.map((d) =>
                          d.id === doc.id ? { ...d, fileUrl: e.target.value } : d,
                        );
                        update({ ...content, documents });
                      }}
                      placeholder="/assets/info/..."
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>{t.admin.about.linkHref}</Label>
                    <Input
                      className="h-11 text-base"
                      value={doc.href ?? ""}
                      onChange={(e) => {
                        const documents = content.documents.map((d) =>
                          d.id === doc.id ? { ...d, href: e.target.value } : d,
                        );
                        update({ ...content, documents });
                      }}
                      placeholder="/events"
                    />
                  </div>
                )}
              </div>
              <MultiLangTabs>
                {(lang) => (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>{t.admin.forms.title}</Label>
                      <Input
                        className="h-11 text-base"
                        value={doc.title[lang]}
                        onChange={(e) => {
                          const documents = content.documents.map((d) =>
                            d.id === doc.id ? { ...d, title: { ...d.title, [lang]: e.target.value } } : d,
                          );
                          update({ ...content, documents });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t.admin.about.subtitle}</Label>
                      <Input
                        className="h-11 text-base"
                        value={doc.subtitle[lang]}
                        onChange={(e) => {
                          const documents = content.documents.map((d) =>
                            d.id === doc.id
                              ? { ...d, subtitle: { ...d.subtitle, [lang]: e.target.value } }
                              : d,
                          );
                          update({ ...content, documents });
                        }}
                      />
                    </div>
                  </div>
                )}
              </MultiLangTabs>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.admin.pages.about.title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t.admin.pages.about.description}
        </p>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="h-11">
          <TabsTrigger value="content" className="px-5">
            {t.admin.about.tabContent}
          </TabsTrigger>
          <TabsTrigger value="leadership" className="px-5">
            {t.admin.about.tabLeadership}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="mt-8">
          <AboutContentEditor />
        </TabsContent>
        <TabsContent value="leadership" className="mt-8">
          <ContentManagerPage<FederationMemberItem>
            collection="federation-members"
            title={t.admin.about.leadershipMembers}
            description={t.admin.about.leadershipMembersDesc}
            createEmpty={emptyMember}
            getSummary={(item) => item.role.en || item.role.fr || item.role.ar}
            validate={(item) => {
              if (!item.firstName.en && !item.firstName.fr && !item.firstName.ar) {
                return "First name is required in at least one language";
              }
              return null;
            }}
            renderFormFields={({ draft, setDraft }) => {
              const syncTitle = (
                firstName: FederationMemberItem["firstName"],
                lastName: FederationMemberItem["lastName"],
              ) => ({
                en: `${firstName.en} ${lastName.en}`.trim(),
                fr: `${firstName.fr} ${lastName.fr}`.trim(),
                ar: `${firstName.ar} ${lastName.ar}`.trim(),
              });

              return (
                <div className="space-y-6">
                  <ImageUploadField
                    label={t.admin.forms.photoUrl}
                    value={draft.photoUrl}
                    onChange={(photoUrl) => setDraft({ ...draft, photoUrl })}
                    folder="about/members"
                  />
                  <div className="space-y-2">
                    <Label>{t.admin.about.sortOrder}</Label>
                    <Input
                      type="number"
                      className="h-11 max-w-[10rem] text-base"
                      value={draft.sortOrder}
                      onChange={(e) => setDraft({ ...draft, sortOrder: Number(e.target.value) || 0 })}
                    />
                  </div>
                  <MultiLangTabs>
                    {(lang) => (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <Label>{t.admin.about.firstName}</Label>
                          <Input
                            className="h-11 text-base"
                            value={draft.firstName[lang]}
                            onChange={(e) => {
                              const firstName = { ...draft.firstName, [lang]: e.target.value };
                              setDraft({
                                ...draft,
                                firstName,
                                title: syncTitle(firstName, draft.lastName),
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{t.admin.about.lastName}</Label>
                          <Input
                            className="h-11 text-base"
                            value={draft.lastName[lang]}
                            onChange={(e) => {
                              const lastName = { ...draft.lastName, [lang]: e.target.value };
                              setDraft({
                                ...draft,
                                lastName,
                                title: syncTitle(draft.firstName, lastName),
                              });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{t.admin.forms.role}</Label>
                          <Input
                            className="h-11 text-base"
                            value={draft.role[lang]}
                            onChange={(e) =>
                              setDraft({ ...draft, role: { ...draft.role, [lang]: e.target.value } })
                            }
                          />
                        </div>
                      </div>
                    )}
                  </MultiLangTabs>
                </div>
              );
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AboutPage;
