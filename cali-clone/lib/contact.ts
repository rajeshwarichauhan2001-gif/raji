// Client-safe Contact page content model (no "fs").
export type ContactParagraph = { text: string; italic: boolean };

export type ContactData = {
  header: { eyebrow: string; title: string; paragraphs: ContactParagraph[] };
  form: {
    eyebrow: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    messageHint: string;
    submitLabel: string;
    successMessage: string;
  };
  info: {
    eyebrow: string;
    email: string;
    hoursLabel: string;
    hours: string;
    locationLabel: string;
    location: string;
    note: string;
  };
};

export const DEFAULT_CONTACT: ContactData = {
  header: {
    eyebrow: "Get in touch",
    title: "Contact Us",
    paragraphs: [
      { text: "Start the conversation to build a strong relationship and a successful business.", italic: false },
      { text: "Effortless Communication, Worldwide Influence.", italic: true },
      { text: "Seamless and effective communication that transcends borders, empowering global connections and impact.", italic: false },
    ],
  },
  form: {
    eyebrow: "Send us a message",
    nameLabel: "Your name",
    emailLabel: "Your email",
    subjectLabel: "Subject",
    messageLabel: "Your message",
    messageHint: "optional",
    submitLabel: "Send Message",
    successMessage: "Thanks — I'll write back within a day.",
  },
  info: {
    eyebrow: "Reach out directly",
    email: "rajeshwarichauhan2001@gmail.com",
    hoursLabel: "Working Hours",
    hours: "Monday – Friday · 07am – 09pm",
    locationLabel: "Location",
    location: "Mumbai, India",
    note: "I usually reply within 24 hours.",
  },
};
