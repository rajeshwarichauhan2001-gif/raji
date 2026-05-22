import { Mail, Clock, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <p className="eyebrow contact-info-eyebrow">Reach out directly</p>
      <div className="contact-info-rows">
        <div className="contact-info-row">
          <span className="contact-info-icon" aria-hidden="true">
            <Mail size={18} strokeWidth={1.5} />
          </span>
          <div className="contact-info-text">
            <span className="contact-info-label">Email</span>
            <a
              className="contact-info-value"
              href="mailto:rajeshwarichauhan2001@gmail.com"
            >
              rajeshwarichauhan2001@gmail.com
            </a>
          </div>
        </div>
        <div className="contact-info-row">
          <span className="contact-info-icon" aria-hidden="true">
            <Clock size={18} strokeWidth={1.5} />
          </span>
          <div className="contact-info-text">
            <span className="contact-info-label">Working Hours</span>
            <span className="contact-info-value">
              Monday – Friday · 07am – 09pm
            </span>
          </div>
        </div>
        <div className="contact-info-row">
          <span className="contact-info-icon" aria-hidden="true">
            <MapPin size={18} strokeWidth={1.5} />
          </span>
          <div className="contact-info-text">
            <span className="contact-info-label">Location</span>
            <span className="contact-info-value">Mumbai, India</span>
          </div>
        </div>
      </div>
      <p className="contact-info-note">
        I usually reply within 24 hours.
      </p>
    </div>
  );
}
