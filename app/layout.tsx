import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "./globals.css";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteUrl } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Tembo Travel & Tours | East Africa is Calling", template: "%s | Tembo Travel & Tours" },
  description:
    "Locally designed East African safaris, beach holidays and custom journeys from Tembo Travel and Tours in Nairobi, Kenya.",
  keywords: ["Kenya safari", "East Africa tours", "Maasai Mara", "Zanzibar", "Amboseli", "Nairobi travel agency"],
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "Tembo Travel and Tours",
    title: "Tembo Travel & Tours",
    description: "Thoughtful journeys across Kenya and East Africa, designed in Nairobi.",
    images: [{ url: "/images/hero-safari.jpg", width: 1200, height: 800, alt: "Safari travellers watching elephants" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        <ScrollReveal />
      </body>
    </html>
  );
}
