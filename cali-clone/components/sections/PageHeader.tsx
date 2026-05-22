import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string | ReactNode;
};

export default function PageHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="page-header">
      <div className="page-header-inner">
        <p className="eyebrow page-header-eyebrow">{eyebrow}</p>
        <h1 className="page-header-title">{title}</h1>
        {subtitle ? (
          <div className="page-header-subtitle">{subtitle}</div>
        ) : null}
      </div>
    </section>
  );
}
