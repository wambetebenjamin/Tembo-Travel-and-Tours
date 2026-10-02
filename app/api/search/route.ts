import { NextRequest, NextResponse } from "next/server";
import { tours } from "@/lib/data";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const destination = params.get("destination")?.toLowerCase().trim();
  const category = params.get("category")?.toLowerCase().trim();
  const query = params.get("query")?.toLowerCase().trim();
  const maxBudget = Number(params.get("budget") || 0);
  const maxDuration = Number(params.get("duration") || 0);

  const results = tours.filter((tour) => {
    const searchable = `${tour.name} ${tour.destination} ${tour.country} ${tour.category} ${tour.summary}`.toLowerCase();
    return (
      (!destination || searchable.includes(destination)) &&
      (!category || searchable.includes(category)) &&
      (!query || searchable.includes(query)) &&
      (!maxBudget || tour.priceFrom <= maxBudget) &&
      (!maxDuration || tour.durationDays <= maxDuration)
    );
  });

  return NextResponse.json({ tours: results, count: results.length, filters: { destination, category, query, maxBudget, maxDuration } });
}
