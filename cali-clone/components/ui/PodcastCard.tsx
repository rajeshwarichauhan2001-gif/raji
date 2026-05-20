import Image from "next/image";
import { unsplashUrl } from "@/lib/unsplash";

type Props = {
  imageId: string;
  eyebrow: string;
  title: string;
};

export default function PodcastCard({ imageId, eyebrow, title }: Props) {
  return (
    <article
      className="shrink-0"
      style={{ width: "var(--card-w, 320px)" }}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden mb-5 bg-[color:var(--color-bg-alt)]">
        <Image
          src={unsplashUrl(imageId, 700)}
          alt={title}
          fill
          sizes="(max-width: 767px) 240px, (max-width: 1199px) 280px, 320px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="mb-2" style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14, color: "var(--color-text-muted)" }}>
        {eyebrow}
      </p>
      <h3 style={{ fontSize: 22, lineHeight: 1.15 }}>{title}</h3>
    </article>
  );
}
