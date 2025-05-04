export type ArticleMap = {
  [id: string]: ArticleData;
};

export type ArticleData = {
  id: string;
  path: string;
  title: string;
  author: string;
  desc: string;
  tags: string[];
  image: {
    src: string;
    alt: string;
  };
  images: {
    url: string;
    alt: string;
  }[];
  featured?: boolean;
};

export type Article = ArticleData & {
  html: string;
};

declare global {
  type ArticleMap = ArticleMap;
  type ArticleData = ArticleData;
  type Article = Article;
}
