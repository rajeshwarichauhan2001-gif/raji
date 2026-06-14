import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDoc } from "@/lib/store";
import { DEFAULT_BLOG, findPost } from "@/lib/blog";
import { isAdmin, isPublic } from "@/lib/adminSession";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getDoc("blog", DEFAULT_BLOG);
  const post = findPost(data, slug);
  return { title: post ? post.title : "Not found" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getDoc("blog", DEFAULT_BLOG);
  const post = findPost(data, slug);
  if (!post) notFound();
  if (!isPublic(post) && !(await isAdmin())) notFound();

  const paragraphs = post.body.split(/\n\n+/).filter((p) => p.trim().length > 0);

  return (
    <main
      className="container-x"
      style={{ minHeight: "60vh", paddingTop: 200, paddingBottom: 120 }}
    >
      <Link
        href="/blog"
        style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: 15 }}
      >
        ← Back to blog
      </Link>

      <article style={{ maxWidth: 760, margin: "0 auto" }}>
        {post.cover && (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: 14,
              overflow: "hidden",
              background: "var(--color-bg-alt-2)",
              marginTop: 32,
            }}
          >
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="760px"
              style={{ objectFit: "cover" }}
              unoptimized={post.cover.startsWith("/api/media/")}
            />
          </div>
        )}

        <h1 style={{ marginTop: 40, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.15 }}>
          {post.title}
        </h1>

        <div style={{ marginTop: 16, fontSize: 15, color: "var(--color-text-muted)" }}>
          {post.date} · {post.author}
        </div>

        {post.tags.length > 0 && (
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: 999,
                  border: "1px solid var(--color-text)",
                  color: "var(--color-text)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40 }}>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{ marginTop: i === 0 ? 0 : 24, fontSize: 18, lineHeight: 1.7 }}
            >
              {para}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
