"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  Users,
  ImageIcon,
  LogOut,
  UserCircle,
  Shield,
  Trophy,
  BarChart3,
  Building2,
  Handshake,
  Inbox,
  Settings,
  ExternalLink,
  PanelLeft,
  PanelRight,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import logo from "@/assets/main logo.png";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { logout, fetchSession } from "@/lib/admin/auth";
import { fetchCollectionStats } from "@/lib/cms/client";
import { useI18n } from "@/i18n/I18nProvider";
import { assetUrl } from "@/lib/utils";

type NavKey =
  | "dashboard"
  | "articles"
  | "events"
  | "media"
  | "players"
  | "officials"
  | "teams"
  | "matches"
  | "rankings"
  | "sponsors"
  | "clubs"
  | "requests"
  | "settings";

type NavItem = {
  to: string;
  icon: LucideIcon;
  key: NavKey;
  exact?: boolean;
};

type NavGroupDef = {
  groupKey: keyof typeof groupLabels;
  links: NavItem[];
};

const groupLabels = {
  overview: "overview",
  content: "content",
  people: "people",
  competition: "competition",
  organization: "organization",
  requests: "requests",
  system: "system",
} as const;

const navGroups: NavGroupDef[] = [
  {
    groupKey: "overview",
    links: [{ to: "/admin", icon: LayoutDashboard, key: "dashboard", exact: true }],
  },
  {
    groupKey: "content",
    links: [
      { to: "/admin/articles", icon: Newspaper, key: "articles" },
      { to: "/admin/events", icon: Calendar, key: "events" },
      { to: "/admin/media", icon: ImageIcon, key: "media" },
    ],
  },
  {
    groupKey: "people",
    links: [
      { to: "/admin/players", icon: UserCircle, key: "players" },
      { to: "/admin/officials", icon: Shield, key: "officials" },
      { to: "/admin/teams", icon: Users, key: "teams" },
    ],
  },
  {
    groupKey: "competition",
    links: [
      { to: "/admin/matches", icon: Trophy, key: "matches" },
      { to: "/admin/rankings", icon: BarChart3, key: "rankings" },
    ],
  },
  {
    groupKey: "organization",
    links: [
      { to: "/admin/sponsors", icon: Handshake, key: "sponsors" },
      { to: "/admin/clubs", icon: Building2, key: "clubs" },
    ],
  },
  {
    groupKey: "requests",
    links: [{ to: "/admin/requests", icon: Inbox, key: "requests" }],
  },
  {
    groupKey: "system",
    links: [{ to: "/admin/settings", icon: Settings, key: "settings" }],
  },
];

function useNavActive() {
  const pathname = usePathname();
  return (to: string, exact?: boolean) =>
    exact ? pathname === to || pathname === `${to}/` : pathname === to || pathname.startsWith(`${to}/`);
}

function usePendingRequestCount() {
  const { data } = useQuery({
    queryKey: ["cms", "stats"],
    queryFn: fetchCollectionStats,
  });
  return data?.requests ?? 0;
}

function NavGroups({ compact, tooltipSide, onNavigate }: { compact?: boolean; tooltipSide: "left" | "right"; onNavigate?: () => void }) {
  const { t } = useI18n();
  const isActive = useNavActive();
  const pendingCount = usePendingRequestCount();

  return (
    <>
      {navGroups.map(({ groupKey, links }) => (
        <SidebarGroup key={groupKey}>
          {!compact && <SidebarGroupLabel>{t.admin.navGroups[groupKey]}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map(({ to, icon: Icon, key, exact }) => {
                const label = t.admin.nav[key];
                const active = isActive(to, exact);
                return (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={{ children: label, side: tooltipSide }}
                    >
                      <Link href={to} onClick={onNavigate}>
                        <Icon />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                    {key === "requests" && pendingCount > 0 && (
                      <SidebarMenuBadge>{pendingCount}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}

function AdminSidebarPanel({ side, tooltipSide }: { side: "left" | "right"; tooltipSide: "left" | "right" }) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const initials = (email || "AD").slice(0, 2).toUpperCase();
  const { setOpenMobile, isMobile } = useSidebar();

  useEffect(() => {
    fetchSession().then((session) => setEmail(session?.email ?? ""));
  }, []);

  const closeMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon" side={side}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent active:bg-transparent">
              <Link href="/admin" onClick={closeMobile}>
                <img src={assetUrl(logo)} alt="ABF" className="size-8 shrink-0 object-contain" />
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-semibold">{t.admin.title}</span>
                  <span className="truncate text-xs text-muted-foreground">CMS</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0 overflow-y-auto overscroll-contain">
        <NavGroups tooltipSide={tooltipSide} onNavigate={closeMobile} />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-default hover:bg-transparent active:bg-transparent">
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate text-xs text-muted-foreground">{email}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function AdminSidebarTrigger() {
  const { dir } = useI18n();
  const { toggleSidebar } = useSidebar();
  const PanelIcon = dir === "rtl" ? PanelRight : PanelLeft;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
    >
      <PanelIcon className="h-4 w-4" />
    </Button>
  );
}

function AdminTopBar() {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const onLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  const pageTitle =
    navGroups.flatMap((g) => g.links).find((l) => (l.exact ? pathname === l.to : pathname.startsWith(l.to)))
      ?.key ?? "dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-1.5 border-b bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:gap-2 sm:px-4">
      <AdminSidebarTrigger />
      <Separator orientation="vertical" className="mx-0.5 hidden h-4 sm:block" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold sm:text-base">
          {t.admin.nav[pageTitle as NavKey]}
        </h1>
      </div>
      <LangSwitcher className="shrink-0 [&_button]:px-1.5 [&_button]:text-[10px] sm:[&_button]:px-2 sm:[&_button]:text-[11px]" />
      <Button variant="ghost" size="icon" asChild className="h-8 w-8 shrink-0 sm:hidden">
        <Link href="/" aria-label={t.nav.home}>
          <ExternalLink className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="ghost" size="sm" asChild className="hidden shrink-0 sm:inline-flex">
        <Link href="/">
          <ExternalLink className="h-4 w-4" />
          <span className="hidden lg:inline">{t.nav.home}</span>
        </Link>
      </Button>
      <Button variant="outline" size="icon" onClick={onLogout} className="h-8 w-8 shrink-0 sm:h-9 sm:w-auto sm:px-3">
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">{t.admin.actions.logout}</span>
      </Button>
    </header>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const { dir } = useI18n();
  const sidebarSide = dir === "rtl" ? "right" : "left";
  const tooltipSide = dir === "rtl" ? "left" : "right";

  return (
    <SidebarProvider defaultOpen>
      <AdminSidebarPanel side={sidebarSide} tooltipSide={tooltipSide} />
      <SidebarInset className="min-h-svh min-w-0 w-full max-w-full overflow-x-hidden">
        <AdminTopBar />
        <div className="flex-1 p-3 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
