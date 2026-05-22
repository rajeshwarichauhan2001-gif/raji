"use client";

const CLIENTS = [
  "Intelleve",
  "Monarch",
  "Godrej",
  "Rapoo",
  "NBG",
  "Kunuts",
  "Furnishing Home",
  "Pratik",
  "Studio One",
  "Tribe Co",
  "House of Hue",
  "Aurora Labs",
  "North Star",
  "Verve Studio",
];

export default function ClientLogoMarquee() {
  return (
    <section className="clm-section">
      <p className="clm-caption">
        Join over 50+ businesses to create unique brand designs.
      </p>
      <div className="clm-viewport">
        <div className="clm-track">
          {[...CLIENTS, ...CLIENTS].map((name, i) => (
            <span key={`${name}-${i}`} className="clm-item">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
