type Props = { title: string };

export default function BlogRow({ title }: Props) {
  return (
    <div
      className="row-hover flex items-center justify-between gap-6 py-7 cursor-pointer"
      style={{ borderBottom: "1px solid var(--color-divider)" }}
    >
      <h3 className="row-content" style={{ fontSize: 28, fontStyle: "italic", maxWidth: "80%", lineHeight: 1.2 }}>
        {title}
      </h3>
      <span className="row-arrow flex items-center gap-2 shrink-0" style={{ fontSize: 13, letterSpacing: "0.05em" }}>
        read more <span aria-hidden>→</span>
      </span>
    </div>
  );
}
