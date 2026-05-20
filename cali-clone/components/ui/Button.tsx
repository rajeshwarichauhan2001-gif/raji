import Link from "next/link";
import { ReactNode } from "react";

type Variant = "filled" | "outlined";
type Props = {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({ variant = "filled", href, children, className = "", onClick, type = "button" }: Props) {
  const cls = `pill ${variant === "filled" ? "pill-filled" : "pill-outlined"} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
