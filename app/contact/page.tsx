import type { Metadata } from "next";
import { Building2, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { PageHero } from "@/components/PageHero";
import { whatsappUrl } from "@/lib/data";

export const metadata: Metadata = { title: "Contact and trip planning", description: "Plan an East African safari or corporate journey with Tembo Travel and Tours in Nairobi." };

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Start a conversation" title="Your East Africa story starts here." intro="A real Nairobi-based travel planner will reply—not a booking bot." image="/images/safari-guide.jpg" imageAlt="East African guide on safari" />
      <section className="contact-section section-pad" id="plan-trip"><div className="page-shell contact-layout">
        <div className="contact-copy" data-reveal="up"><p className="eyebrow">Talk to our team</p><h2>Tell us what the perfect trip feels like.</h2><p>Share your dates, travellers and wish list. We will come back with a clear route, honest pricing and options that match your pace.</p><div className="contact-cards"><a href="tel:+254112272061"><Phone /><span><small>Call us</small>+254 112 272 061</span></a><a href="mailto:hello@tembotravel.co.ke"><Mail /><span><small>Email us</small>hello@tembotravel.co.ke</span></a><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /><span><small>WhatsApp</small>Message the trip team</span></a><div><MapPin /><span><small>Based in</small>Nairobi, Kenya</span></div></div><div className="corporate-note"><Building2 /><div><h3>Planning corporate travel?</h3><p>Ask about group logistics, retreats, conference travel and account support across East Africa.</p></div></div><p className="office-hours"><Clock3 />Monday–Saturday, 8:00–18:00 EAT · Trip support available 24 hours</p></div>
        <div className="contact-form-wrap" data-reveal="up"><BookingForm tourSlug="custom-east-africa-journey" tourName="Custom East Africa Journey" /></div>
      </div></section>
    </main>
  );
}
