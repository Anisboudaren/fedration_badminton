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
import { logout, getAuthUserEmail } from "@/lib/admin/auth";
import { countPendingRequests } from "@/lib/admin/content-store";
import { useI18n } from "@/i18n/I18nProvider";
import { cn, assetUrl } from "@/lib/utils";

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

function NavGroups({ compact, tooltipSide }: { compact?: boolean; tooltipSide: "left" | "right" }) {
  const { t } = useI18n();
  const isActive = useNavActive();
  const pendingCount = countPendingRequests();

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
                      <Link href={to}>
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

function MobileIconRail() {
  const { t } = useI18n();
  const isActive = useNavActive();
  const pendingCount = countPendingRequests();
  const router = useRouter();
  const allLinks = navGroups.flatMap((g) => g.links);

  const onLogout = () => {
    logout();
    router.push("/admin/login" );
  };

  return (
    <aside className="fixed inset-y-0 start-0 z-40 flex w-14 flex-col border-e border-sidebar-border bg-sidebar text-sidebar-foreground md:hidden">
      <div className="flex h-14 shrink-0 items-center justify-center border-b border-sidebar-border">
        <img src={assetUrl(logo)} alt="ABF" className="h-8 w-8 object-contain" />
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-1.5">
        {allLinks.map(({ to, icon: Icon, key, exact }) => {
          const active = isActive(to, exact);
          const label = t.admin.nav[key];
          return (
            <Link
              key={to}
              href={to}
              className={cn(
                "relative flex h-10 w-full items-center justify-center rounded-md transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
              title={label}
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
              {key === "requests" && pendingCount > 0 && (
                <span className="absolute end-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">
                  {pendingCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-1.5">
        <button
          type="button"
          onClick={onLogout}
          className="flex h-10 w-full items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          title={t.admin.actions.logout}
          aria-label={t.admin.actions.logout}
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

function AdminSidebarPanel({ side, tooltipSide }: { side: "left" | "right"; tooltipSide: "left" | "right" }) {
  const { t } = useI18n();
  const email = getAuthUserEmail();
  const initials = email.slice(0, 2).toUpperCase();

  return (
    <Sidebar collapsible="icon" side={side}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent active:bg-transparent">
              <Link href="/admin">
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

      <SidebarContent className="gap-0 overflow-y-auto">
        <NavGroups tooltipSide={tooltipSide} />
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

function RtlSidebarTrigger() {
  const { dir } = useI18n();
  const { toggleSidebar } = useSidebar();
  const PanelIcon = dir === "rtl" ? PanelRight : PanelLeft;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="-ms-1 hidden h-7 w-7 md:inline-flex"
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
  const isNavigating = false;

  const onLogout = () => {
    logout();
    router.push("/admin/login" );
  };

  const pageTitle =
    navGroups.flatMap((g) => g.links).find((l) => (l.exact ? pathname === l.to : pathname.startsWith(l.to)))
      ?.key ?? "dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-primary transition-opacity duration-200",
          isNavigating ? "opacity-100" : "opacity-0",
        )}
      />
      <RtlSidebarTrigger />
      <Separator orientation="vertical" className="mx-1 hidden h-4 md:block" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold md:text-base">
          {t.admin.nav[pageTitle as NavKey]}
        </h1>
      </div>
      <LangSwitcher className="shrink-0" />
      <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
        <Link href="/">
          <ExternalLink className="h-4 w-4" />
          <span className="hidden lg:inline">{t.nav.home}</span>
        </Link>
      </Button>
      <Button variant="outline" size="sm" onClick={onLogout}>
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
      <MobileIconRail />
      <div className="hidden md:contents">
        <AdminSidebarPanel side={sidebarSide} tooltipSide={tooltipSide} />
      </div>
      <SidebarInset className="min-h-svh w-full ps-14 md:ps-0" dir={dir}>
        <AdminTopBar />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
