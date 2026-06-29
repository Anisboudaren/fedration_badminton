"use client";

import type { ReactNode } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";

export function AdminPanelShell({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
