import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactCta } from "@/components/home/ContactCta";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyKareema } from "@/components/home/WhyKareema";

export function HomePage() {
  return (
    <div data-ocid="home.page">
      <HeroSection />
      <FeaturedProducts />
      <AboutTeaser />
      <WhyKareema />
      <ContactCta />
    </div>
  );
}
