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
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between gap-2">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Latest News
        </h1>
        <button
          type="button"
          onClick={fetchArticles}
          disabled={loading}
          className="inline-flex items-center gap-1 rounded-full bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          ⟳ {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-900/30 border border-red-500/50 p-4 mb-6">
          <p className="text-sm font-medium text-red-400" role="alert">
            {error}
          </p>
        </div>
      )}

      {!loading && articles.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-800/50 py-24 text-center">
          <p className="text-zinc-400 font-medium">
            No Indian Express articles loaded.
          </p>
        </div>
      )}

      {articles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {articles.map((article: any) => (
            <Link
              key={article.id}
              href={article.id.startsWith('mock') || article.id.startsWith('indian-express') ? '#' : `/article/${article.id}`}
              className="group flex flex-col gap-3"
            >
              {/* YouTube style thumbnail: 16:9, rounded, full width */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-800">
                <img
                  src={article.image_url || "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80"}
                  alt={article.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Video metadata area */}
              <div className="flex gap-3 pr-4">
                {/* Channel/Category avatar placeholder */}
                <div className="mt-1 flex-shrink-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-emerald-400 uppercase border border-zinc-700">
                    {article.category?.name?.charAt(0) || "N"}
                  </div>
                </div>

                <div className="flex flex-col">
                  {/* Title (max 2 lines) */}
                  <h3 className="line-clamp-2 text-base font-semibold leading-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    {article.title}
                  </h3>

                  {/* Metadata under title (Category name, date) */}
                  <div className="mt-1 flex flex-col text-sm text-zinc-400">
                    <span>{article.category?.name || "Uncategorized"}</span>
                    <span className="flex items-center gap-1 text-[13px] text-zinc-500">
                      {new Date(article.created_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                      {" • "}
                      {article.content ? Math.max(1, Math.ceil(article.content.length / 800)) : 1} min read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
