export type CategorySlug =
  | "sports"
  | "entertainment"
  | "ai"
  | "technology"
  | "world-news"
  | "politics"
  | "business"
  | "science";

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category_id: string;
  author_id: string;
  image_url: string | null;
  created_at: string;
  category?: Category;
}

