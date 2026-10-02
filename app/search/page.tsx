import { Search } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/lib/data";

interface SearchPageProps {
  searchParams: { destination?: string; category?: string; query?: string; budget?: string; duration?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const destination = searchParams.destination?.toLowerCase().trim();
  const category = searchParams.category?.toLowerCase().trim();
  const query = searchParams.query?.toLowerCase().trim();
  const budget = Number(searchParams.budget || 0);
  const duration = Number(searchParams.duration || 0);
  const results = tours.filter((tour) => {
    const text = `${tour.name} ${tour.destination} ${tour.country} ${tour.category} ${tour.summary}`.toLowerCase();
    return (!destination || text.includes(destination)) && (!category || text.includes(category)) && (!query || text.includes(query)) && (!budget || tour.priceFrom <= budget) && (!duration || tour.durationDays <= duration);
  });

  return (
    <main id="main-content">
      <PageHero eyebrow="Find your way" title="Tour packages" intro="Filter our starting itineraries, then ask us to make one yours." image="/images/safari-road.jpg" imageAlt="Safari vehicle travelling along an East African road" />
      <section className="search-results section-pad"><div className="page-shell">
        <form className="filter-bar" action="/search"><label><span>Destination</span><select name="destination" defaultValue={searchParams.destination || ""}><option value="">All destinations</option><option>Maasai Mara</option><option>Amboseli</option><option>Zanzibar</option><option>Diani Beach</option><option>Bwindi</option><option>Serengeti</option></select></label><label><span>Travel style</span><select name="category" defaultValue={searchParams.category || ""}><option value="">All styles</option><option>Budget</option><option>Luxury</option><option>Family</option><option>Beach</option><option>Honeymoon</option><option>Group</option><option>Primate</option></select></label><label><span>Budget up to</span><select name="budget" defaultValue={searchParams.budget || ""}><option value="">Any budget</option><option value="50000">KES 50,000</option><option value="100000">KES 100,000</option><option value="200000">KES 200,000</option></select></label><button className="button button-amber" type="submit"><Search />Search</button></form>
        <div className="results-heading"><p className="eyebrow">{results.length} {results.length === 1 ? "journey" : "journeys"}</p><h2>{destination ? `Trips for ${searchParams.destination}` : "Explore every package"}</h2></div>
        {results.length ? <div className="tour-grid">{results.map((tour, index) => <TourCard tour={tour} index={index} key={tour.slug} />)}</div> : <div className="empty-state"><Search /><h2>No exact match—yet.</h2><p>Our custom safari team can build the trip you have in mind.</p><a className="button button-ocean" href="/contact#plan-trip">Plan a custom trip</a></div>}
      </div></section>
    </main>
  );
}
