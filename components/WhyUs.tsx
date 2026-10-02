"use client";

import { BadgeCheck, Clock3, PackageCheck, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";

const features = [
  { icon: BadgeCheck, title: "Licensed Guides", text: "Skilled local professionals who know the land, wildlife and communities." },
  { icon: PackageCheck, title: "All-Inclusive Packages", text: "Clear inclusions and thoughtful logistics, with no last-minute surprises." },
  { icon: Clock3, title: "24-hr Support", text: "A Nairobi-based team beside you before, during and after your journey." },
  { icon: ShieldCheck, title: "Best Price Guarantee", text: "Fair local pricing and options shaped honestly around your budget." },
];

const stats = [
  { value: 2400, suffix: "+", label: "Happy Travellers" },
  { value: 120, suffix: "", label: "Tour Packages" },
  { value: 15, suffix: "", label: "Destinations" },
  { value: 12, suffix: "", label: "Years in Business" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => {
      if (reduced) { setCount(value); return; }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1200, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { run(); observer.disconnect(); }
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count.toLocaleString("en-KE")}{suffix}</span>;
}

export function WhyUs() {
  return (
    <section className="why-us section-pad">
      <div className="page-shell">
        <SectionHeading eyebrow="Why travel with Tembo" title="Grounded here. Focused on you." intro="Local knowledge makes a better journey—and your experience supports the people who make it possible." align="center" />
        <div className="feature-strip">
          {features.map(({ icon: Icon, title, text }, index) => (
            <article key={title} data-reveal="up" style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}>
              <span className="feature-icon"><Icon /></span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
        <div className="stats-strip" aria-label="Tembo Travel and Tours statistics">
          {stats.map((stat) => <div key={stat.label}><strong><CountUp value={stat.value} suffix={stat.suffix} /></strong><span>{stat.label}</span></div>)}
        </div>
      </div>
    </section>
  );
}
