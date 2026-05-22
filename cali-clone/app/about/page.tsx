import PageHeader from "@/components/sections/PageHeader";
import ApproachSection from "@/components/sections/ApproachSection";
import AboutQuoteSplit from "@/components/sections/AboutQuoteSplit";
import StatsSectionV2 from "@/components/sections/StatsSectionV2";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FAQSection from "@/components/sections/FAQSection";

export default function Page() {
  return (
    <main>
      <PageHeader
        eyebrow="Our story"
        title="About Us"
        subtitle="Strategy, storytelling and steady community building for brands that want growth with intention."
      />
      <ApproachSection />
      <AboutQuoteSplit />
      <StatsSectionV2 />
      <WhyUsSection />
      <FAQSection />
    </main>
  );
}
