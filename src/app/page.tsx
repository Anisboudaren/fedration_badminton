import { getHomePageData } from "@/lib/data/site-data.server";
import Home from "@/views/home";

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialData = await getHomePageData();
  return <Home initialData={initialData} />;
}
