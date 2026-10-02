import type { MetadataRoute } from "next";
import { getBlogArticles } from "@/lib/blog";
import { destinations, siteUrl, tours } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getBlogArticles();
  const staticRoutes = ["", "/search", "/blog", "/contact", "/privacy", "/terms"].map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 }));
  const tourRoutes = tours.map((tour) => ({ url: `${siteUrl}/tours/${tour.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 }));
  const destinationRoutes = destinations.map((destination) => ({ url: `${siteUrl}/destinations/${destination.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 }));
  const blogRoutes = articles.map((article) => ({ url: `${siteUrl}/blog#${article.slug}`, lastModified: new Date(article.date), changeFrequency: "monthly" as const, priority: 0.6 }));
  return [...staticRoutes, ...tourRoutes, ...destinationRoutes, ...blogRoutes];
}
