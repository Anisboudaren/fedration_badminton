"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createId } from "@/lib/admin/content-store";
import type { LicenceRequest, Player, RequestStatus } from "@/lib/admin/types";
import { emptyLocalizedText } from "@/lib/admin/types";
import {
  createItem,
  listLicenceRequestsApi,
  updateLicenceRequestApi,
} from "@/lib/cms/client";
import { useI18n } from "@/i18n/I18nProvider";

function RequestsAdminPage() {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<RequestStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["licence-requests"],
    queryFn: listLicenceRequestsApi,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<LicenceRequest> }) =>
      updateLicenceRequestApi(id, patch),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["licence-requests"] }),
  });

  const filtered = useMemo(
    () => (filter === "all" ? requests : requests.filter((r) => r.status === filter)),
    [requests, filter],
  );

  const selected = requests.find((r) => r.id === selectedId);

  const openDetail = (req: LicenceRequest) => {
    setSelectedId(req.id);
    setNotes(req.adminNotes);
  };

  const setStatus = (id: string, status: RequestStatus) => {
    updateMutation.mutate({ id, patch: { status, adminNotes: notes } });
    setSelectedId(id);
  };

  const createPlayerFromRequest = async (req: LicenceRequest) => {
    const now = new Date().toISOString();
    const player: Player = {
      id: createId(),
      title: { en: req.fullName, fr: req.fullName, ar: req.fullName },
      club: { en: req.club, fr: req.club, ar: req.club },
      category: { en: req.category, fr: req.category, ar: req.category },
      wilayaCode: req.wilaya,
      ranking: 999,
      photoUrl: req.documents.photo ?? "",
      bio: emptyLocalizedText(),
      achievements: [],
      status: "draft",
      createdAt: now,
      updatedAt: now,
    };
    await createItem("players", player);
    updateMutation.mutate({ id: req.id, patch: { status: "approved", adminNotes: notes } });
  };

  const tabs: { key: RequestStatus | "all"; label: string }[] = [
    { key: "all", label: t.admin.requests.all },
    { key: "pending", label: t.admin.requests.pending },
    { key: "approved", label: t.admin.requests.approved },
    { key: "rejected", label: t.admin.requests.rejected },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.admin.pages.requests.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.admin.pages.requests.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={filter === tab.key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t.admin.pages.requests.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t.admin.requests.noRequests}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-2 pe-4">{t.admin.requests.applicant}</th>
                      <th className="pb-2 pe-4">{t.admin.requests.type}</th>
                      <th className="pb-2 pe-4">{t.admin.forms.wilaya}</th>
                      <th className="pb-2 pe-4">{t.admin.requests.submitted}</th>
                      <th className="pb-2">{t.admin.forms.category}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((req) => (
                      <tr
                        key={req.id}
                        className={`border-b cursor-pointer hover:bg-muted/50 ${selectedId === req.id ? "bg-muted/30" : ""}`}
                        onClick={() => openDetail(req)}
                      >
                        <td className="py-3 pe-4 font-medium">{req.fullName}</td>
                        <td className="py-3 pe-4">
                          {req.licenceType === "athlete" ? t.admin.requests.athlete : t.admin.requests.coach}
                        </td>
                        <td className="py-3 pe-4">{req.wilaya}</td>
                        <td className="py-3 pe-4">{new Date(req.submittedAt).toLocaleDateString()}</td>
                        <td className="py-3">
                          <Badge variant={req.status === "pending" ? "secondary" : req.status === "approved" ? "default" : "destructive"}>
                            {t.admin.requestStatus[req.status]}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {selected && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.admin.requests.detail}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                <strong>{t.admin.requests.applicant}:</strong> {selected.fullName}
              </p>
              <p>
                <strong>{t.admin.requests.type}:</strong>{" "}
                {selected.licenceType === "athlete" ? t.admin.requests.athlete : t.admin.requests.coach}
              </p>
              <p>
                <strong>{t.admin.forms.email}:</strong> {selected.email}
              </p>
              <p>
                <strong>{t.admin.forms.phone}:</strong> {selected.phone}
              </p>
              <p>
                <strong>{t.admin.forms.teamName}:</strong> {selected.club}
              </p>
              <p>
                <strong>{t.admin.forms.category}:</strong> {selected.category}
              </p>
              {Object.entries(selected.documents).map(([key, url]) =>
                url ? (
                  <p key={key}>
                    <strong>{key}:</strong>{" "}
                    <a href={url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      View
                    </a>
                  </p>
                ) : null,
              )}
              <div className="space-y-1.5">
                <label className="font-medium">{t.admin.requests.notes}</label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" onClick={() => setStatus(selected.id, "approved")} disabled={updateMutation.isPending}>
                  {t.admin.requests.approve}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setStatus(selected.id, "rejected")} disabled={updateMutation.isPending}>
                  {t.admin.requests.reject}
                </Button>
                {selected.licenceType === "athlete" && (
                  <Button size="sm" variant="outline" onClick={() => void createPlayerFromRequest(selected)} disabled={updateMutation.isPending}>
                    {t.admin.requests.createPlayer}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default RequestsAdminPage;
