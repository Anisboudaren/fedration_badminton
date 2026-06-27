import { getClubs } from "@/lib/data/site-data.server";
import ClubsPage from "@/views/clubs";

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialClubs = await getClubs();
  return <ClubsPage initialClubs={initialClubs} />;
}
