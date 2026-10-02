import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock3, MapPin, MessageCircle, ShieldCheck, Star, X } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { ItineraryAccordion } from "@/components/ItineraryAccordion";
import { PageHero } from "@/components/PageHero";
import { TourCard } from "@/components/TourCard";
import { getTour, siteUrl, tours } from "@/lib/data";
import { formatKes } from "@/lib/format";

export const revalidate = 600;

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tour = getTour(params.slug);
  if (!tour) return { title: "Tour not found" };
  return {
    title: tour.name,
    description: tour.summary,
    openGraph: {
      title: tour.name,
      description: tour.summary,
      type: "website",
      url: `${siteUrl}/tours/${tour.slug}`,
      images: [{ url: tour.image, alt: tour.imageAlt }],
    },
  };
}

export default function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = getTour(params.slug);
  if (!tour) notFound();

  const otherTours = tours.filter((item) => item.slug !== tour.slug).slice(0, 3);
  const enquireMessage = encodeURIComponent(`Hello! I would like to enquire about the ${tour.name} with Tembo Travel.`);
  const tourPackageSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.summary,
    image: `${siteUrl}${tour.image}`,
    touristType: tour.category,
    itinerary: tour.itinerary.map((day) => ({ "@type": "ItemList", name: `Day ${day.day}: ${day.title}`, description: day.description })),
    offers: { "@type": "Offer", priceCurrency: "KES", price: tour.priceFrom, url: `${siteUrl}/tours/${tour.slug}`, availability: "https://schema.org/InStock" },
    provider: { "@type": "TravelAgency", name: "Tembo Travel and Tours", telephone: "+254112272061", address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" } },
  };
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.name,
    description: tour.summary,
    image: `${siteUrl}${tour.image}`,
    category: "TourPackage",
    brand: { "@type": "Brand", name: "Tembo Travel and Tours" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: tour.rating, reviewCount: tour.reviews },
    offers: { "@type": "Offer", priceCurrency: "KES", price: tour.priceFrom, url: `${siteUrl}/tours/${tour.slug}` },
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tourPackageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <PageHero eyebrow={`${tour.destination}, ${tour.country}`} title={tour.name} intro={tour.summary} image={tour.image} imageAlt={tour.imageAlt}>
        <div className="detail-hero-meta"><span><Clock3 />{tour.durationDays} days / {tour.durationNights} nights</span><span><MapPin />{tour.destination}</span><span><Star fill="currentColor" />{tour.rating} ({tour.reviews} reviews)</span></div>
      </PageHero>

      <section className="tour-detail section-pad">
        <div className="page-shell detail-layout">
          <div className="detail-main">
            <div className="detail-intro" data-reveal="up"><p className="eyebrow">The journey</p><h2>Wild days. Comfortable nights. Every detail considered.</h2><p>{tour.summary} This itinerary is a starting point—we can adjust the pace, accommodation and departure to fit you.</p></div>
            <section className="detail-section" data-reveal="up"><div className="detail-section-heading"><span>01</span><div><p className="eyebrow">Day by day</p><h2>Your itinerary</h2></div></div><ItineraryAccordion itinerary={tour.itinerary} /></section>
            <section className="detail-section" data-reveal="up"><div className="detail-section-heading"><span>02</span><div><p className="eyebrow">Good to know</p><h2>What your package covers</h2></div></div><div className="inclusion-grid"><div><h3>Included</h3><ul>{tour.inclusions.map((item) => <li key={item}><Check />{item}</li>)}</ul></div><div className="exclusions"><h3>Not included</h3><ul>{tour.exclusions.map((item) => <li key={item}><X />{item}</li>)}</ul></div></div></section>
            <section className="detail-section" data-reveal="up"><div className="detail-section-heading"><span>03</span><div><p className="eyebrow">Transparent pricing</p><h2>Choose what fits</h2></div></div><div className="price-table" role="table" aria-label={`${tour.name} prices`}>
              <div className="price-row price-head" role="row"><span>Travel style</span><span>Party size</span><span>Price</span></div>
              {tour.prices.map((price) => <div className="price-row" role="row" key={price.label}><span><strong>{price.label}</strong>{price.note ? <small>{price.note}</small> : null}</span><span>{price.people}</span><span><strong>{formatKes(price.price)}</strong></span></div>)}
            </div><p className="price-note"><ShieldCheck />Final pricing depends on travel dates and lodge availability. We confirm every cost before you commit.</p></section>
          </div>
          <aside className="booking-sidebar"><BookingForm tourSlug={tour.slug} tourName={tour.name} /><a className="whatsapp-link sidebar-enquire" href={`https://wa.me/254112272061?text=${enquireMessage}`} target="_blank" rel="noreferrer"><MessageCircle />Enquire on WhatsApp instead</a></aside>
        </div>
      </section>

      <section className="related-tours section-pad"><div className="page-shell"><div className="section-title-row"><div className="section-heading"><p className="eyebrow">Keep exploring</p><h2>You may also like</h2></div><Link href="/search" className="text-link">View all packages</Link></div><div className="tour-grid">{otherTours.map((item, index) => <TourCard key={item.slug} tour={item} index={index} />)}</div></div></section>
    </main>
  );
}
