export type Article = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export type CreatedArticle = Article & {
  slug: string;
};
