import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { BLUR_DATA_URL, destinations } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function DestinationStrip() {
  return (
    <section className="destinations section-pad" id="destinations">
      <div className="page-shell">
        <div className="section-title-row">
          <SectionHeading eyebrow="Start with a place" title="Where will East Africa take you?" />
          <Link href="/search" className="text-link">See all journeys <ArrowUpRight /></Link>
        </div>
        <div className="destination-list" aria-label="Popular destinations">
          {destinations.map((destination, index) => (
            <Link
              href={`/destinations/${destination.slug}`}
              className="destination-item"
              key={destination.slug}
              data-reveal="up"
              style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span className="destination-image">
                <Image src={destination.image} alt={destination.imageAlt} fill sizes="(max-width: 767px) 150px, 190px" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                <span className="destination-arrow"><ArrowUpRight /></span>
              </span>
              <strong>{destination.name}</strong>
              <small><MapPin />{destination.country}</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
