"use client";

import Link from "next/link";
import {
  Newspaper,
  Calendar,
  Users,
  ImageIcon,
  UserCircle,
  Shield,
  Trophy,
  Handshake,
  Building2,
  Inbox,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type CollectionKey } from "@/lib/admin/content-store";
import { fetchCollectionStats, fetchRecentActivity } from "@/lib/cms/client";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const statCollections: {
  key: CollectionKey | "requests";
  icon: LucideIcon;
  to: string;
  navKey: string;
  accent: string;
  iconBg: string;
}[] = [
  { key: "articles", icon: Newspaper, to: "/admin/articles", navKey: "articles", accent: "from-emerald-500/15 to-transparent", iconBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  { key: "events", icon: Calendar, to: "/admin/events", navKey: "events", accent: "from-sky-500/15 to-transparent", iconBg: "bg-sky-500/10 text-sky-700 dark:text-sky-400" },
  { key: "players", icon: UserCircle, to: "/admin/players", navKey: "players", accent: "from-violet-500/15 to-transparent", iconBg: "bg-violet-500/10 text-violet-700 dark:text-violet-400" },
  { key: "officials", icon: Shield, to: "/admin/officials", navKey: "officials", accent: "from-indigo-500/15 to-transparent", iconBg: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400" },
  { key: "teams", icon: Users, to: "/admin/teams", navKey: "teams", accent: "from-teal-500/15 to-transparent", iconBg: "bg-teal-500/10 text-teal-700 dark:text-teal-400" },
  { key: "media", icon: ImageIcon, to: "/admin/media", navKey: "media", accent: "from-pink-500/15 to-transparent", iconBg: "bg-pink-500/10 text-pink-700 dark:text-pink-400" },
  { key: "matches", icon: Trophy, to: "/admin/matches", navKey: "matches", accent: "from-amber-500/15 to-transparent", iconBg: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  { key: "sponsors", icon: Handshake, to: "/admin/sponsors", navKey: "sponsors", accent: "from-orange-500/15 to-transparent", iconBg: "bg-orange-500/10 text-orange-700 dark:text-orange-400" },
  { key: "clubs", icon: Building2, to: "/admin/clubs", navKey: "clubs", accent: "from-cyan-500/15 to-transparent", iconBg: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400" },
  { key: "requests", icon: Inbox, to: "/admin/requests", navKey: "requests", accent: "from-rose-500/15 to-transparent", iconBg: "bg-rose-500/10 text-rose-700 dark:text-rose-400" },
];

function StatCard({
  label,
  count,
  icon: Icon,
  to,
  accent,
  iconBg,
}: {
  label: string;
  count: number;
  icon: LucideIcon;
  to: string;
  accent: string;
  iconBg: string;
}) {
  return (
    <Link href={to} className="group block h-full">
      <Card className="relative h-full overflow-hidden border-border/60 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
        <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80", accent)} />
        <CardHeader className="relative flex flex-row items-start justify-between space-y-0 pb-2">
          <div className={cn("grid size-10 place-items-center rounded-xl", iconBg)}>
            <Icon className="size-5" />
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground/50 transition group-hover:text-primary rtl:-scale-x-100" />
        </CardHeader>
        <CardContent className="relative">
          <p className="text-3xl font-bold tracking-tight tabular-nums">{count}</p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">{label}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function AdminDashboardPage() {
  const { t } = useI18n();

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["cms", "stats"],
    queryFn: fetchCollectionStats,
  });

  const { data: activity = [], isLoading: activityLoading } = useQuery({
    queryKey: ["cms", "activity"],
    queryFn: () => fetchRecentActivity(8),
  });

  const pending = stats.requests ?? 0;

  const statItems = statCollections.map(({ key, icon, to, navKey, accent, iconBg }) => ({
    key,
    icon,
    to,
    accent,
    iconBg,
    label: t.admin.nav[navKey as keyof typeof t.admin.nav],
    count: key === "requests" ? pending : (stats[key] ?? 0),
  }));

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            CMS
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.admin.dashboard.title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground sm:text-base">{t.admin.dashboard.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link href="/admin/articles">
              <Plus className="size-4" />
              {t.admin.dashboard.newArticle}
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/events">
              <Plus className="size-4" />
              {t.admin.dashboard.newEvent}
            </Link>
          </Button>
        </div>
      </div>

      {pending > 0 && (
        <Card className="overflow-hidden border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/15 text-amber-700">
                <Inbox className="size-5" />
              </div>
              <div>
                <p className="font-semibold">{t.admin.dashboard.pendingRequests}</p>
                <p className="text-sm text-muted-foreground">
                  {pending} {t.admin.requests.pending.toLowerCase()}
                </p>
              </div>
            </div>
            <Button asChild className="shrink-0">
              <Link href="/admin/requests">{t.admin.dashboard.reviewRequests}</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {statsLoading ? (
        <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {statItems.map((stat) => (
            <StatCard
              key={stat.key}
              label={stat.label}
              count={stat.count}
              icon={stat.icon}
              to={stat.to}
              accent={stat.accent}
              iconBg={stat.iconBg}
            />
          ))}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-5 lg:gap-6">
        <Card className="border-border/60 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">{t.admin.dashboard.quickActions}</CardTitle>
            <CardDescription>{t.admin.dashboard.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            <Button asChild variant="outline" className="h-auto justify-start gap-3 px-4 py-3">
              <Link href="/admin/articles">
                <Newspaper className="size-4 shrink-0 text-emerald-600" />
                <span className="text-start">{t.admin.dashboard.newArticle}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto justify-start gap-3 px-4 py-3">
              <Link href="/admin/events">
                <Calendar className="size-4 shrink-0 text-sky-600" />
                <span className="text-start">{t.admin.dashboard.newEvent}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto justify-start gap-3 px-4 py-3 sm:col-span-2">
              <Link href="/admin/requests">
                <Inbox className="size-4 shrink-0 text-rose-600" />
                <span className="text-start">{t.admin.dashboard.reviewRequests}</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="size-4 text-muted-foreground" />
              {t.admin.dashboard.recentActivity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : activity.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t.admin.dashboard.noActivity}</p>
            ) : (
              <ul className="divide-y divide-border/60">
                {activity.map((item) => (
                  <li
                    key={`${item.collection}-${item.id}`}
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.updatedAt).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-[10px] uppercase tracking-wide">
                      {item.collection}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
