import { Mail, Clock, MapPin } from "lucide-react";
import { DEFAULT_CONTACT, type ContactData } from "@/lib/contact";

export default function ContactInfo({
  data = DEFAULT_CONTACT.info,
}: {
  data?: ContactData["info"];
}) {
  return (
    <div className="contact-info">
      <p className="eyebrow contact-info-eyebrow">{data.eyebrow}</p>
      <div className="contact-info-rows">
        <div className="contact-info-row">
          <span className="contact-info-icon" aria-hidden="true">
            <Mail size={18} strokeWidth={1.5} />
          </span>
          <div className="contact-info-text">
            <span className="contact-info-label">Email</span>
            <a className="contact-info-value" href={`mailto:${data.email}`}>
              {data.email}
            </a>
          </div>
        </div>
        <div className="contact-info-row">
          <span className="contact-info-icon" aria-hidden="true">
            <Clock size={18} strokeWidth={1.5} />
          </span>
          <div className="contact-info-text">
            <span className="contact-info-label">{data.hoursLabel}</span>
            <span className="contact-info-value">{data.hours}</span>
          </div>
        </div>
        <div className="contact-info-row">
          <span className="contact-info-icon" aria-hidden="true">
            <MapPin size={18} strokeWidth={1.5} />
          </span>
          <div className="contact-info-text">
            <span className="contact-info-label">{data.locationLabel}</span>
            <span className="contact-info-value">{data.location}</span>
          </div>
        </div>
      </div>
      <p className="contact-info-note">{data.note}</p>
    </div>
  );
}
