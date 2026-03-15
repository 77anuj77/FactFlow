"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Article } from "@/types/article";

export default function ArticlePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/articles/${encodeURIComponent(id)}`);

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Article not found");
          }
          throw new Error("Failed to load article");
        }

        const data = await res.json();
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="space-y-4">
            <div className="h-6 w-32 rounded-full bg-zinc-200" />
            <div className="h-10 w-full rounded-lg bg-zinc-200 sm:w-3/4" />
            <div className="h-4 w-48 rounded bg-zinc-200" />
          </div>
          <div className="aspect-[21/9] w-full rounded-2xl bg-zinc-200" />
          <div className="space-y-4">
            <div className="h-4 w-full rounded bg-zinc-200" />
            <div className="h-4 w-full rounded bg-zinc-200" />
            <div className="h-4 w-full rounded bg-zinc-200" />
            <div className="h-4 w-5/6 rounded bg-zinc-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
          📰
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900">
          {error || "Article missing"}
        </h1>
        <p className="mt-2 text-zinc-500">
          We could not find the article you are looking for. It might have been
          removed or the link is incorrect.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
        >
          Go back home
        </Link>
      </div>
    );
  }

  const formatContent = (text: string) => {
    return text
      .split("\n")
      .filter(Boolean)
      .map((paragraph, idx) => (
        <p key={idx} className="mb-6 leading-relaxed text-zinc-800">
          {paragraph}
        </p>
      ));
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
      >
        <span>←</span> Back to News
      </Link>

      <header className="mb-10 space-y-4">
        {article.category?.name && (
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            {article.category.name}
          </span>
        )}

        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl lg:leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
          <time dateTime={article.created_at}>
            {new Date(article.created_at).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>•</span>
          <span>
            {article.content
              ? Math.max(1, Math.ceil(article.content.length / 800))
              : 1}{" "}
            min read
          </span>
        </div>
      </header>

      {article.image_url && (
        <figure className="mb-12 overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full object-cover sm:h-[400px]"
          />
        </figure>
      )}

      <div className="prose prose-zinc prose-lg max-w-none">
        {formatContent(article.content)}
      </div>
    </article>
  );
}

