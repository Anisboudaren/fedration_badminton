import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminPanelShell } from "@/components/admin/AdminPanelShell";
import { getSessionFromCookies } from "@/lib/admin/session";
import { findAdminById } from "@/lib/db/repositories/admin-users";

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const session = await getSessionFromCookies();
  if (!session) redirect("/admin/login");

  const user = await findAdminById(session.userId);
  if (!user?.active) redirect("/admin/login");

  return <AdminPanelShell>{children}</AdminPanelShell>;
}
