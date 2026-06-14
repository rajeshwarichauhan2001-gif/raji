import { DEFAULT_ABOUT, type AboutData } from "@/lib/about";

export default function AboutQuoteSplit({
  data = DEFAULT_ABOUT.quote,
}: {
  data?: AboutData["quote"];
}) {
  return (
    <section className="about-quote-split">
      <div className="about-quote-split-inner">
        {data.columns.map((col, i) => (
          <div className="about-quote-col" key={i}>
            <h2 className="about-quote-heading">{col.heading}</h2>
            <p className="about-quote-body">{col.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
