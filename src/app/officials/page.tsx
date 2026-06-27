import { getOfficials } from "@/lib/data/site-data.server";
import OfficialsPage from "@/views/officials";

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialOfficials = await getOfficials();
  return <OfficialsPage initialOfficials={initialOfficials} />;
}
