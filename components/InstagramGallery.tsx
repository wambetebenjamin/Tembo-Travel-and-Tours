import Image from "next/image";
import { Instagram } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/data";

const gallery = [
  ["/images/mara-lions.jpg", "Lions resting in the Maasai Mara"],
  ["/images/zanzibar-traveller.jpg", "Traveller on Zanzibar beach"],
  ["/images/elephant-calves.jpg", "Young elephants on the savannah"],
  ["/images/balloons-sunrise.jpg", "Hot-air balloons at sunrise"],
  ["/images/uganda-gorilla.jpg", "Mountain gorilla in forest"],
  ["/images/kenya-coast.jpg", "East African coast from above"],
];

export function InstagramGallery() {
  return (
    <section className="instagram-section" aria-label="Travel inspiration gallery">
      <div className="instagram-heading"><Instagram /><span>@tembotravel</span><small>Follow the journey</small></div>
      <div className="instagram-grid">
        {gallery.map(([src, alt], index) => (
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="instagram-tile" key={src} aria-label={`View ${alt} on Instagram`} data-reveal="up" style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}>
            <Image src={src} alt={alt} fill sizes="(max-width: 767px) 33vw, 17vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
            <span><Instagram /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
