"use client";
import BoomerangVideoBg from "./BoomerangVideoBg";

const BG_VIDEO =
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4";

export default function HeroSection() {
  return (
    <section className="hero-boom">
      <BoomerangVideoBg src={BG_VIDEO} className="hero-boom-bg" />
      <div className="hero-boom-veil" />

      <div className="hero-boom-copy">
        <p className="hero-boom-eyebrow">SOCIAL MEDIA STRATEGIST</p>
        <h1 className="hero-boom-title">
          Transforming Brands Through{" "}
          <span className="hero-boom-accent">
            Strategic Social Media Excellence
          </span>
        </h1>
        <p className="hero-boom-sub">
          Social media professional with proven expertise in managing and growing brand presence
          across diverse digital platforms. Specialized in content creation, community engagement,
          influencer collaborations, and leveraging analytics to optimize performance and drive
          measurable growth. I combine strategic planning with creative execution to build
          meaningful connections between brands and their audiences.
        </p>
        <div className="hero-boom-actions">
          <a href="#services" className="hero-boom-btn-primary">View My Work</a>
          <a href="#resume" className="hero-boom-btn-outline">Resume</a>
          <a href="#contact" className="hero-boom-btn-ghost">Let&apos;s Collaborate</a>
        </div>
      </div>
    </section>
  );
}
