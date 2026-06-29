"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { LOGO_DARK_TEXT, LOGO_WHITE_TEXT } from "@/lib/brand-logos";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n/I18nProvider";
import { isAuthenticated, login } from "@/lib/admin/auth";
import { cn, assetUrl } from "@/lib/utils";

type LoginErrorKey = "email_required" | "password_required" | "client_only" | "unknown";

function AdminLoginPage() {
  const router = useRouter();
  const { t, dir } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorKey, setErrorKey] = useState<LoginErrorKey | null>(null);

  useEffect(() => {
    if (isAuthenticated()) router.push("/admin");
  }, [router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setErrorKey((result.error as LoginErrorKey | undefined) ?? "unknown");
      return;
    }
    router.push("/admin" );
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2" dir={dir}>
      {/* Brand panel — desktop */}
      <div className="relative hidden overflow-hidden bg-footer lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-footer via-footer to-primary/30" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative flex flex-1 flex-col justify-between p-10 xl:p-14">
          <div>
            <img src={LOGO_WHITE_TEXT} alt="ABF" className="h-20 w-auto max-w-[280px] xl:h-24" />
            <p className="mt-6 max-w-sm text-sm font-medium uppercase tracking-[0.2em] text-white/70">
              {t.hero.tagline}
            </p>
            <h2 className="mt-3 max-w-md text-2xl font-bold leading-tight text-white xl:text-3xl">
              {t.admin.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/20 text-white">
              <ShieldCheck className="size-5" />
            </div>
            <p className="text-sm leading-relaxed text-white/80">{t.admin.login.description}</p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="relative flex flex-col bg-background">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
            <Link href="/">
              <ArrowLeft className="size-4 rtl:rotate-180" />
              <span className="hidden sm:inline">{t.nav.home}</span>
            </Link>
          </Button>
          <LangSwitcher className="shrink-0" />
        </div>

        {/* Form */}
        <div className="flex flex-1 items-center justify-center px-4 pb-10 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-start">
              <img
                src={assetUrl(LOGO_DARK_TEXT)}
                alt="ABF"
                className="mx-auto mb-5 h-14 w-auto lg:hidden"
              />
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="size-3.5" />
                CMS
              </div>
              <h1 className="text-2xl font-bold tracking-tight">{t.admin.login.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{t.admin.login.description}</p>
            </div>

            <div
              className={cn(
                "rounded-2xl border border-border/60 bg-card p-6 shadow-lg shadow-primary/5 sm:p-8",
                "lg:border-border/80 lg:shadow-xl",
              )}
            >
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">{t.admin.login.email}</Label>
                  <Input
                    id="admin-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    placeholder="admin@abf.dz"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">{t.admin.login.password}</Label>
                  <Input
                    id="admin-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="h-11"
                  />
                </div>
                {errorKey ? (
                  <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                    {t.admin.login.errors[errorKey] ?? t.admin.login.errors.unknown}
                  </p>
                ) : null}
                <Button className="h-11 w-full text-sm font-semibold" type="submit">
                  {t.admin.login.submit}
                </Button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Algerian Badminton Federation · ABF
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
