export interface Article {
  title: string;
  description: string;
  url: string;
  articleImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category?: string;
  author?: string;
}
