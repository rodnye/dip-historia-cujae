import { useEffect, useState } from 'react';
import articlesJson from '../articles.json';
import { Article, ArticleData, ArticleMap } from '../@types/articles';

export const articlesMap: ArticleMap = articlesJson;
export const articles: ArticleData[] = Object.values(articlesMap);

export const loadArticle = async (id: string): Promise<Article> => {
  const article = articlesMap[id];
  if (!article) throw new Error('Not found');

  const req = await fetch(article.path + '/content.html');
  return {
    ...article,
    html: await req.text(),
  };
};

export const useArticle = (articleId: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const article = await loadArticle(articleId || '');
        setArticle(article);
        setError(null);
      } catch (e) {
        setArticle(null);
        if (e instanceof Error) {
          setError(e.message);
        }
      }
      setLoading(false);
    })();
  }, [articleId]);

  return { article, loading, error };
};
