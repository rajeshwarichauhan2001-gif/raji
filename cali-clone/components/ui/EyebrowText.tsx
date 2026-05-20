import { ReactNode } from "react";

type Props = { italic?: boolean; children: ReactNode; className?: string };

export default function EyebrowText({ italic = false, children, className = "" }: Props) {
  return (
    <span className={`${italic ? "eyebrow-italic" : "eyebrow"} ${className}`}>{children}</span>
  );
}
