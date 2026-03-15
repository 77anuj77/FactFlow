"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Article } from "@/types/article";

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query.trim()) {
                setArticles([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Pass the query as 'search' param to our updated API
                const res = await fetch(`/api/articles?search=${encodeURIComponent(query)}`);
                if (!res.ok) {
                    throw new Error("Failed to load search results");
                }
                const data = await res.json();
                setArticles(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
                    Search Results
                </h1>
                <p className="text-zinc-400">
                    {query ? (
                        <>Showing results for <span className="text-emerald-400 font-semibold">"{query}"</span></>
                    ) : (
                        "Enter a search term above to find articles."
                    )}
                </p>
            </div>

            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse flex flex-col gap-3">
                            <div className="aspect-video w-full rounded-xl bg-zinc-800" />
                            <div className="flex gap-3 pr-4">
                                <div className="mt-1 h-9 w-9 rounded-full bg-zinc-800 shrink-0" />
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="h-4 bg-zinc-800 rounded w-full" />
                                    <div className="h-4 bg-zinc-800 rounded w-4/5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="rounded-lg bg-red-900/30 border border-red-500/50 p-4 mb-6">
                    <p className="text-sm font-medium text-red-400" role="alert">
                        {error}
                    </p>
                </div>
            )}

            {!loading && !error && query && articles.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-800/50 py-24 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-white">No articles found</h3>
                    <p className="mt-2 text-zinc-400 max-w-sm">
                        We couldn't find anything matching "{query}". Try adjusting your search terms or exploring our categories.
                    </p>
                </div>
            )}

            {!loading && articles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                    {articles.map((article: any) => (
                        <Link
                            key={article.id}
                            href={`/article/${article.id}`}
                            className="group flex flex-col gap-3"
                        >
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-800">
                                <img
                                    src={article.image_url || "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80"}
                                    alt={article.title}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex gap-3 pr-4">
                                <div className="mt-1 flex-shrink-0">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-emerald-400 uppercase border border-zinc-700">
                                        {article.category?.name?.charAt(0) || "N"}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <h3 className="line-clamp-2 text-base font-semibold leading-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
                                        {article.title}
                                    </h3>

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

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="mx-auto w-full px-4 py-8">
                <div className="h-8 w-48 bg-zinc-800 animate-pulse rounded mb-8" />
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}
