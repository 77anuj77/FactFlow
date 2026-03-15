import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fetchAllRSSNews } from "@/lib/rss";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  // Handle RSS-based articles whose ids start with "rss-"
  if (params.id.startsWith("rss-")) {
    const allRssNews = await fetchAllRSSNews("");
    const rssArticle = allRssNews.find((article) => article.id === params.id);

    if (rssArticle) {
      return NextResponse.json(rssArticle);
    }
  }

  const { data, error } = await supabase
    .from("articles")
    .select("*, categories(*)")
    .eq("id", params.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("articles")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { error } = await supabase.from("articles").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 204 });
}

