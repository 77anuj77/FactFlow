 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Article } from "@/types/article";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/articles");
      if (!res.ok) {
        throw new Error("Failed to load articles");
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
    fetchArticles();
  }, []);

  const featured = articles[0];
  const latest = featured ? articles.slice(1) : articles;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Latest headlines
        </h1>
        <button
          type="button"
          onClick={fetchArticles}
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
          No articles yet. Once you create some, they will appear here.
        </p>
      )}

      {featured && (
        <Link
          href={`/article/${featured.id}`}
          className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:grid-cols-3"
        >
          <div className="md:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
              Featured
            </p>
            <h2 className="mt-1 text-xl font-semibold leading-tight">
              {featured.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-sm text-zinc-600">
              {featured.content}
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              {featured.category?.name} •{" "}
              {new Date(featured.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="hidden h-32 rounded-xl bg-zinc-100 md:block" />
        </Link>
      )}

      {latest.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
            Latest
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {latest.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.id}`}
                className="flex flex-col rounded-xl bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="h-28 rounded-lg bg-zinc-100" />
                <div className="mt-3 flex-1 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    {article.category?.name}
                  </p>
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
        </section>
      )}
    </div>
  );
}
