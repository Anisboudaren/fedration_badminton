"use client";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRankings, saveRankings } from "@/lib/admin/content-store";
import type { RankingsCategory, RankingsData, RankingsPlayer, RankingsTeam } from "@/lib/admin/types";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "sonner";

function RankingsAdminPage() {
  const { t } = useI18n();
  const [data, setData] = useState<RankingsData>(() => getRankings());

  const updatePlayer = (catId: string, index: number, field: keyof RankingsPlayer, value: string | number) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) => {
        if (cat.id !== catId || cat.id === "teams") return cat;
        const players = [...cat.players];
        players[index] = { ...players[index], [field]: value };
        return { ...cat, players };
      }),
    }));
  };

  const updateTeam = (index: number, field: keyof RankingsTeam, value: string | number) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) => {
        if (cat.id !== "teams") return cat;
        const teams = [...cat.teams];
        teams[index] = { ...teams[index], [field]: value };
        return { ...cat, teams };
      }),
    }));
  };

  const onSave = () => {
    saveRankings(data);
    toast.success(t.admin.settings.saved);
  };

  const playerCategories = data.categories.filter((c): c is Extract<RankingsCategory, { players: RankingsPlayer[] }> => c.id !== "teams");
  const teamCategory = data.categories.find((c) => c.id === "teams");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{t.admin.pages.rankings.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.admin.pages.rankings.description}</p>
        </div>
        <Button onClick={onSave}>{t.admin.settings.save}</Button>
      </div>

      <Tabs defaultValue={playerCategories[0]?.id ?? "ws"}>
        <TabsList className="flex flex-wrap h-auto">
          {data.categories.map((cat) => (
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
