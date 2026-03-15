"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Article } from "@/types/article";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/articles?category=${encodeURIComponent(slug)}`);
      if (!res.ok) {
        throw new Error("Failed to load category articles");
      }
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryArticles();
  }, [slug]);

  const prettyName = slug.replace("-", " ");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight capitalize">
          {prettyName}
        </h1>
        <button
          type="button"
          onClick={fetchCategoryArticles}
          disabled={loading}
          className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          ⟳ {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {!loading && articles.length === 0 && !error && (
        <p className="text-sm text-zinc-600">
          No articles found in this category yet.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="flex flex-col rounded-xl bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="h-28 rounded-lg bg-zinc-100" />
            <div className="mt-3 flex-1 space-y-1">
              <h4 className="text-sm font-semibold leading-snug">
                {article.title}
              </h4>
              <p className="line-clamp-2 text-xs text-zinc-600">
                {article.content}
              </p>
            </div>
            <p className="mt-2 text-[11px] text-zinc-500">
              {new Date(article.created_at).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

