"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Sparkles, User, BarChart3, MessageSquareQuote, HelpCircle,
  PanelTop, PanelBottom, Newspaper, Briefcase, LogOut, ExternalLink, ChevronRight,
  Monitor, Tablet, Smartphone, Eye, RefreshCw, Mail, FileText, X,
  type LucideIcon,
} from "lucide-react";

type Device = "desktop" | "tablet" | "mobile";
const DEVICE_DIMS: Record<Device, [number, number]> = {
  desktop: [1440, 900],
  tablet: [834, 1112],
  mobile: [390, 844],
};
import type { SiteContent } from "@/lib/content";
import type { SiteChrome } from "@/lib/site";
import type { BlogData } from "@/lib/blog";
import type { BrandsData, Brand } from "@/lib/brands";
import { DEFAULT_BRAND } from "@/lib/brand";
import type { AboutData } from "@/lib/about";
import type { ContactData } from "@/lib/contact";

type DocKey = "home" | "site" | "blog" | "brands" | "about" | "contact";
type Screen = { id: string; label: string; group: string; doc: DocKey; preview: string; icon: LucideIcon };

const SCREENS: Screen[] = [
  { id: "hero", label: "Hero", group: "Home Page", doc: "home", preview: "/", icon: Sparkles },
  { id: "approach", label: "Approach", group: "Home Page", doc: "home", preview: "/", icon: User },
  { id: "stats", label: "Stats", group: "Home Page", doc: "home", preview: "/", icon: BarChart3 },
  { id: "testimonials", label: "Testimonials", group: "Home Page", doc: "home", preview: "/", icon: MessageSquareQuote },
  { id: "faq", label: "FAQ", group: "Home Page", doc: "home", preview: "/", icon: HelpCircle },
  { id: "header", label: "Header / Nav", group: "Header & Footer", doc: "site", preview: "/", icon: PanelTop },
  { id: "footer", label: "Footer", group: "Header & Footer", doc: "site", preview: "/", icon: PanelBottom },
  { id: "about", label: "About Us", group: "Pages", doc: "about", preview: "/about", icon: User },
  { id: "contact", label: "Contact Us", group: "Pages", doc: "contact", preview: "/contact", icon: Mail },
  { id: "blog-archive", label: "Blog Archive", group: "Blog", doc: "blog", preview: "/blog", icon: Newspaper },
  { id: "blog-single", label: "Blog Single Pages", group: "Blog", doc: "blog", preview: "/blog", icon: FileText },
  { id: "brand-archive", label: "Brand Archive", group: "Brand Pages", doc: "brands", preview: "/brands", icon: Briefcase },
  { id: "brand-pages", label: "Brand Single Pages", group: "Brand Pages", doc: "brands", preview: "/brands", icon: Briefcase },
];

const ENDPOINT: Record<DocKey, string> = {
  home: "/api/admin/content",
  site: "/api/admin/doc/site",
  blog: "/api/admin/doc/blog",
  brands: "/api/admin/doc/brands",
  about: "/api/admin/doc/about",
  contact: "/api/admin/doc/contact",
};

