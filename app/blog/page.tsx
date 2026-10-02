import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, Clock3 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BLUR_DATA_URL } from "@/lib/data";
import { getBlogArticles } from "@/lib/blog";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Travel blog", description: "East African safari tips, packing guides and destination stories from Tembo Travel and Tours." };

export default async function BlogPage() {
  const articles = await getBlogArticles();
  return <main id="main-content"><PageHero eyebrow="Tembo field notes" title="Stories for the road" intro="Practical advice and slower stories from across East Africa." image="/images/balloons-sunrise.jpg" imageAlt="Hot-air balloons above East African savannah" /><section className="blog-index section-pad"><div className="page-shell blog-index-list">{articles.map((article, index) => <article id={article.slug} key={article.slug} data-reveal="left" style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}><div className="blog-index-image"><Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 767px) 100vw, 44vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} /></div><div><p className="eyebrow">{article.category}</p><h2>{article.title}</h2><div className="blog-meta"><span><CalendarDays />{formatDate(article.date)}</span><span><Clock3 />{article.readTime}</span></div><p>{article.excerpt}</p><p>Our travel team has gathered the details that make the difference, from timing and transport to local etiquette. Ask us how this advice fits your own itinerary.</p></div></article>)}</div></section></main>;
}
