import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/data";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, intro, image, imageAlt, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
      <div className="page-hero-overlay" />
      <div className="page-shell page-hero-copy">
        <p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{intro ? <p>{intro}</p> : null}{children}
      </div>
    </section>
  );
}
