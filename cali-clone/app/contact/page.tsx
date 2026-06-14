import PageHeader from "@/components/sections/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import ContactInfo from "@/components/sections/ContactInfo";
import RotatingPhraseBand from "@/components/sections/RotatingPhraseBand";
import { DEFAULT_CONTACT, type ContactData } from "@/lib/contact";
import { getDoc } from "@/lib/store";

export const dynamic = "force-dynamic";

function ContactBody({ data }: { data: ContactData }) {
  return (
    <section className="contact-grid">
      <div className="contact-grid-inner">
        <ContactForm data={data.form} />
        <ContactInfo data={data.info} />
      </div>
    </section>
  );
}

export default async function Page() {
  const contact = await getDoc<ContactData>("contact", DEFAULT_CONTACT);

  return (
    <main>
      <PageHeader
        eyebrow={contact.header.eyebrow}
        title={contact.header.title}
        subtitle={
          <>
            {contact.header.paragraphs.map((p, i) => (
              <p key={i} className={p.italic ? "page-header-italic" : undefined}>
                {p.text}
              </p>
            ))}
          </>
        }
      />
      <ContactBody data={contact} />
      <RotatingPhraseBand />
    </main>
  );
}
