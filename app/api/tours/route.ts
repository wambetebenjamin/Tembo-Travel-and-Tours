import { NextResponse } from "next/server";
import { tours } from "@/lib/data";

export const revalidate = 600;

export async function GET() {
  return NextResponse.json({ tours, count: tours.length }, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600" } });
}