export default function AdminPage() {
  const router = useRouter();
  const [active, setActive] = useState("overview");
  const [docs, setDocs] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [device, setDevice] = useState<Device>("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [selectedPost, setSelectedPost] = useState(0);

  const screen = SCREENS.find((s) => s.id === active);
  const docKey = screen?.doc;
  const data = docKey ? docs[docKey] : undefined;

  const loadDoc = useCallback(async (key: DocKey) => {
    const r = await fetch(ENDPOINT[key]);
    const d = await r.json();
    setDocs((prev) => ({ ...prev, [key]: d }));
  }, []);

  useEffect(() => {
    if (docKey && docs[docKey] === undefined) loadDoc(docKey);
  }, [docKey, docs, loadDoc]);

  const setDoc = (next: unknown) => docKey && setDocs((prev) => ({ ...prev, [docKey]: next }));

  async function save() {
    if (!docKey) return;
    setSaving(true);
    setMsg("");
    const r = await fetch(ENDPOINT[docKey], {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(docs[docKey]),
    });
    setSaving(false);
    setMsg(r.ok ? "Saved ✓" : "Save failed");
    if (r.ok) setRefreshKey((k) => k + 1); // reload the live preview iframe
    setTimeout(() => setMsg(""), 4000);
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  const groups = [...new Set(SCREENS.map((s) => s.group))];
  const title = screen ? `${screen.group}` : "Dashboard";
  const sub = screen ? screen.label : "Overview";
  let previewHref = screen ? screen.preview : "/";
  if (active === "brand-pages") {
    const brands = docs.brands as BrandsData | undefined;
    const slug = brands?.items[selectedBrand]?.slug;
    if (slug) previewHref = `/brands/${slug}`;
  }
  if (active === "blog-single") {
    const blog = docs.blog as BlogData | undefined;
    const slug = blog?.posts[selectedPost]?.slug;
    if (slug) previewHref = `/blog/${slug}`;
  }

  return (
    <div style={S.shell} className="raji-cms">
      <style>{CMS_CSS}</style>
      {/* Sidebar */}
      <aside style={S.sidebar}>
        <div style={S.brandRow}>
          <div style={S.brandMark}>R</div>
          <div>
            <div style={S.brandName}>Raji CMS</div>
            <div style={S.brandSub}>Content Manager</div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <button onClick={() => setActive("overview")} style={{ ...S.navItem, ...(active === "overview" ? S.navItemActive : {}) }}>
            <LayoutDashboard size={17} /> Dashboard
          </button>

          {groups.map((g) => (
            <div key={g} style={{ marginTop: 16 }}>
              <div style={S.groupLabel}>{g}</div>
              {SCREENS.filter((s) => s.group === g).map((s) => {
                const Icon = s.icon;
                return (
                  <button key={s.id} onClick={() => setActive(s.id)} style={{ ...S.navItem, ...(active === s.id ? S.navItemActive : {}) }}>
                    <Icon size={17} /> {s.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <button onClick={logout} style={{ ...S.navItem, color: "#c98b8b", marginTop: 12 }}>
          <LogOut size={17} /> Logout
        </button>
      </aside>

      {/* Right */}
      <div style={S.right}>
        <header style={S.topbar}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <span style={{ color: "#8a857c", fontSize: 14 }}>{title}</span>
            {screen && <ChevronRight size={15} color="#5a564e" />}
            {screen && <strong style={{ color: "#fff", fontSize: 15 }}>{sub}</strong>}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {msg && <span style={{ color: msg.includes("fail") ? "#ff8a8a" : "#9ae6a0", fontSize: 13 }}>{msg}</span>}
            {screen && (
              <button onClick={() => { setRefreshKey((k) => k + 1); setPreviewOpen(true); }} style={S.linkBtn} title="Open live preview">
                <Eye size={15} /> Preview
              </button>
            )}
            <a href={previewHref} target="_blank" style={S.linkBtn}><ExternalLink size={15} /> Open</a>
            {screen && <button onClick={save} disabled={saving} style={S.saveBtn}>{saving ? "Saving…" : "Save changes"}</button>}
          </div>
        </header>

        <main style={S.main}>
          {active === "overview"
            ? <Overview onNavigate={setActive} />
            : data === undefined
            ? <div style={{ color: "#9a958c" }}>Loading…</div>
            : active === "brand-archive"
            ? <BrandArchiveEditor c={data as BrandsData} set={setDoc as (c: BrandsData) => void} />
            : active === "brand-pages"
            ? <BrandPagesEditor c={data as BrandsData} set={setDoc as (c: BrandsData) => void} selected={selectedBrand} onSelect={setSelectedBrand} />
            : active === "blog-archive"
            ? <BlogArchiveEditor c={data as BlogData} set={setDoc as (c: BlogData) => void} />
            : active === "blog-single"
            ? <BlogSingleEditor c={data as BlogData} set={setDoc as (c: BlogData) => void} selected={selectedPost} onSelect={setSelectedPost} />
            : <Editor active={active} data={data} setDoc={setDoc} />}
        </main>
      </div>

      {screen && previewOpen && (
        <PreviewModal
          src={previewHref}
          device={device}
          setDevice={setDevice}
          refreshKey={refreshKey}
          onReload={() => setRefreshKey((k) => k + 1)}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}

/* ============================ Overview ============================ */
function Overview({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [home, setHome] = useState<SiteContent | null>(null);
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [brands, setBrands] = useState<BrandsData | null>(null);

  useEffect(() => {
    fetch("/api/admin/content").then((r) => r.json()).then(setHome);
    fetch("/api/admin/doc/blog").then((r) => r.json()).then(setBlog);
    fetch("/api/admin/doc/brands").then((r) => r.json()).then(setBrands);
  }, []);

  const stats = [
    { label: "Brands", value: brands?.items.length ?? "—", icon: Briefcase, go: "brand-archive" },
    { label: "Blog Posts", value: blog?.posts.length ?? "—", icon: Newspaper, go: "blog-archive" },
    { label: "Testimonials", value: home?.testimonials.items.length ?? "—", icon: MessageSquareQuote, go: "testimonials" },
    { label: "FAQs", value: home?.faq.items.length ?? "—", icon: HelpCircle, go: "faq" },
  ];

  const sections = [
    { title: "Home Page", desc: "Hero, approach, stats, testimonials & FAQ", icon: Sparkles, go: "hero" },
    { title: "Header & Footer", desc: "Navigation, CTA, footer links & socials", icon: PanelTop, go: "header" },
    { title: "About & Contact", desc: "About story and contact details", icon: User, go: "about" },
    { title: "Blog", desc: "Create & edit blog posts and the archive", icon: Newspaper, go: "blog-archive" },
    { title: "Brands", desc: "Brand archive cards + each case-study page", icon: Briefcase, go: "brand-archive" },
  ];

  const pages = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "/brands" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ color: "#fff", fontSize: 26, margin: "0 0 4px" }}>Welcome back 👋</h1>
        <p style={{ color: "#8a857c", margin: 0, fontSize: 14 }}>Manage your website content below. Changes go live after a page refresh.</p>
      </div>

      {/* Stat cards */}
      <div style={S.statGrid}>
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <button key={s.label} onClick={() => onNavigate(s.go)} style={S.statCard}>
              <div style={S.statIcon}><Icon size={20} color="#e8c37e" /></div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#9a958c", marginTop: 4 }}>{s.label}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Manage sections */}
      <div>
        <h2 style={S.sectionHead}>Manage content</h2>
        <div style={S.cardGrid}>
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.title} onClick={() => onNavigate(s.go)} style={S.manageCard}>
                <div style={S.statIcon}><Icon size={18} color="#e8c37e" /></div>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>{s.title}</div>
                  <div style={{ color: "#8a857c", fontSize: 13, marginTop: 2 }}>{s.desc}</div>
                </div>
                <ChevronRight size={18} color="#5a564e" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Live pages */}
      <div>
        <h2 style={S.sectionHead}>Live pages</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {pages.map((p) => (
            <a key={p.href} href={p.href} target="_blank" style={S.pagePill}>
              <ExternalLink size={14} /> {p.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ Editors ============================ */
function Editor({ active, data, setDoc }: { active: string; data: unknown; setDoc: (d: unknown) => void }) {
  switch (active) {
    case "hero": return <HeroEditor c={data as SiteContent} set={setDoc as (c: SiteContent) => void} />;
    case "approach": return <ApproachEditor c={data as SiteContent} set={setDoc as (c: SiteContent) => void} />;
    case "stats": return <StatsEditor c={data as SiteContent} set={setDoc as (c: SiteContent) => void} />;
    case "testimonials": return <TestiEditor c={data as SiteContent} set={setDoc as (c: SiteContent) => void} />;
    case "faq": return <FaqEditor c={data as SiteContent} set={setDoc as (c: SiteContent) => void} />;
    case "header": return <HeaderEditor c={data as SiteChrome} set={setDoc as (c: SiteChrome) => void} />;
    case "footer": return <FooterEditor c={data as SiteChrome} set={setDoc as (c: SiteChrome) => void} />;
    case "about": return <AboutEditor c={data as AboutData} set={setDoc as (c: AboutData) => void} />;
    case "contact": return <ContactEditor c={data as ContactData} set={setDoc as (c: ContactData) => void} />;
    default: return null;
  }
}

// ---------- HOME editors ----------
function HeroEditor({ c, set }: { c: SiteContent; set: (c: SiteContent) => void }) {
  const h = c.hero;
  const up = (p: Partial<typeof h>) => set({ ...c, hero: { ...h, ...p } });
  return (
    <Card title="Hero section">
      <Field label="Eyebrow" value={h.eyebrow} onChange={(v) => up({ eyebrow: v })} />
      <Field label="Title (line 1)" value={h.title} onChange={(v) => up({ title: v })} />
      <Field label="Title accent (highlighted)" value={h.titleAccent} onChange={(v) => up({ titleAccent: v })} />
      <Area label="Subtitle" value={h.sub} onChange={(v) => up({ sub: v })} />
      <Field label="Background video URL" value={h.bgVideo} onChange={(v) => up({ bgVideo: v })} />
      <List label="Buttons" items={h.actions} onChange={(actions) => up({ actions })}
        blank={{ label: "Button", href: "#", style: "ghost" as const }}
        render={(a, s) => (<>
          <Field label="Label" value={a.label} onChange={(v) => s({ ...a, label: v })} />
          <Field label="Link" value={a.href} onChange={(v) => s({ ...a, href: v })} />
          <Select label="Style" value={a.style} options={["primary", "outline", "ghost"]} onChange={(v) => s({ ...a, style: v as typeof a.style })} />
        </>)} />
    </Card>
  );
}
function ApproachEditor({ c, set }: { c: SiteContent; set: (c: SiteContent) => void }) {
  const a = c.approach;
  const up = (p: Partial<typeof a>) => set({ ...c, approach: { ...a, ...p } });
  return (
    <Card title="Approach section">
      <Field label="Eyebrow" value={a.eyebrow} onChange={(v) => up({ eyebrow: v })} />
      <Field label="Title" value={a.title} onChange={(v) => up({ title: v })} />
      <Area label="Body" value={a.body} onChange={(v) => up({ body: v })} />
      <ImageField label="Portrait image" value={a.image} onChange={(v) => up({ image: v })} />
      <List label="Small stats" items={a.stats} onChange={(stats) => up({ stats })}
        blank={{ num: "0+", label: "Label" }}
        render={(s, set2) => (<>
          <Field label="Number" value={s.num} onChange={(v) => set2({ ...s, num: v })} />
          <Field label="Label" value={s.label} onChange={(v) => set2({ ...s, label: v })} />
        </>)} />
    </Card>
  );
}
function StatsEditor({ c, set }: { c: SiteContent; set: (c: SiteContent) => void }) {
  const st = c.stats;
  const up = (p: Partial<typeof st>) => set({ ...c, stats: { ...st, ...p } });
  return (
    <Card title="Stats counter section">
      <Field label="Title" value={st.title} onChange={(v) => up({ title: v })} />
      <List label="Stats" items={st.items} onChange={(items) => up({ items })}
        blank={{ target: 0, decimals: 0, suffix: "+", label: "Label" }}
        render={(s, set2) => (<>
          <Field label="Target number" value={String(s.target)} onChange={(v) => set2({ ...s, target: parseFloat(v) || 0 })} />
          <Field label="Decimals" value={String(s.decimals)} onChange={(v) => set2({ ...s, decimals: parseInt(v) || 0 })} />
          <Field label="Suffix" value={s.suffix} onChange={(v) => set2({ ...s, suffix: v })} />
          <Field label="Label" value={s.label} onChange={(v) => set2({ ...s, label: v })} />
        </>)} />
    </Card>
  );
}
function TestiEditor({ c, set }: { c: SiteContent; set: (c: SiteContent) => void }) {
  const t = c.testimonials;
  const up = (p: Partial<typeof t>) => set({ ...c, testimonials: { ...t, ...p } });
  return (
    <Card title="Testimonials">
      <Field label="Eyebrow" value={t.eyebrow} onChange={(v) => up({ eyebrow: v })} />
      <Field label="Title" value={t.title} onChange={(v) => up({ title: v })} />
      <List label="Reviews" items={t.items} onChange={(items) => up({ items })}
        blank={{ name: "Name", role: "Role", quote: "Quote", avatar: "" }}
        render={(it, s) => (<>
          <Field label="Name" value={it.name} onChange={(v) => s({ ...it, name: v })} />
          <Field label="Role" value={it.role} onChange={(v) => s({ ...it, role: v })} />
          <Area label="Quote" value={it.quote} onChange={(v) => s({ ...it, quote: v })} />
          <ImageField label="Avatar" value={it.avatar} onChange={(v) => s({ ...it, avatar: v })} />
        </>)} />
    </Card>
  );
}
function FaqEditor({ c, set }: { c: SiteContent; set: (c: SiteContent) => void }) {
  const f = c.faq;
  const up = (p: Partial<typeof f>) => set({ ...c, faq: { ...f, ...p } });
  return (
    <Card title="FAQ">
      <Field label="Eyebrow" value={f.eyebrow} onChange={(v) => up({ eyebrow: v })} />
      <Area label="Title" value={f.title} onChange={(v) => up({ title: v })} />
      <List label="Questions" items={f.items} onChange={(items) => up({ items })}
        blank={{ q: "Question?", a: "Answer." }}
        render={(it, s) => (<>
          <Field label="Question" value={it.q} onChange={(v) => s({ ...it, q: v })} />
          <Area label="Answer" value={it.a} onChange={(v) => s({ ...it, a: v })} />
        </>)} />
    </Card>
  );
}

// ---------- SITE editors ----------
function HeaderEditor({ c, set }: { c: SiteChrome; set: (c: SiteChrome) => void }) {
  const n = c.nav;
  const up = (p: Partial<typeof n>) => set({ ...c, nav: { ...n, ...p } });
  return (
    <Card title="Header / Navigation">
      <List label="Nav links" items={n.links} onChange={(links) => up({ links })}
        blank={{ label: "Link", href: "/" }}
        render={(l, s) => (<>
          <Field label="Label" value={l.label} onChange={(v) => s({ ...l, label: v })} />
          <Field label="Link" value={l.href} onChange={(v) => s({ ...l, href: v })} />
        </>)} />
      <Field label="Sign-in label" value={n.signInLabel} onChange={(v) => up({ signInLabel: v })} />
      <Field label="Sign-in link" value={n.signInHref} onChange={(v) => up({ signInHref: v })} />
      <Field label="CTA label" value={n.ctaLabel} onChange={(v) => up({ ctaLabel: v })} />
      <Field label="CTA link" value={n.ctaHref} onChange={(v) => up({ ctaHref: v })} />
    </Card>
  );
}
function FooterEditor({ c, set }: { c: SiteChrome; set: (c: SiteChrome) => void }) {
  const f = c.footer;
  const up = (p: Partial<typeof f>) => set({ ...c, footer: { ...f, ...p } });
  return (
    <Card title="Footer">
      <Field label="Hello heading" value={f.helloHeading} onChange={(v) => up({ helloHeading: v })} />
      <List label="Rotating words" items={f.rotateWords} onChange={(rotateWords) => up({ rotateWords })}
        blank={""} render={(w, s) => <Field label="Word" value={w} onChange={s} />} />
      <Field label="CTA label" value={f.ctaLabel} onChange={(v) => up({ ctaLabel: v })} />
      <Field label="CTA link" value={f.ctaHref} onChange={(v) => up({ ctaHref: v })} />
      <Area label="Tagline" value={f.tagline} onChange={(v) => up({ tagline: v })} />
      <List label="Social links" items={f.socials} onChange={(socials) => up({ socials })}
        blank={{ label: "xx", href: "#" }}
        render={(it, s) => (<>
          <Field label="Label (short text shown)" value={it.label} onChange={(v) => s({ ...it, label: v })} />
          <Field label="Link" value={it.href} onChange={(v) => s({ ...it, href: v })} />
        </>)} />
      <List label="Services column" items={f.serviceLinks} onChange={(serviceLinks) => up({ serviceLinks })}
        blank={{ label: "Service", href: "#" }}
        render={(it, s) => (<>
          <Field label="Label" value={it.label} onChange={(v) => s({ ...it, label: v })} />
          <Field label="Link" value={it.href} onChange={(v) => s({ ...it, href: v })} />
        </>)} />
      <List label="Quick links column" items={f.quickLinks} onChange={(quickLinks) => up({ quickLinks })}
        blank={{ label: "Link", href: "/" }}
        render={(it, s) => (<>
          <Field label="Label" value={it.label} onChange={(v) => s({ ...it, label: v })} />
          <Field label="Link" value={it.href} onChange={(v) => s({ ...it, href: v })} />
        </>)} />
      <Field label="Stay-informed heading" value={f.stayHeading} onChange={(v) => up({ stayHeading: v })} />
      <Area label="Stay-informed text" value={f.stayText} onChange={(v) => up({ stayText: v })} />
      <Field label="Copyright" value={f.copyright} onChange={(v) => up({ copyright: v })} />
      <Field label="Legal" value={f.legal} onChange={(v) => up({ legal: v })} />
    </Card>
  );
}

// ---------- BLOG: archive ----------
const blogSlugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const newPost = () => ({ slug: "new-post", title: "New Post", excerpt: "", cover: "", author: "Rajeshwari Chauhan", date: "2026-01-01", tags: [] as string[], body: "", published: false });

function BlogArchiveEditor({ c, set }: { c: BlogData; set: (c: BlogData) => void }) {
  const up = (p: Partial<BlogData>) => set({ ...c, ...p });
  return (
    <>
      <Card title="Blog archive page" hint="The /blog listing — its heading and intro line.">
        <Field label="Page title" value={c.title} onChange={(v) => up({ title: v })} />
        <Area label="Intro" value={c.intro} onChange={(v) => up({ intro: v })} />
      </Card>
      <div style={{ height: 18 }} />
      <Card title="Posts" hint="Add, remove or reorder posts. Edit a post's full content in Blog Single Pages.">
        <List label="Blog posts" items={c.posts} onChange={(posts) => up({ posts })} blank={newPost()}
          render={(p, s) => (<>
            <Field label="Title" value={p.title} onChange={(v) => s({ ...p, title: v, slug: p.slug || blogSlugify(v) })} />
            <Field label="Slug (URL: /blog/…)" value={p.slug} onChange={(v) => s({ ...p, slug: blogSlugify(v) })} />
            <Field label="Date" value={p.date} onChange={(v) => s({ ...p, date: v })} />
            <ImageField label="Cover image" value={p.cover} onChange={(v) => s({ ...p, cover: v })} />
            <Area label="Excerpt (card summary)" value={p.excerpt} onChange={(v) => s({ ...p, excerpt: v })} />
          </>)} />
      </Card>
    </>
  );
}

// ---------- BLOG: single-page editor (pick a post, edit everything) ----------
function BlogSingleEditor({ c, set, selected, onSelect }: {
  c: BlogData; set: (c: BlogData) => void; selected: number; onSelect: (i: number) => void;
}) {
  const idx = Math.min(selected, Math.max(0, c.posts.length - 1));
  const post = c.posts[idx];
  const setPost = (p: typeof post) => set({ ...c, posts: c.posts.map((it, j) => (j === idx ? p : it)) });
  if (!post) return <div style={{ color: "#9a958c" }}>No posts yet — add one in Blog Archive.</div>;
  return (
    <>
      <Card title="Choose a post to edit" hint="Pick a post, or add a new one — it gets its own live page at /blog/<slug>.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {c.posts.map((p, i) => (
            <button key={p.slug + i} onClick={() => onSelect(i)}
              style={{ ...S.smallBtn, ...(i === idx ? { background: "#2a2620", color: "#e8c37e", borderColor: "#e8c37e" } : {}) }}>
              {p.title}{p.published === false ? " · draft" : ""}
            </button>
          ))}
          <button onClick={() => { set({ ...c, posts: [...c.posts, newPost()] }); onSelect(c.posts.length); }}
            style={{ ...S.smallBtn, borderStyle: "dashed" }}>+ New post</button>
        </div>
      </Card>
      <div style={{ height: 18 }} />
      <Card title="Post content">
        <StatusToggle published={post.published} onChange={(v) => setPost({ ...post, published: v })} />
        <Field label="Title" value={post.title} onChange={(v) => setPost({ ...post, title: v })} />
        <Field label="Slug (URL)" value={post.slug} onChange={(v) => setPost({ ...post, slug: blogSlugify(v) })} />
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}><Field label="Date" value={post.date} onChange={(v) => setPost({ ...post, date: v })} /></div>
          <div style={{ flex: 1 }}><Field label="Author" value={post.author} onChange={(v) => setPost({ ...post, author: v })} /></div>
        </div>
        <ImageField label="Cover image" value={post.cover} onChange={(v) => setPost({ ...post, cover: v })} />
        <Area label="Excerpt" value={post.excerpt} onChange={(v) => setPost({ ...post, excerpt: v })} />
        <Field label="Tags (comma separated)" value={post.tags.join(", ")} onChange={(v) => setPost({ ...post, tags: v.split(",").map((t) => t.trim()).filter(Boolean) })} />
        <Area label="Body (blank line = new paragraph)" value={post.body} onChange={(v) => setPost({ ...post, body: v })} />
      </Card>
    </>
  );
}

// ---------- BRAND: archive (collection) ----------
const makeBrand = (): Brand => ({
  ...structuredClone(DEFAULT_BRAND),
  slug: "new-brand", name: "New Brand", logo: "", cardDescription: "", published: false,
});

function BrandArchiveEditor({ c, set }: { c: BrandsData; set: (c: BrandsData) => void }) {
  const up = (p: Partial<BrandsData>) => set({ ...c, ...p });
  const newBrand = makeBrand;
  const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <>
      <Card title="Brand archive page">
        <Field label="Archive title" value={c.archiveTitle} onChange={(v) => up({ archiveTitle: v })} />
        <Area label="Archive intro" value={c.archiveIntro} onChange={(v) => up({ archiveIntro: v })} />
      </Card>
      <div style={{ height: 18 }} />
      <Card title="Brands (cards on /brands)">
        <p style={{ color: "#8a857c", fontSize: 13, margin: "-6px 0 4px" }}>
          Card-level fields here. Edit each brand&apos;s full case-study page in <strong>Brand Single Pages</strong>.
        </p>
        <List label="Brands" items={c.items} onChange={(items) => up({ items })} blank={newBrand()}
          render={(b, s) => (<>
            <Field label="Name" value={b.name} onChange={(v) => s({ ...b, name: v })} />
            <Field label="Slug (URL: /brands/…)" value={b.slug} onChange={(v) => s({ ...b, slug: slugify(v) })} />
            <ImageField label="Logo" value={b.logo} onChange={(v) => s({ ...b, logo: v })} />
            <Area label="Card description" value={b.cardDescription} onChange={(v) => s({ ...b, cardDescription: v })} />
          </>)} />
      </Card>
    </>
  );
}

// ---------- BRAND: single-page editor (pick a brand, edit full case study) ----------
function BrandPagesEditor({ c, set, selected, onSelect }: {
  c: BrandsData; set: (c: BrandsData) => void; selected: number; onSelect: (i: number) => void;
}) {
  const idx = Math.min(selected, Math.max(0, c.items.length - 1));
  const brand = c.items[idx];
  const setBrand = (b: Brand) => set({ ...c, items: c.items.map((it, j) => (j === idx ? b : it)) });
  if (!brand) return <div style={{ color: "#9a958c" }}>No brands yet — add one in Brand Archive.</div>;
  return (
    <>
      <Card title="Choose a brand to edit" hint="Pick a brand, or add a new one — it gets its own page at /brands/<slug>.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {c.items.map((b, i) => (
            <button key={b.slug + i} onClick={() => onSelect(i)}
              style={{ ...S.smallBtn, ...(i === idx ? { background: "#2a2620", color: "#e8c37e", borderColor: "#e8c37e" } : {}) }}>
              {b.name}{b.published === false ? " · draft" : ""}
            </button>
          ))}
          <button onClick={() => { set({ ...c, items: [...c.items, makeBrand()] }); onSelect(c.items.length); }}
            style={{ ...S.smallBtn, borderStyle: "dashed" }}>+ New brand</button>
        </div>
      </Card>
      <div style={{ height: 18 }} />
      <BrandPageFields brand={brand} set={setBrand} />
    </>
  );
}

const BRAND_TABS: [string, string][] = [
  ["identity", "Identity & Theme"],
  ["hero", "Hero & Stats"],
  ["story", "Story & Work"],
  ["media", "Analytics & Gallery"],
  ["sections", "Sections"],
  ["cta", "CTA & Tabs"],
];

function BrandPageFields({ brand: c, set }: { brand: Brand; set: (c: Brand) => void }) {
  const up = <K extends keyof Brand>(k: K, v: Brand[K]) => set({ ...c, [k]: v });
  const [tab, setTab] = useState("identity");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={S.subTabs}>
        {BRAND_TABS.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ ...S.subTab, ...(tab === id ? S.subTabActive : {}) }}>{label}</button>
        ))}
      </div>
      {tab === "identity" && (<>
      <Card title="Brand identity">
        <StatusToggle published={c.published} onChange={(v) => up("published", v)} />
        <ImageField label="Logo (shown in hero + archive card)" value={c.logo} onChange={(v) => up("logo", v)} />
        <Field label="Name" value={c.name} onChange={(v) => up("name", v)} />
        <ColorField label="Brand color / gradient (used on social-tab charts)" value={c.brandColor} onChange={(v) => up("brandColor", v)} />
      </Card>
      <Card title="Page theme (whole brand page colors)">
        {(() => {
          const pal = c.palette ?? { primary: "#e2231a", bg: "#f6efd9", bgSoft: "#fbf6e3", ink: "#1a1208", accent: "#f0d181" };
          const setPal = (p: Partial<typeof pal>) => up("palette", { ...pal, ...p });
          return (<>
            <ColorField label="Primary (headings, CTA, accents)" value={pal.primary} onChange={(v) => setPal({ primary: v })} />
            <ColorField label="Background (page cream)" value={pal.bg} onChange={(v) => setPal({ bg: v })} />
            <ColorField label="Soft background (panels)" value={pal.bgSoft} onChange={(v) => setPal({ bgSoft: v })} />
            <ColorField label="Ink (dark text / dark sections)" value={pal.ink} onChange={(v) => setPal({ ink: v })} />
            <ColorField label="Accent (gold)" value={pal.accent} onChange={(v) => setPal({ accent: v })} />
          </>);
        })()}
      </Card>
      </>)}
      {tab === "hero" && (<>
      <Card title="Hero">
        <Field label="Eyebrow" value={c.hero.eyebrow} onChange={(v) => up("hero", { ...c.hero, eyebrow: v })} />
        <Field label="Title" value={c.hero.title} onChange={(v) => up("hero", { ...c.hero, title: v })} />
        <Field label="Background text" value={c.hero.bgText} onChange={(v) => up("hero", { ...c.hero, bgText: v })} />
        <Field label="Tagline" value={c.hero.tagline} onChange={(v) => up("hero", { ...c.hero, tagline: v })} />
        <List label="Tags" items={c.hero.tags} onChange={(tags) => up("hero", { ...c.hero, tags })} blank={""} render={(t, s) => <Field label="Tag" value={t} onChange={s} />} />
      </Card>
      <Card title="Stats">
        <List label="Stats" items={c.stats} onChange={(v) => up("stats", v)} blank={{ raw: 0, suffix: "", decimals: 0, label: "Label" }}
          render={(s, set2) => (<>
            <Field label="Number" value={String(s.raw)} onChange={(v) => set2({ ...s, raw: parseFloat(v) || 0 })} />
            <Field label="Decimals" value={String(s.decimals)} onChange={(v) => set2({ ...s, decimals: parseInt(v) || 0 })} />
            <Field label="Suffix" value={s.suffix} onChange={(v) => set2({ ...s, suffix: v })} />
            <Field label="Label" value={s.label} onChange={(v) => set2({ ...s, label: v })} />
          </>)} />
      </Card>
      </>)}
      {tab === "story" && (<>
      <Card title="Story">
        <Field label="Title" value={c.story.title} onChange={(v) => up("story", { ...c.story, title: v })} />
        <Field label="Big number" value={c.story.bigNum} onChange={(v) => up("story", { ...c.story, bigNum: v })} />
        <Area label="Body" value={c.story.body} onChange={(v) => up("story", { ...c.story, body: v })} />
      </Card>
      <Card title="Work done">
        <Field label="Title" value={c.workDone.title} onChange={(v) => up("workDone", { ...c.workDone, title: v })} />
        <List label="Bullets" items={c.workDone.bullets} onChange={(bullets) => up("workDone", { ...c.workDone, bullets })} blank={""} render={(b, s) => <Field label="Bullet" value={b} onChange={s} />} />
      </Card>
      <Card title="Content calendar">
        <Field label="Title" value={c.calendar.title} onChange={(v) => up("calendar", { ...c.calendar, title: v })} />
        <List label="Rows" items={c.calendar.rows} onChange={(rows) => up("calendar", { ...c.calendar, rows })} blank={{ type: "Reel", date: "", concept: "", copy: "" }}
          render={(r, s) => (<>
            <Field label="Type" value={r.type} onChange={(v) => s({ ...r, type: v })} />
            <Field label="Date" value={r.date} onChange={(v) => s({ ...r, date: v })} />
            <Field label="Concept" value={r.concept} onChange={(v) => s({ ...r, concept: v })} />
            <Area label="Copy" value={r.copy} onChange={(v) => s({ ...r, copy: v })} />
          </>)} />
      </Card>
      </>)}
      {tab === "media" && (<>
      <Card title="Analytics cards (drawn in brand color)">
        <List label="Cards" items={c.analytics} onChange={(v) => up("analytics", v)}
          blank={{ stat: "+0%", label: "Label", sub: "", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line" as const, points: [1, 2, 3, 4, 5], metricA: { value: "0", label: "Metric" }, metricB: { value: "0", label: "Metric" } }}
          render={(a, s) => (<>
            <Field label="Title" value={a.label} onChange={(v) => s({ ...a, label: v })} />
            <Field label="Date range" value={a.dateRange} onChange={(v) => s({ ...a, dateRange: v })} />
            <Field label="Badge / stat" value={a.stat} onChange={(v) => s({ ...a, stat: v })} />
            <Select label="Chart type" value={a.chartType} options={["line", "bar"]} onChange={(v) => s({ ...a, chartType: v as "line" | "bar" })} />
            <Field label="Chart points (comma separated numbers)" value={a.points.join(", ")} onChange={(v) => s({ ...a, points: v.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n)) })} />
            <Field label="Metric A value" value={a.metricA.value} onChange={(v) => s({ ...a, metricA: { ...a.metricA, value: v } })} />
            <Field label="Metric A label" value={a.metricA.label} onChange={(v) => s({ ...a, metricA: { ...a.metricA, label: v } })} />
            <Field label="Metric B value" value={a.metricB.value} onChange={(v) => s({ ...a, metricB: { ...a.metricB, value: v } })} />
            <Field label="Metric B label" value={a.metricB.label} onChange={(v) => s({ ...a, metricB: { ...a.metricB, label: v } })} />
            <Field label="Below-card sub line" value={a.sub} onChange={(v) => s({ ...a, sub: v })} />
          </>)} />
      </Card>
      <Card title="Month-on-month plan">
        <Field label="Title" value={c.mom.title} onChange={(v) => up("mom", { ...c.mom, title: v })} />
        <List label="Bullets" items={c.mom.bullets} onChange={(bullets) => up("mom", { ...c.mom, bullets })} blank={""} render={(b, s) => <Field label="Bullet" value={b} onChange={s} />} />
      </Card>
      <Card title="Gallery">
        <Field label="Title" value={c.gallery.title} onChange={(v) => up("gallery", { ...c.gallery, title: v })} />
        <List label="Images" items={c.gallery.images} onChange={(images) => up("gallery", { ...c.gallery, images })} blank={{ src: "", alt: "" }}
          render={(g, s) => (<>
            <ImageField label="Image" value={g.src} onChange={(v) => s({ ...g, src: v })} />
            <Field label="Alt text" value={g.alt} onChange={(v) => s({ ...g, alt: v })} />
          </>)} />
      </Card>
      </>)}
      {tab === "sections" && (<>
      <Card title="Approach">
        <Field label="Eyebrow" value={c.approach.eyebrow} onChange={(v) => up("approach", { ...c.approach, eyebrow: v })} />
        <Field label="Heading (allows <em>)" value={c.approach.heading} onChange={(v) => up("approach", { ...c.approach, heading: v })} />
        <List label="Items" items={c.approach.items} onChange={(items) => up("approach", { ...c.approach, items })} blank={{ num: "00", title: "", body: "" }}
          render={(it, s) => (<>
            <Field label="Number" value={it.num} onChange={(v) => s({ ...it, num: v })} />
            <Field label="Title" value={it.title} onChange={(v) => s({ ...it, title: v })} />
            <Area label="Body" value={it.body} onChange={(v) => s({ ...it, body: v })} />
          </>)} />
      </Card>
      <Card title="Featured reel">
        <Field label="Eyebrow" value={c.featured.eyebrow} onChange={(v) => up("featured", { ...c.featured, eyebrow: v })} />
        <Field label="Heading (allows <em>)" value={c.featured.heading} onChange={(v) => up("featured", { ...c.featured, heading: v })} />
        <Field label="Video URL" value={c.featured.video} onChange={(v) => up("featured", { ...c.featured, video: v })} />
        <Field label="Glass label" value={c.featured.glassLabel} onChange={(v) => up("featured", { ...c.featured, glassLabel: v })} />
        <Area label="Glass text" value={c.featured.glassText} onChange={(v) => up("featured", { ...c.featured, glassText: v })} />
      </Card>
      <Card title="Philosophy">
        <Field label="Eyebrow" value={c.philosophy.eyebrow} onChange={(v) => up("philosophy", { ...c.philosophy, eyebrow: v })} />
        <Field label="Heading (allows <em>)" value={c.philosophy.heading} onChange={(v) => up("philosophy", { ...c.philosophy, heading: v })} />
        <Field label="Video URL" value={c.philosophy.video} onChange={(v) => up("philosophy", { ...c.philosophy, video: v })} />
        <List label="Paragraphs" items={c.philosophy.paragraphs} onChange={(paragraphs) => up("philosophy", { ...c.philosophy, paragraphs })} blank={""} render={(p, s) => <Area label="Paragraph" value={p} onChange={s} />} />
      </Card>
      <Card title="Delivered">
        <Field label="Eyebrow" value={c.delivered.eyebrow} onChange={(v) => up("delivered", { ...c.delivered, eyebrow: v })} />
        <Field label="Heading (allows <em>)" value={c.delivered.heading} onChange={(v) => up("delivered", { ...c.delivered, heading: v })} />
        <List label="Cards" items={c.delivered.cards} onChange={(cards) => up("delivered", { ...c.delivered, cards })} blank={{ video: "", title: "", body: "" }}
          render={(d, s) => (<>
            <Field label="Video URL" value={d.video} onChange={(v) => s({ ...d, video: v })} />
            <Field label="Title" value={d.title} onChange={(v) => s({ ...d, title: v })} />
            <Area label="Body" value={d.body} onChange={(v) => s({ ...d, body: v })} />
          </>)} />
      </Card>
      </>)}
      {tab === "cta" && (<>
      <Card title="Call to action">
        <Field label="Sub text" value={c.cta.sub} onChange={(v) => up("cta", { ...c.cta, sub: v })} />
        <Field label="Button label" value={c.cta.label} onChange={(v) => up("cta", { ...c.cta, label: v })} />
        <Field label="Button link" value={c.cta.href} onChange={(v) => up("cta", { ...c.cta, href: v })} />
      </Card>
      <Card title="Tab labels">
        <Field label="Content tab" value={c.tabs.contentLabel} onChange={(v) => up("tabs", { ...c.tabs, contentLabel: v })} />
        <Field label="Social tab" value={c.tabs.socialLabel} onChange={(v) => up("tabs", { ...c.tabs, socialLabel: v })} />
        <Field label="Servicing tab" value={c.tabs.servicingLabel} onChange={(v) => up("tabs", { ...c.tabs, servicingLabel: v })} />
      </Card>
      </>)}
    </div>
  );
}

// ---------- ABOUT editor ----------
function AboutEditor({ c, set }: { c: AboutData; set: (c: AboutData) => void }) {
  const up = <K extends keyof AboutData>(k: K, v: AboutData[K]) => set({ ...c, [k]: v });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card title="Page header">
        <Field label="Eyebrow" value={c.header.eyebrow} onChange={(v) => up("header", { ...c.header, eyebrow: v })} />
        <Field label="Title" value={c.header.title} onChange={(v) => up("header", { ...c.header, title: v })} />
        <Area label="Subtitle" value={c.header.subtitle} onChange={(v) => up("header", { ...c.header, subtitle: v })} />
      </Card>
      <Card title="Quote split columns">
        <List label="Columns" items={c.quote.columns} onChange={(columns) => up("quote", { columns })} blank={{ heading: "", body: "" }}
          render={(col, s) => (<>
            <Field label="Heading" value={col.heading} onChange={(v) => s({ ...col, heading: v })} />
            <Area label="Body" value={col.body} onChange={(v) => s({ ...col, body: v })} />
          </>)} />
      </Card>
      <Card title="Why us">
        <Field label="Eyebrow" value={c.whyUs.eyebrow} onChange={(v) => up("whyUs", { ...c.whyUs, eyebrow: v })} />
        <Field label="Title" value={c.whyUs.title} onChange={(v) => up("whyUs", { ...c.whyUs, title: v })} />
        <Area label="Body" value={c.whyUs.body} onChange={(v) => up("whyUs", { ...c.whyUs, body: v })} />
      </Card>
    </div>
  );
}

// ---------- CONTACT editor ----------
function ContactEditor({ c, set }: { c: ContactData; set: (c: ContactData) => void }) {
  const up = <K extends keyof ContactData>(k: K, v: ContactData[K]) => set({ ...c, [k]: v });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card title="Page header">
        <Field label="Eyebrow" value={c.header.eyebrow} onChange={(v) => up("header", { ...c.header, eyebrow: v })} />
        <Field label="Title" value={c.header.title} onChange={(v) => up("header", { ...c.header, title: v })} />
        <List label="Subtitle paragraphs" items={c.header.paragraphs} onChange={(paragraphs) => up("header", { ...c.header, paragraphs })} blank={{ text: "", italic: false }}
          render={(p, s) => (<>
            <Area label="Text" value={p.text} onChange={(v) => s({ ...p, text: v })} />
            <Select label="Style" value={p.italic ? "italic" : "normal"} options={["normal", "italic"]} onChange={(v) => s({ ...p, italic: v === "italic" })} />
          </>)} />
      </Card>
      <Card title="Contact form">
        <Field label="Eyebrow" value={c.form.eyebrow} onChange={(v) => up("form", { ...c.form, eyebrow: v })} />
        <Field label="Name label" value={c.form.nameLabel} onChange={(v) => up("form", { ...c.form, nameLabel: v })} />
        <Field label="Email label" value={c.form.emailLabel} onChange={(v) => up("form", { ...c.form, emailLabel: v })} />
        <Field label="Subject label" value={c.form.subjectLabel} onChange={(v) => up("form", { ...c.form, subjectLabel: v })} />
        <Field label="Message label" value={c.form.messageLabel} onChange={(v) => up("form", { ...c.form, messageLabel: v })} />
        <Field label="Message hint" value={c.form.messageHint} onChange={(v) => up("form", { ...c.form, messageHint: v })} />
        <Field label="Submit button" value={c.form.submitLabel} onChange={(v) => up("form", { ...c.form, submitLabel: v })} />
        <Area label="Success message" value={c.form.successMessage} onChange={(v) => up("form", { ...c.form, successMessage: v })} />
      </Card>
      <Card title="Contact info">
        <Field label="Eyebrow" value={c.info.eyebrow} onChange={(v) => up("info", { ...c.info, eyebrow: v })} />
        <Field label="Email" value={c.info.email} onChange={(v) => up("info", { ...c.info, email: v })} />
        <Field label="Working-hours label" value={c.info.hoursLabel} onChange={(v) => up("info", { ...c.info, hoursLabel: v })} />
        <Field label="Working hours" value={c.info.hours} onChange={(v) => up("info", { ...c.info, hours: v })} />
        <Field label="Location label" value={c.info.locationLabel} onChange={(v) => up("info", { ...c.info, locationLabel: v })} />
        <Field label="Location" value={c.info.location} onChange={(v) => up("info", { ...c.info, location: v })} />
        <Area label="Note" value={c.info.note} onChange={(v) => up("info", { ...c.info, note: v })} />
      </Card>
    </div>
  );
}

