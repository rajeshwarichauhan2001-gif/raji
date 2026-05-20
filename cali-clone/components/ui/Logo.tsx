type Props = {
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "inverse";
};

export default function Logo({ className, style, variant = "default" }: Props) {
  const cls = `logo ${variant === "inverse" ? "logo-inverse" : ""} ${className ?? ""}`.trim();
  return (
    <span className={cls} aria-label="raji" style={style}>
      <span className="logo-word">raji</span>
      <span className="logo-dot" />
    </span>
  );
}
