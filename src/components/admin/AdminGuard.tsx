"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { isAuthenticated } from "@/lib/admin/auth";
import { AdminLoader } from "./AdminLoader";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(() =>
    typeof window === "undefined" ? null : isAuthenticated(),
  );

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  useEffect(() => {
    if (authed === false) router.replace("/admin/login");
  }, [authed, router]);

  if (authed === null) return <AdminLoader />;
  if (!authed) return <AdminLoader />;

  return <>{children}</>;
}
