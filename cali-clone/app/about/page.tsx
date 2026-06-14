import PageHeader from "@/components/sections/PageHeader";
import ApproachSection from "@/components/sections/ApproachSection";
import AboutQuoteSplit from "@/components/sections/AboutQuoteSplit";
import StatsSectionV2 from "@/components/sections/StatsSectionV2";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FAQSection from "@/components/sections/FAQSection";
import { DEFAULT_ABOUT } from "@/lib/about";
import { getDoc } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Page() {
  const about = await getDoc("about", DEFAULT_ABOUT);
  return (
    <main>
      <PageHeader
        eyebrow={about.header.eyebrow}
        title={about.header.title}
        subtitle={about.header.subtitle}
      />
      <ApproachSection />
      <AboutQuoteSplit data={about.quote} />
      <StatsSectionV2 />
      <WhyUsSection data={about.whyUs} />
      <FAQSection />
    </main>
  );
}
