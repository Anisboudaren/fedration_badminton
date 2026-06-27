import { getSponsors } from "@/lib/data/site-data.server";
import SponsorsPage from "@/views/sponsors";

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialSponsors = await getSponsors();
  return <SponsorsPage initialSponsors={initialSponsors} />;
}
