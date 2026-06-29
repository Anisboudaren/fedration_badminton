import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/admin/session";
import { findAdminById } from "@/lib/db/repositories/admin-users";
import AdminLoginPage from "@/views/admin-login";

export default async function Page() {
  const session = await getSessionFromCookies();
  if (session) {
    const user = await findAdminById(session.userId);
    if (user?.active) redirect("/admin");
  }

  return <AdminLoginPage />;
}
