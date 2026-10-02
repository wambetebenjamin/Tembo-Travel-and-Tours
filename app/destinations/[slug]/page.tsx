import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { TourCard } from "@/components/TourCard";
import { destinations, getDestination, siteUrl, tours } from "@/lib/data";

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const destination = getDestination(params.slug);
  if (!destination) return { title: "Destination not found" };
  return {
    title: `${destination.name}, ${destination.country}`,
    description: destination.description,
    openGraph: {
      title: `Travel to ${destination.name} with Tembo`,
      description: destination.description,
      url: `${siteUrl}/destinations/${destination.slug}`,
      images: [{ url: destination.image, alt: destination.imageAlt }],
    },
  };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = getDestination(params.slug);
  if (!destination) notFound();
  const match = destination.name === "Gorilla Trekking" ? "Bwindi" : destination.name;
  const matching = tours.filter((tour) => tour.destination.includes(match) || tour.country === destination.country).slice(0, 3);

  return (
    <main id="main-content">
      <PageHero eyebrow={destination.country} title={destination.name} intro={destination.description} image={destination.image} imageAlt={destination.imageAlt} />
      <section className="destination-copy section-pad"><div className="narrow-shell" data-reveal="up"><p className="eyebrow">Know the place</p><h2>Go beyond the postcard.</h2><p>{destination.description} Tembo&apos;s Nairobi team pairs trusted guides with a pace that leaves room for real moments—not only a checklist of sights.</p><p>Tell us your dates, comfort level and who is travelling. We will recommend the right season and shape a route that connects naturally with the rest of East Africa.</p></div></section>
      <section className="related-tours section-pad"><div className="page-shell"><div className="section-heading"><p className="eyebrow">Explore {destination.name}</p><h2>Trips connected to this place</h2></div><div className="tour-grid">{matching.map((tour, index) => <TourCard tour={tour} index={index} key={tour.slug} />)}</div></div></section>
    </main>
  );
}
