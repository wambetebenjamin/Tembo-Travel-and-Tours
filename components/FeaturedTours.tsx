import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tours } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { TourCard } from "@/components/TourCard";

export function FeaturedTours() {
  return (
    <section className="featured-tours section-pad" id="featured-tours">
      <div className="page-shell">
        <div className="section-title-row">
          <SectionHeading eyebrow="Ready when you are" title="Journeys our travellers love" intro="Small enough to feel personal, flexible enough to make your own." />
          <Link className="text-link" href="/search">Browse all packages <ArrowRight /></Link>
        </div>
        <div className="tour-grid">
          {tours.filter((tour) => tour.featured).map((tour, index) => <TourCard key={tour.slug} tour={tour} index={index} />)}
        </div>
      </div>
    </section>
  );
}
