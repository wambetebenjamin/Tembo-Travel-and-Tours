"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { BLUR_DATA_URL } from "@/lib/data";
import { Globe } from "@/components/Globe";
import { SearchWidget } from "@/components/SearchWidget";

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let ticking = false;
    const update = () => {
      if (imageRef.current && window.scrollY < window.innerHeight * 1.2) {
        imageRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0) scale(1.08)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-image" ref={imageRef}>
        <Image src="/images/hero-safari.jpg" alt="Travellers watching elephants from a safari vehicle" fill priority sizes="100vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
      </div>
      <div className="hero-shade" />
      <div className="hero-inner page-shell">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Tailor-made in Nairobi <span /> East Africa</p>
          <h1 id="hero-title" className="hero-title" aria-label="East Africa is Calling.">
            {["East", "Africa", "is", "Calling."].map((word, index) => (
              <span key={word} style={{ "--word-index": index } as React.CSSProperties}>{word}</span>
            ))}
          </h1>
          <p className="hero-subtitle">Thoughtful safaris, coast escapes and once-in-a-lifetime encounters—designed by people who call this region home.</p>
          <SearchWidget />
          <div className="hero-proof"><strong>12 years</strong><span>Local expertise</span><strong>2,400+</strong><span>Happy travellers</span></div>
        </div>
        <Globe />
      </div>
      <a href="#destinations" className="scroll-cue" aria-label="Explore destinations"><span>Discover</span><ArrowDown /></a>
    </section>
  );
}
