"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  ["Home", "/"],
  ["Destinations", "/#destinations"],
  ["Safaris", "/#safaris"],
  ["Beach Holidays", "/search?category=Beach"],
  ["Honeymoon", "/search?category=Honeymoon"],
  ["Group Tours", "/search?category=Group"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-shell">
        <Link href="/" className="wordmark" aria-label="Tembo Travel and Tours home" onClick={() => setOpen(false)}>
          <span className="wordmark-mark" aria-hidden="true">T</span>
          <span className="wordmark-copy"><strong>Tembo</strong><small>Travel &amp; Tours</small></span>
        </Link>

        <nav id="main-navigation" className={`main-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
          <div className="nav-links">
            {links.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
          </div>
          <Link href="/contact#plan-trip" className="button button-amber mobile-plan" onClick={() => setOpen(false)}>
            Plan My Trip
          </Link>
        </nav>

        <Link href="/contact#plan-trip" className="button button-amber desktop-plan">Plan My Trip</Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
