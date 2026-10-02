import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import type { BlogArticle } from "@/lib/types";
import { BLUR_DATA_URL } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { SectionHeading } from "@/components/SectionHeading";

export function BlogSection({ articles }: { articles: BlogArticle[] }) {
  return (
    <section className="travel-blog section-pad" id="blog">
      <div className="page-shell">
        <div className="section-title-row">
          <SectionHeading eyebrow="Field notes" title="Travel better, before you go." />
          <Link href="/blog" className="text-link">Read all stories <ArrowRight /></Link>
        </div>
        <div className="blog-grid">
          {articles.slice(0, 3).map((article, index) => (
            <article className="blog-card" key={article.slug} data-reveal="left" style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}>
              <Link href={`/blog#${article.slug}`} className="blog-image">
                <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 767px) 100vw, 33vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
                <span>{article.category}</span>
              </Link>
              <div className="blog-content">
                <div className="blog-meta"><span><CalendarDays />{formatDate(article.date)}</span><span><Clock3 />{article.readTime}</span></div>
                <h3><Link href={`/blog#${article.slug}`}>{article.title}</Link></h3>
                <p>{article.excerpt}</p>
                <Link href={`/blog#${article.slug}`} className="text-link">Read story <ArrowRight /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