/* ====================== Live preview (popup modal) ====================== */
function PreviewModal({ src, device, setDevice, refreshKey, onReload, onClose }: {
  src: string; device: Device; setDevice: (d: Device) => void; refreshKey: number; onReload: () => void; onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [w, h] = DEVICE_DIMS[device];
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calc = () => setScale(Math.min(1, (el.clientWidth - 48) / w, (el.clientHeight - 48) / h));
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <div style={S.modalBar}>
          <div style={S.deviceGroup}>
            {([["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]] as [Device, LucideIcon][]).map(([d, Icon]) => (
              <button key={d} onClick={() => setDevice(d)} title={d} style={{ ...S.deviceBtn, ...(device === d ? S.deviceBtnActive : {}) }}>
                <Icon size={16} />
              </button>
            ))}
          </div>
          <span style={{ fontSize: 12, color: "#8a857c", textTransform: "capitalize" }}>{device} · {w}×{h}</span>
          <div style={{ flex: 1 }} />
          <button onClick={onReload} style={S.linkBtn} title="Reload"><RefreshCw size={15} /> Reload</button>
          <button onClick={onClose} style={S.linkBtn} title="Close (Esc)"><X size={15} /> Close</button>
        </div>
        <div ref={ref} style={S.modalStage}>
          <div style={{ width: w * scale, height: h * scale, flexShrink: 0 }}>
            <iframe
              key={`${device}-${refreshKey}`}
              src={src}
              title="Live preview"
              style={{
                width: w, height: h, border: 0, background: "#fff",
                borderRadius: device === "mobile" ? 20 : 8,
                transform: `scale(${scale})`, transformOrigin: "top left",
                boxShadow: "0 10px 50px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====================== Reusable primitives ====================== */
function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section style={S.card}>
      <h2 style={S.cardTitle}>{title}</h2>
      {hint ? <p style={S.cardHint}>{hint}</p> : null}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </section>
  );
}
function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label style={S.fieldWrap}>
      <span style={S.label}>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} style={S.input} />
    </label>
  );
}
function Area({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label style={S.fieldWrap}>
      <span style={S.label}>{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} style={{ ...S.input, minHeight: 90, resize: "vertical" }} />
    </label>
  );
}
function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label style={S.fieldWrap}>
      <span style={S.label}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={S.input}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const preview = value.startsWith("/") || value.startsWith("http") ? value : value ? `https://images.unsplash.com/${value}?w=120&q=70` : "";
  async function upload(file: File) {
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setBusy(false);
    if (res.ok) { onChange((await res.json()).url); }
    else { const d = await res.json().catch(() => ({})); alert(d.error || "Upload failed"); }
  }
  return (
    <div style={S.fieldWrap}>
      <span style={S.label}>{label}</span>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {preview
          ? <img src={preview} alt="" style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8, border: "1px solid #3a3833" }} />
          : <div style={{ width: 56, height: 56, borderRadius: 8, background: "#0f0e0c", border: "1px dashed #3a3833" }} />}
        <label style={{ ...S.smallBtn, cursor: "pointer" }}>
          {busy ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
      </div>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="…or paste image URL" style={{ ...S.input, marginTop: 8 }} />
    </div>
  );
}
const COLOR_PRESETS = ["#c0392b", "#e74c3c", "#e67e22", "#f1c40f", "#27ae60", "#16a085", "#2980b9", "#8e44ad", "#2c3e50", "#000000", "#ffffff"];
const GRADIENT_PRESETS = [
  "linear-gradient(135deg, #c0392b, #e74c3c)",
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(135deg, #f093fb, #f5576c)",
  "linear-gradient(135deg, #11998e, #38ef7d)",
  "linear-gradient(135deg, #fc4a1a, #f7b733)",
  "linear-gradient(135deg, #1a2980, #26d0ce)",
  "linear-gradient(135deg, #ee9ca7, #ffdde1)",
  "conic-gradient(from 180deg, #f6d365, #fda085, #f6d365)",
];

function StatusToggle({ published, onChange }: { published?: boolean; onChange: (v: boolean) => void }) {
  const isPub = published !== false;
  return (
    <div style={S.fieldWrap}>
      <span style={S.label}>Status</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => onChange(true)} style={{ ...S.statusBtn, ...(isPub ? S.statusPub : {}) }}>● Published</button>
        <button onClick={() => onChange(false)} style={{ ...S.statusBtn, ...(!isPub ? S.statusDraft : {}) }}>● Draft</button>
        <span style={{ fontSize: 12, color: "#8a857c" }}>{isPub ? "Live on the site" : "Hidden from visitors (visible in preview)"}</span>
      </div>
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const isSolid = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());
  return (
    <div style={S.fieldWrap}>
      <span style={S.label}>{label}</span>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 10, border: "1px solid #3a3833", background: value || "#0f0e0c", flexShrink: 0 }} />
        <input type="color" value={isSolid ? value : "#c0392b"} onChange={(e) => onChange(e.target.value)}
          title="Pick a solid color" style={{ width: 42, height: 42, border: "1px solid #3a3833", borderRadius: 8, background: "#0f0e0c", cursor: "pointer", padding: 2 }} />
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="#hex or any CSS gradient" style={{ ...S.input, flex: 1 }} />
      </div>
      <div style={{ marginTop: 8 }}>
        <span style={{ ...S.label, display: "block", marginBottom: 6 }}>Solid presets</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {COLOR_PRESETS.map((c) => (
            <button key={c} onClick={() => onChange(c)} title={c}
              style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #3a3833", background: c, cursor: "pointer" }} />
          ))}
        </div>
        <span style={{ ...S.label, display: "block", margin: "10px 0 6px" }}>Gradient presets</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {GRADIENT_PRESETS.map((g) => (
            <button key={g} onClick={() => onChange(g)} title="gradient"
              style={{ width: 40, height: 26, borderRadius: 6, border: "1px solid #3a3833", background: g, cursor: "pointer" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function List<T>({ label, items, onChange, render, blank }: {
  label: string; items: T[]; onChange: (items: T[]) => void;
  render: (item: T, set: (next: T) => void) => React.ReactNode; blank: T;
}) {
  const setAt = (i: number, next: T) => onChange(items.map((it, j) => (j === i ? next : it)));
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir; if (j < 0 || j >= items.length) return;
    const copy = [...items]; [copy[i], copy[j]] = [copy[j], copy[i]]; onChange(copy);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ ...S.label, fontWeight: 600 }}>{label} ({items.length})</span>
        <button onClick={() => onChange([...items, structuredClone(blank)])} style={S.smallBtn}>+ Add</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item, i) => (
          <div key={i} style={S.listItem}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>{render(item, (next) => setAt(i, next))}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button onClick={() => move(i, -1)} style={S.iconBtn} title="Move up">↑</button>
              <button onClick={() => move(i, 1)} style={S.iconBtn} title="Move down">↓</button>
              <button onClick={() => remove(i)} style={{ ...S.iconBtn, color: "#ff8a8a" }} title="Delete">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CMS_CSS = `
.raji-cms, .raji-cms * { box-sizing: border-box; }
.raji-cms button { transition: background .15s ease, color .15s ease, border-color .15s ease, transform .1s ease, filter .15s ease; }
.raji-cms button:hover { filter: brightness(1.12); }
.raji-cms button:active { transform: translateY(1px); }
.raji-cms input, .raji-cms textarea, .raji-cms select { transition: border-color .15s ease, box-shadow .15s ease; }
.raji-cms input:focus, .raji-cms textarea:focus, .raji-cms select:focus { outline: none; border-color: #e8c37e; box-shadow: 0 0 0 3px rgba(232,195,126,0.15); }
.raji-cms input::placeholder, .raji-cms textarea::placeholder { color: #6b675f; }
.raji-cms ::-webkit-scrollbar { width: 10px; height: 10px; }
.raji-cms ::-webkit-scrollbar-thumb { background: #3a3833; border-radius: 8px; border: 2px solid transparent; background-clip: padding-box; }
.raji-cms ::-webkit-scrollbar-thumb:hover { background: #4a473f; background-clip: padding-box; }
.raji-cms section { animation: cmsFade .2s ease; }
@keyframes cmsFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
`;

const S: Record<string, React.CSSProperties> = {
  shell: { display: "flex", minHeight: "100vh", background: "#0f0e0c", fontFamily: "system-ui, sans-serif", color: "#e8e4dc" },
  sidebar: { width: 244, flexShrink: 0, background: "#171510", borderRight: "1px solid #2c2a26", padding: "20px 14px", position: "sticky", top: 0, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column" },
  brandRow: { display: "flex", alignItems: "center", gap: 11, padding: "0 6px 20px", marginBottom: 8, borderBottom: "1px solid #232019" },
  brandMark: { width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#e8c37e,#caa057)", color: "#1a1815", fontWeight: 800, fontSize: 20, display: "grid", placeItems: "center" },
  brandName: { color: "#fff", fontWeight: 700, fontSize: 15, lineHeight: 1.1 },
  brandSub: { color: "#6b675f", fontSize: 11 },
  groupLabel: { fontSize: 11, color: "#6b675f", textTransform: "uppercase", letterSpacing: 0.7, padding: "0 10px 6px" },
  navItem: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "9px 11px", borderRadius: 9, border: "none", background: "transparent", color: "#cfc9bf", cursor: "pointer", fontSize: 14, marginBottom: 2 },
  navItemActive: { background: "#2a2620", color: "#e8c37e", fontWeight: 600 },
  right: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100vh", overflow: "hidden" },
  topbar: { flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", background: "#1a1815", borderBottom: "1px solid #2c2a26", gap: 12 },
  body: { flex: 1, display: "flex", minHeight: 0 },
  main: { flex: 1, padding: 28, maxWidth: 880, width: "100%", margin: "0 auto", overflowY: "auto", minHeight: 0 },
  mainSplit: { maxWidth: "none", margin: 0, flex: "1 1 420px", minWidth: 360, borderRight: "1px solid #2c2a26" },
  deviceGroup: { display: "flex", gap: 2, padding: 3, background: "#0f0e0c", borderRadius: 9, border: "1px solid #2c2a26" },
  deviceBtn: { display: "grid", placeItems: "center", width: 32, height: 28, borderRadius: 6, border: "none", background: "transparent", color: "#8a857c", cursor: "pointer" },
  deviceBtnActive: { background: "#2a2620", color: "#e8c37e" },
  subTabs: { display: "flex", flexWrap: "wrap", gap: 6, padding: 6, background: "#171510", border: "1px solid #2c2a26", borderRadius: 12, position: "sticky", top: 0, zIndex: 5 },
  subTab: { padding: "8px 14px", borderRadius: 8, border: "none", background: "transparent", color: "#cfc9bf", cursor: "pointer", fontSize: 13, fontWeight: 600 },
  subTabActive: { background: "#2a2620", color: "#e8c37e" },
  modalOverlay: { position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  modal: { width: "min(1100px, 96vw)", height: "min(880px, 92vh)", background: "#15130f", border: "1px solid #2c2a26", borderRadius: 16, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" },
  modalBar: { flexShrink: 0, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid #2c2a26", background: "#1a1815" },
  modalStage: { flex: 1, overflow: "auto", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: 24, minHeight: 0, background: "#0b0a09" },
  card: { background: "#1a1815", border: "1px solid #2c2a26", borderRadius: 14, padding: 24 },
  cardTitle: { margin: "0 0 4px", color: "#fff", fontSize: 17, fontWeight: 650 },
  cardHint: { margin: "0 0 18px", color: "#8a857c", fontSize: 13, lineHeight: 1.5 },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, color: "#9a958c", textTransform: "uppercase", letterSpacing: 0.5 },
  input: { padding: "10px 12px", borderRadius: 8, border: "1px solid #3a3833", background: "#0f0e0c", color: "#fff", fontSize: 14, width: "100%", boxSizing: "border-box", fontFamily: "inherit" },
  saveBtn: { padding: "9px 18px", borderRadius: 8, border: "none", background: "#e8c37e", color: "#1a1815", fontWeight: 600, cursor: "pointer", fontSize: 14 },
  linkBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 8, border: "1px solid #3a3833", background: "transparent", color: "#e8e4dc", cursor: "pointer", fontSize: 14, textDecoration: "none" },
  smallBtn: { padding: "7px 12px", borderRadius: 7, border: "1px solid #3a3833", background: "#0f0e0c", color: "#e8c37e", cursor: "pointer", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 },
  iconBtn: { width: 30, height: 30, borderRadius: 7, border: "1px solid #3a3833", background: "#0f0e0c", color: "#e8e4dc", cursor: "pointer", fontSize: 14 },
  listItem: { display: "flex", gap: 12, padding: 14, borderRadius: 10, background: "#0f0e0c", border: "1px solid #2c2a26" },
  statusBtn: { padding: "7px 14px", borderRadius: 999, border: "1px solid #3a3833", background: "#0f0e0c", color: "#8a857c", cursor: "pointer", fontSize: 13, fontWeight: 600 },
  statusPub: { background: "rgba(46,160,67,0.15)", color: "#5dd97a", borderColor: "rgba(46,160,67,0.5)" },
  statusDraft: { background: "rgba(232,195,126,0.15)", color: "#e8c37e", borderColor: "rgba(232,195,126,0.5)" },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14 },
  statCard: { display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", borderRadius: 14, background: "#1a1815", border: "1px solid #2c2a26", cursor: "pointer" },
  statIcon: { width: 42, height: 42, borderRadius: 11, background: "#241f17", display: "grid", placeItems: "center", flexShrink: 0 },
  sectionHead: { color: "#fff", fontSize: 16, margin: "0 0 12px" },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 },
  manageCard: { display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 14, background: "#1a1815", border: "1px solid #2c2a26", cursor: "pointer" },
  pagePill: { display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 999, border: "1px solid #2c2a26", background: "#1a1815", color: "#cfc9bf", fontSize: 13, textDecoration: "none" },
};
