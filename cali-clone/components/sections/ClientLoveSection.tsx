"use client";
import Image from "next/image";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useImageReveal } from "@/hooks/useImageReveal";
import { IMG, unsplashUrl } from "@/lib/unsplash";

export default function ClientLoveSection() {
  const img = useImageReveal();
  const txt = useFadeUp({ selector: ".fu", stagger: 0.12 });
  return (
    <section className="container-x" style={{ padding: "120px 0" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={img as React.Ref<HTMLDivElement>} className="relative w-full h-[60vh] md:h-[80vh]">
          <Image src={unsplashUrl(IMG.portrait1, 1200)} alt="Client love" fill sizes="(max-width: 767px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        </div>
        <div ref={txt as React.Ref<HTMLDivElement>} className="flex flex-col gap-6 max-w-[500px]">
          <span className="fu eyebrow-italic">Client Love</span>
          <p
            className="fu"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.6,
              color: "var(--color-text)",
            }}
          >
            “Working with Raji didn&apos;t just rebuild my brand — it rebuilt the way I show up for it. I stopped
            apologizing in my captions and started leading with calm. Three launches later, every single one has sold
            out before I even sent the public email.”
          </p>
          <p className="fu" style={{ fontStyle: "italic", fontSize: 13, color: "var(--color-text-muted)" }}>
            — Sarah M., business owner
          </p>
        </div>
      </div>
    </section>
  );
}
