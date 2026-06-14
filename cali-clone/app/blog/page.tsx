import Link from "next/link";
import Image from "next/image";
import { getDoc } from "@/lib/store";
import { DEFAULT_BLOG, type BlogPost } from "@/lib/blog";
import { isAdmin, isPublic } from "@/lib/adminSession";

export const dynamic = "force-dynamic";

function Cover({ post }: { post: BlogPost }) {
  const wrap: React.CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 10",
    borderRadius: 12,
    overflow: "hidden",
    background: "var(--color-bg-alt-2)",
  };
  if (!post.cover) {
    return <div style={wrap} aria-hidden />;
  }
  return (
    <div style={wrap}>
      <Image
        src={post.cover}
        alt={post.title}
        fill
        sizes="(max-width: 700px) 100vw, 33vw"
        style={{ objectFit: "cover" }}
        unoptimized={post.cover.startsWith("/api/media/")}
      />
    </div>
  );
}

export default async function Page() {
  const data = await getDoc("blog", DEFAULT_BLOG);
  // Strip drafts in place so unpublished content never reaches the HTML/RSC payload.
  if (!(await isAdmin())) data.posts = data.posts.filter(isPublic);
  const posts = data.posts;

  return (
    <main className="container-x" style={{ minHeight: "60vh", paddingTop: 200, paddingBottom: 120 }}>
      <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>{data.title}</h1>
      <p style={{ marginTop: 16, maxWidth: 640, color: "var(--color-text-muted)", fontSize: 18 }}>
        {data.intro}
      </p>

      <div
        style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 40,
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <article>
              <Cover post={post} />
              <div style={{ marginTop: 14, fontSize: 13, color: "var(--color-text-muted)" }}>
                {post.date}
              </div>
              <h2 style={{ marginTop: 8, fontSize: 22, lineHeight: 1.25 }}>{post.title}</h2>
              <p style={{ marginTop: 10, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                {post.excerpt}
              </p>
              {post.tags.length > 0 && (
                <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
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
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
