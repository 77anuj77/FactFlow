import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fetchAllRSSNews } from "@/lib/rss";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);

export async function GET(req: NextRequest) {
  const categorySlug = req.nextUrl.searchParams.get("category");
  const searchQuery = req.nextUrl.searchParams.get("search");

  let query = supabase
    .from("articles")
    .select("*, categories(*)")
    .order("created_at", { ascending: false });

  if (categorySlug) {
    query = query.eq("categories.slug", categorySlug);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  // Fetch external RSS news and merge with database articles
  let rssNews = await fetchAllRSSNews(categorySlug || "");

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    rssNews = rssNews.filter((article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery)
    );
  }

  if (error && !rssNews.length) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Merge the arrays (DB articles first, then RSS feeds, then anything else)
  const allData = [
    ...(data || []),
    ...rssNews
  ];

  return NextResponse.json(allData);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("articles")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

