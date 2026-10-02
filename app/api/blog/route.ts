import { NextResponse } from "next/server";
import { getBlogArticles } from "@/lib/blog";

export const revalidate = 600;

export async function GET() {
  const articles = await getBlogArticles();
  return NextResponse.json({ articles, count: articles.length }, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600" } });
}
