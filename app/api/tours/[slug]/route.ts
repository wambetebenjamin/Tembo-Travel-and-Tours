import { NextResponse } from "next/server";
import { getTour } from "@/lib/data";

export const revalidate = 600;

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const tour = getTour(params.slug);
  if (!tour) return NextResponse.json({ error: "Tour package not found." }, { status: 404 });
  return NextResponse.json({ tour }, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600" } });
}
