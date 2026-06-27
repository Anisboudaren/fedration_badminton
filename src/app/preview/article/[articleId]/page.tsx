import { getArticleByIdServer, getPublishedArticles } from "@/lib/data/site-data.server";
import ArticlePreviewPage from "@/views/preview-article-id";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ articleId: string }> };

export default async function Page({ params }: Props) {
  const { articleId } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleByIdServer(articleId),
    getPublishedArticles(),
  ]);
  return <ArticlePreviewPage initialArticle={article} initialArticles={allArticles} />;
}
