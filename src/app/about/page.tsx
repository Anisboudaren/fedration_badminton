import { getAboutPageData } from "@/lib/data/site-data.server";
import AboutPage from "@/views/about";

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialData = await getAboutPageData();
  return <AboutPage initialData={initialData} />;
}
