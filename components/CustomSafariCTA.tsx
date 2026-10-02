import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BLUR_DATA_URL, whatsappUrl } from "@/lib/data";

export function CustomSafariCTA() {
  return (
    <section className="custom-cta">
      <div className="custom-cta-image"><Image src="/images/safari-sunset.jpg" alt="Safari vehicle beneath an East African sunset" fill sizes="50vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} /></div>
      <div className="page-shell custom-cta-inner">
        <div data-reveal="up">
          <p className="eyebrow">Built around you</p>
          <h2>Can&apos;t find what you&apos;re looking for? We build custom safaris.</h2>
          <p>Tell us who is travelling, what you love and how you like to move. We will turn it into one clear, personal plan.</p>
          <div className="cta-actions">
            <a className="button button-white" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle />Chat with Us on WhatsApp</a>
            <Link href="/contact#plan-trip" className="text-link text-link-light">Build my itinerary <ArrowRight /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
