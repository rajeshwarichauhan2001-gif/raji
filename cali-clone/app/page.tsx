import HeroSection from "@/components/sections/HeroSection";
import FilmstripSlider from "@/components/sections/FilmstripSlider";
import HeyImRajiIntroSection from "@/components/sections/HeyImRajiIntroSection";
import PressMarqueeSection from "@/components/sections/PressMarqueeSection";
import TaglineBandSection from "@/components/sections/TaglineBandSection";
import BusinessCoachIntroSection from "@/components/sections/BusinessCoachIntroSection";
import ImpactFlip from "@/components/sections/ImpactFlip";
import CardsFan from "@/components/sections/CardsFan";
import ServicesParallax from "@/components/sections/ServicesParallax";
import RajiShopSection from "@/components/sections/RajiShopSection";
import WelcomeRecapSection from "@/components/sections/WelcomeRecapSection";
import PodcastSection from "@/components/sections/PodcastSection";
import ClientLoveSection from "@/components/sections/ClientLoveSection";
import PlanLikeABossMarquee from "@/components/sections/PlanLikeABossMarquee";
import BlogPreviewSection from "@/components/sections/BlogPreviewSection";
import FreebieSection from "@/components/sections/FreebieSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FilmstripSlider />
      <HeyImRajiIntroSection />
      <PressMarqueeSection />
      <TaglineBandSection />
      <BusinessCoachIntroSection />
      <ImpactFlip theme="cream" />
      <CardsFan />
      <ServicesParallax />
      <RajiShopSection />
      <WelcomeRecapSection />
      <PodcastSection />
      <ClientLoveSection />
      <PlanLikeABossMarquee />
      <BlogPreviewSection />
      <FreebieSection />
    </main>
  );
}
