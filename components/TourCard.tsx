"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, Heart, MessageCircle } from "lucide-react";
import { PointerEvent, useState } from "react";
import { BLUR_DATA_URL } from "@/lib/data";
import { formatKes } from "@/lib/format";
import type { TourPackage } from "@/lib/types";

export function TourCard({ tour, index = 0 }: { tour: TourPackage; index?: number }) {
  const [saved, setSaved] = useState(false);

  function tilt(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${y * -5}deg`);
    card.style.setProperty("--tilt-y", `${x * 7}deg`);
  }

  function reset(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  const message = encodeURIComponent(`Hello! I would like to enquire about the ${tour.name} with Tembo Travel.`);

  return (
    <article
      className="tour-card"
      data-reveal="up"
      style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
      onPointerMove={tilt}
      onPointerLeave={reset}
    >
      <div className="tour-image">
        <Image src={tour.image} alt={tour.imageAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
        <span className="duration-badge"><Clock3 />{tour.durationDays} Days {tour.durationNights} Nights</span>
        <button className={`wishlist${saved ? " is-saved" : ""}`} type="button" aria-label={saved ? `Remove ${tour.name} from wishlist` : `Save ${tour.name} to wishlist`} aria-pressed={saved} onClick={() => setSaved((value) => !value)}>
          <Heart fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="tour-content">
        <p className="tour-meta">{tour.destination}, {tour.country} <span>{tour.category}</span></p>
        <h3><Link href={`/tours/${tour.slug}`}>{tour.name}</Link></h3>
        <ul className="tour-highlights">
          {tour.highlights.map((highlight) => <li key={highlight}><Check />{highlight}</li>)}
        </ul>
        <div className="tour-price"><small>From</small><strong>{formatKes(tour.priceFrom)}</strong><span>per person</span></div>
        <div className="tour-actions">
          <Link href={`/tours/${tour.slug}`} className="button button-ocean">View Package</Link>
          <a href={`https://wa.me/254112272061?text=${message}`} target="_blank" rel="noreferrer" className="whatsapp-link"><MessageCircle />Enquire on WhatsApp</a>
        </div>
      </div>
    </article>
  );
}
