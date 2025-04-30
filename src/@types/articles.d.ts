type ArticleMap = {
  [id: string]: ArticleData;
};

type ArticleData = {
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

type Article = ArticleData & {
  html: string;
};
