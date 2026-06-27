"use client";


import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RankingsCategory, RankingsData, RankingsPlayer, RankingsTeam } from "@/lib/admin/types";
import { fetchRankings, saveRankingsApi } from "@/lib/cms/client";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "sonner";

function RankingsAdminPage() {
  const { t } = useI18n();
  const queryClient = useQueryClient();

  const { data: loaded, isLoading } = useQuery({
    queryKey: ["cms", "rankings"],
    queryFn: fetchRankings,
  });

  const [data, setData] = useState<RankingsData | null>(null);
  const draft = data ?? loaded;

  const updatePlayer = (catId: string, index: number, field: keyof RankingsPlayer, value: string | number) => {
    setData((prev) => {
      const base = prev ?? loaded!;
      return {
        ...base,
        categories: base.categories.map((cat) => {
          if (cat.id !== catId || cat.id === "teams") return cat;
          const players = [...cat.players];
          players[index] = { ...players[index], [field]: value };
          return { ...cat, players };
        }),
      };
    });
  };

  const updateTeam = (index: number, field: keyof RankingsTeam, value: string | number) => {
    setData((prev) => {
      const base = prev ?? loaded!;
      return {
        ...base,
        categories: base.categories.map((cat) => {
          if (cat.id !== "teams") return cat;
          const teams = [...cat.teams];
          teams[index] = { ...teams[index], [field]: value };
          return { ...cat, teams };
        }),
      };
    });
  };

  const saveMutation = useMutation({
    mutationFn: saveRankingsApi,
    onSuccess: (saved) => {
      setData(saved);
      queryClient.invalidateQueries({ queryKey: ["cms", "rankings"] });
      toast.success(t.admin.settings.saved);
    },
    onError: () => toast.error("Save failed"),
  });

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

  const playerCategories = draft.categories.filter((c): c is Extract<RankingsCategory, { players: RankingsPlayer[] }> => c.id !== "teams");
  const teamCategory = draft.categories.find((c) => c.id === "teams");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{t.admin.pages.rankings.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.admin.pages.rankings.description}</p>
        </div>
        <Button onClick={onSave} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {t.admin.settings.save}
        </Button>
      </div>

      <Tabs defaultValue={playerCategories[0]?.id ?? "ws"}>
        <TabsList className="flex flex-wrap h-auto">
          {draft.categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.fr}
            </TabsTrigger>
          ))}
        </TabsList>

        {playerCategories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{cat.fr}</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 pe-2 text-left">#</th>
                      <th className="pb-2 pe-2 text-left">Name</th>
                      <th className="pb-2 pe-2 text-left">Club</th>
                      <th className="pb-2 pe-2 text-left">League</th>
                      <th className="pb-2 pe-2 text-left">J1</th>
                      <th className="pb-2 pe-2 text-left">J2</th>
                      <th className="pb-2 pe-2 text-left">J3</th>
                      <th className="pb-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.players.map((p, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-1 pe-2">{i + 1}</td>
                        <td className="py-1 pe-2">
                          <Input
                            className="h-7 text-xs min-w-[120px]"
                            value={p.name}
                            onChange={(e) => updatePlayer(cat.id, i, "name", e.target.value)}
                          />
                        </td>
                        <td className="py-1 pe-2">
                          <Input
                            className="h-7 text-xs min-w-[80px]"
                            value={p.club}
                            onChange={(e) => updatePlayer(cat.id, i, "club", e.target.value)}
                          />
                        </td>
                        <td className="py-1 pe-2">
                          <Input
                            className="h-7 text-xs min-w-[80px]"
                            value={p.league}
                            onChange={(e) => updatePlayer(cat.id, i, "league", e.target.value)}
                          />
                        </td>
                        {(["j1", "j2", "j3", "total"] as const).map((f) => (
                          <td key={f} className="py-1 pe-2">
                            <Input
                              className="h-7 text-xs w-16"
                              type="number"
                              value={p[f]}
                              onChange={(e) => updatePlayer(cat.id, i, f, Number(e.target.value))}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        {teamCategory && teamCategory.id === "teams" && (
          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{teamCategory.fr}</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 pe-2 text-left">#</th>
                      <th className="pb-2 pe-2 text-left">Club</th>
                      <th className="pb-2 pe-2 text-left">Wilaya</th>
                      <th className="pb-2 pe-2 text-left">J1</th>
                      <th className="pb-2 pe-2 text-left">J2</th>
                      <th className="pb-2 pe-2 text-left">J3</th>
                      <th className="pb-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamCategory.teams.map((team, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-1 pe-2">{i + 1}</td>
                        <td className="py-1 pe-2">
                          <Input
                            className="h-7 text-xs"
                            value={team.club}
                            onChange={(e) => updateTeam(i, "club", e.target.value)}
                          />
                        </td>
                        <td className="py-1 pe-2">
                          <Input
                            className="h-7 text-xs"
                            value={team.wilaya}
                            onChange={(e) => updateTeam(i, "wilaya", e.target.value)}
                          />
                        </td>
                        {(["j1", "j2", "j3", "total"] as const).map((f) => (
                          <td key={f} className="py-1 pe-2">
                            <Input
                              className="h-7 text-xs w-16"
                              type="number"
                              value={team[f]}
                              onChange={(e) => updateTeam(i, f, Number(e.target.value))}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

export default RankingsAdminPage;
