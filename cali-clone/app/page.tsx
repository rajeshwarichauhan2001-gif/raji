import HeroSection from "@/components/sections/HeroSection";
import ClientLogoMarquee from "@/components/sections/ClientLogoMarquee";
import ApproachSection from "@/components/sections/ApproachSection";
import QuoteBand from "@/components/sections/QuoteBand";
import EdgeSection from "@/components/sections/EdgeSection";
import StatsSectionV2 from "@/components/sections/StatsSectionV2";
import ServicesParallax from "@/components/sections/ServicesParallax";
import ProcessSection from "@/components/sections/ProcessSection";
import ImpactFlip from "@/components/sections/ImpactFlip";
import BenefitsSection from "@/components/sections/BenefitsSection";
import CardsFan from "@/components/sections/CardsFan";
import ClientLoveSection from "@/components/sections/ClientLoveSection";
import FAQSection from "@/components/sections/FAQSection";
import FreebieSection from "@/components/sections/FreebieSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ClientLogoMarquee />
      <ApproachSection />
      <QuoteBand />
      <EdgeSection />
      <StatsSectionV2 />
      <ServicesParallax />
      <ProcessSection />
      <ImpactFlip theme="cream" />
      <BenefitsSection />
      <CardsFan />
      <ClientLoveSection />
      <FAQSection />
      <FreebieSection />
    </main>
  );
}
