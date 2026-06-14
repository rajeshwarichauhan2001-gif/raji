import Image from "next/image";
import Link from "next/link";
import { getDoc } from "@/lib/store";
import { DEFAULT_BRANDS } from "@/lib/brands";
import { isAdmin, isPublic } from "@/lib/adminSession";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getDoc("brands", DEFAULT_BRANDS);
  // Strip drafts in place so unpublished content never reaches the HTML/RSC payload.
  if (!(await isAdmin())) data.items = data.items.filter(isPublic);
  const items = data.items;

  return (
    <main className="container-x" style={{ paddingTop: 200, paddingBottom: 120 }}>
      <h1
        style={{
          fontSize: "clamp(2.5rem, 7vw, 5rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          margin: 0,
          color: "#1a1a1a",
        }}
      >
        {data.archiveTitle}
      </h1>

      <p
        style={{
          marginTop: 20,
          maxWidth: 640,
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          lineHeight: 1.6,
          color: "rgba(26,26,26,0.55)",
        }}
      >
        {data.archiveIntro}
      </p>

      <div
        style={{
          marginTop: 64,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}
      >
        {items.map((brand) => (
          <div
            key={brand.slug}
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#fdfaf3",
              border: "1px solid rgba(26,26,26,0.1)",
              borderRadius: 20,
              padding: 28,
              color: "#1a1a1a",
            }}
          >
            {brand.logo ? (
              <Image
                src={brand.logo}
                alt={brand.name}
                width={72}
                height={72}
                unoptimized
                style={{ objectFit: "contain", borderRadius: 14 }}
              />
            ) : (
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(26,26,26,0.06)",
                  fontSize: 32,
                  fontWeight: 600,
                  color: "rgba(26,26,26,0.7)",
                }}
              >
                {brand.name[0]}
              </div>
            )}

            <h2
              style={{
                marginTop: 24,
                marginBottom: 0,
                fontSize: "1.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              {brand.name}
            </h2>

            <p
              style={{
                marginTop: 10,
                marginBottom: 0,
                fontSize: "0.95rem",
                lineHeight: 1.55,
                color: "rgba(26,26,26,0.55)",
                flex: 1,
              }}
            >
              {brand.cardDescription}
            </p>

            <Link
              href={`/brands/${brand.slug}`}
              style={{
                marginTop: 28,
                alignSelf: "flex-start",
                display: "inline-block",
                padding: "12px 22px",
                borderRadius: 999,
                background: "#1a1a1a",
                color: "#fdfaf3",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Explore the brand →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
