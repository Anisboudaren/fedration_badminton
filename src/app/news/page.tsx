import { getPublishedArticles } from "@/lib/data/site-data.server";
import NewsPage from "@/views/news";

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialArticles = await getPublishedArticles();
  return <NewsPage initialArticles={initialArticles} />;
}
