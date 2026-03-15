export type CategorySlug =
  | ""
  | "epaper"
  | "india"
  | "cities"
  | "upsc"
  | "premium"
  | "entertainment"
  | "politics"
  | "sports"
  | "world"
  | "explained"
  | "opinion"
  | "business"
  | "lifestyle"
  | "tech"
  | "ai"
  | "technology"
  | "world-news"
  | "science"
  | string; // Adding generic string to support RSS ad-hoc feeds if needed
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

