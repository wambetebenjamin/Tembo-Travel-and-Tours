import { BlogSection } from "@/components/BlogSection";
import { CustomSafariCTA } from "@/components/CustomSafariCTA";
import { DestinationStrip } from "@/components/DestinationStrip";
import { FeaturedTours } from "@/components/FeaturedTours";
import { Hero } from "@/components/Hero";
import { InstagramGallery } from "@/components/InstagramGallery";
import { Newsletter } from "@/components/Newsletter";
import { SafariCategories } from "@/components/SafariCategories";
import { Testimonials } from "@/components/Testimonials";
import { WhyUs } from "@/components/WhyUs";
import { getBlogArticles } from "@/lib/blog";

export default async function HomePage() {
  const articles = await getBlogArticles();

  return (
    <main id="main-content">
      <Hero />
      <DestinationStrip />
      <FeaturedTours />
      <SafariCategories />
      <WhyUs />
      <Testimonials />
      <BlogSection articles={articles} />
      <CustomSafariCTA />
      <InstagramGallery />
      <Newsletter />
    </main>
  );
}
