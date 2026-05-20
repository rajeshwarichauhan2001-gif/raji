"use client";
import { useRotatingBadge } from "@/hooks/useRotatingBadge";

type Props = { size?: number; text?: string };

export default function RotatingBadge({
  size = 160,
  text = "learn more · new course for designers · grow your web design business · new · ",
}: Props) {
  const ref = useRotatingBadge(22);
  const id = "circle-path";
  // Inline SVG with circular textPath. The badge spins; text rides static curve.
  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      style={{ width: size, height: size, display: "inline-block" }}
      aria-hidden
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <path id={id} d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
        </defs>
        <text
          fill="var(--color-text)"
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14, letterSpacing: "0.12em" }}
        >
          <textPath href={`#${id}`} startOffset="0">
            {text}
          </textPath>
        </text>
        <g transform="translate(100 100)">
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--color-accent-2)"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22 }}
          >
            ↗
          </text>
        </g>
      </svg>
    </span>
  );
}
