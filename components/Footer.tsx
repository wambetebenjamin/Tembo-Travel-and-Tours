import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ShieldCheck, Youtube } from "lucide-react";

const destinations = ["Maasai Mara", "Amboseli", "Zanzibar", "Diani Beach", "Bwindi", "Serengeti"];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-main">
        <div className="footer-brand">
          <Link href="/" className="wordmark footer-wordmark">
            <span className="wordmark-mark">T</span><span className="wordmark-copy"><strong>Tembo</strong><small>Travel &amp; Tours</small></span>
          </Link>
          <p>Journeys across East Africa, shaped with local knowledge and a personal touch from our Nairobi team.</p>
          <div className="social-links" aria-label="Social media">
            <a href="https://www.instagram.com/" aria-label="Instagram"><Instagram /></a>
            <a href="https://www.facebook.com/" aria-label="Facebook"><Facebook /></a>
            <a href="https://www.youtube.com/" aria-label="YouTube"><Youtube /></a>
            <a href="https://www.linkedin.com/" aria-label="LinkedIn"><Linkedin /></a>
          </div>
        </div>
        <div><h3>Destinations</h3><ul>{destinations.map((name) => <li key={name}><Link href={`/search?destination=${encodeURIComponent(name)}`}>{name}</Link></li>)}</ul></div>
        <div><h3>Plan your trip</h3><ul><li><Link href="/#featured-tours">Tour packages</Link></li><li><Link href="/#safaris">Safari styles</Link></li><li><Link href="/contact#plan-trip">Custom safari</Link></li><li><Link href="/blog">Travel blog</Link></li><li><Link href="/contact">Contact us</Link></li></ul></div>
        <div className="footer-contact"><h3>Talk to us</h3><ul><li><MapPin /><span>Nairobi, Kenya<br />Serving East Africa</span></li><li><Phone /><a href="tel:+254112272061">+254 112 272 061</a></li><li><Mail /><a href="mailto:hello@tembotravel.co.ke">hello@tembotravel.co.ke</a></li></ul><a className="tourism-badge" href="https://tourism.go.ke/" target="_blank" rel="noreferrer"><ShieldCheck /><span><small>Travel resources</small>Kenya Tourism Board</span></a></div>
      </div>
      <div className="footer-bottom"><div className="page-shell"><p>© {new Date().getFullYear()} Tembo Travel and Tours. All rights reserved.</p><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div></div>
    </footer>
  );
}
