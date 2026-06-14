import ClientLogoMarquee from "./ClientLogoMarquee";
import { DEFAULT_ABOUT, type AboutData } from "@/lib/about";

export default function WhyUsSection({
  data = DEFAULT_ABOUT.whyUs,
}: {
  data?: AboutData["whyUs"];
}) {
  return (
    <section className="why-us">
      <div className="why-us-inner">
        <p className="eyebrow why-us-eyebrow">{data.eyebrow}</p>
        <h2 className="why-us-title">{data.title}</h2>
        <p className="why-us-body">{data.body}</p>
      </div>
      <ClientLogoMarquee />
    </section>
  );
}
