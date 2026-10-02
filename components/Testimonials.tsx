import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { BLUR_DATA_URL, testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function Testimonials() {
  return (
    <section className="testimonials section-pad">
      <div className="page-shell">
        <SectionHeading eyebrow="Traveller stories" title="The best journeys stay with you." intro="Real reflections from travellers who explored East Africa with us." />
        <div className="testimonial-masonry">
          {testimonials.map((testimonial, index) => (
            <article className={`testimonial-card testimonial-${index + 1}`} key={testimonial.name} data-reveal="up" style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}>
              <Quote className="quote-icon" aria-hidden="true" />
              <div className="rating" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }, (_, star) => <Star key={star} fill="currentColor" />)}
              </div>
              <blockquote>“{testimonial.text}”</blockquote>
              <div className="testimonial-person">
                <span className="person-image"><Image src={testimonial.image} alt={`Portrait of ${testimonial.name}`} fill sizes="56px" placeholder="blur" blurDataURL={BLUR_DATA_URL} /></span>
                <span><strong>{testimonial.name}</strong><small>{testimonial.country} · {testimonial.tour}</small></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
