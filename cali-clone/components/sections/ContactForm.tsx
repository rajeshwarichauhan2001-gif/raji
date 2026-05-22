"use client";
import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-form">
      <p className="eyebrow-italic contact-form-eyebrow">Send us a message</p>
      <form onSubmit={onSubmit} className="contact-form-fields">
        <label className="contact-field">
          <span className="contact-field-label">Your name</span>
          <input type="text" name="name" required />
        </label>
        <label className="contact-field">
          <span className="contact-field-label">Your email</span>
          <input type="email" name="email" required />
        </label>
        <label className="contact-field">
          <span className="contact-field-label">Subject</span>
          <input type="text" name="subject" required />
        </label>
        <label className="contact-field">
          <span className="contact-field-label">
            Your message <em className="contact-field-hint">optional</em>
          </span>
          <textarea name="message" rows={4} />
        </label>
        <button type="submit" className="pill pill-filled contact-form-submit">
          Send Message
        </button>
        {sent ? (
          <p className="contact-form-success">
            Thanks — I&apos;ll write back within a day.
          </p>
        ) : null}
      </form>
    </div>
  );
}
