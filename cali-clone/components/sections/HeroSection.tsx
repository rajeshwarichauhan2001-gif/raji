"use client";
import { Play, Sparkles } from "lucide-react";
import BoomerangVideoBg from "./BoomerangVideoBg";

const BG_VIDEO =
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4";

export default function HeroSection() {
  return (
    <section className="hero-boom">
      <BoomerangVideoBg src={BG_VIDEO} className="hero-boom-bg" />
      <div className="hero-boom-veil" />

      <div className="hero-boom-copy">
        <h1 className="hero-boom-title">
          Calm strategy{" "}
          <span className="hero-boom-accent">
            shaped for women
            <br className="hidden sm:block" /> who build with intention
          </span>
        </h1>
        <p className="hero-boom-sub">
          Steady content, story-first social, no chasing trends — for service
          providers and coaches who want growth that holds.
        </p>
      </div>

      <div className="hero-boom-cta">
        <div className="hero-boom-cta-tag">
          <Sparkles className="hero-boom-cta-icon" />
          <span>
            StoryStudio<sup>™</sup>
          </span>
        </div>
        <p className="hero-boom-cta-body">
          Raji weaves your offers, voice, and audience into one calm content
          system — so showing up online stops feeling like a daily emergency.
        </p>
        <div className="hero-boom-cta-row">
          <button className="hero-boom-btn-primary">Book a call</button>
          <button className="hero-boom-btn-ghost">See the work.</button>
        </div>
      </div>

      <div className="hero-boom-video-link">
        <button className="hero-boom-play" aria-label="play process video">
          <Play className="hero-boom-play-icon" />
        </button>
        <span className="hero-boom-play-label">How we work?</span>
        <span className="hero-boom-play-dur">1:35</span>
      </div>
    </section>
  );
}
