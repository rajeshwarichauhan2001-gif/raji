import PageHeader from "@/components/sections/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import ContactInfo from "@/components/sections/ContactInfo";
import RotatingPhraseBand from "@/components/sections/RotatingPhraseBand";

function ContactBody() {
  return (
    <section className="contact-grid">
      <div className="contact-grid-inner">
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Us"
        subtitle={
          <>
            <p>
              Start the conversation to build a strong relationship and a
              successful business.
            </p>
            <p className="page-header-italic">
              Effortless Communication, Worldwide Influence.
            </p>
            <p>
              Seamless and effective communication that transcends borders,
              empowering global connections and impact.
            </p>
          </>
        }
      />
      <ContactBody />
      <RotatingPhraseBand />
    </main>
  );
}
