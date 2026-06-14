"use client";
import { useState, FormEvent } from "react";
import { DEFAULT_CONTACT, type ContactData } from "@/lib/contact";

export default function ContactForm({
  data = DEFAULT_CONTACT.form,
}: {
  data?: ContactData["form"];
}) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-form">
      <p className="eyebrow-italic contact-form-eyebrow">{data.eyebrow}</p>
      <form onSubmit={onSubmit} className="contact-form-fields">
        <label className="contact-field">
          <span className="contact-field-label">{data.nameLabel}</span>
          <input type="text" name="name" required />
        </label>
        <label className="contact-field">
          <span className="contact-field-label">{data.emailLabel}</span>
          <input type="email" name="email" required />
        </label>
        <label className="contact-field">
          <span className="contact-field-label">{data.subjectLabel}</span>
          <input type="text" name="subject" required />
        </label>
        <label className="contact-field">
          <span className="contact-field-label">
            {data.messageLabel}{" "}
            <em className="contact-field-hint">{data.messageHint}</em>
          </span>
          <textarea name="message" rows={4} />
        </label>
        <button type="submit" className="pill pill-filled contact-form-submit">
          {data.submitLabel}
        </button>
        {sent ? (
          <p className="contact-form-success">{data.successMessage}</p>
        ) : null}
      </form>
    </div>
  );
}
