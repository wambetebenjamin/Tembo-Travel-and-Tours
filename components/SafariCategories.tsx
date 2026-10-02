import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLUR_DATA_URL, safariCategories } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function SafariCategories() {
  return (
    <section className="safari-categories section-pad" id="safaris">
      <div className="page-shell">
        <SectionHeading eyebrow="Travel your way" title="One region. Many ways to experience it." intro="Choose your pace and comfort—we will shape the details around you." />
        <div className="editorial-grid">
          {safariCategories.map((category, index) => (
            <Link href={category.href} className={`category-tile category-${category.size}`} key={category.name} data-reveal="up" style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}>
              <Image src={category.image} alt={`${category.name} in East Africa`} fill sizes="(max-width: 767px) 100vw, 50vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
              <span className="tile-overlay" />
              <span className="tile-copy"><small>Made for you</small><strong>{category.name}</strong><span>Explore <ArrowUpRight /></span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
