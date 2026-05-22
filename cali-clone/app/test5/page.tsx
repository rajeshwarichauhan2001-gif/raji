import FilmstripSlider from "@/components/sections/FilmstripSlider";

export default function Test5Page() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <FilmstripSlider />
      <section style={{ height: "30vh", padding: "60px 25px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}>
          (scroll past — keep going)
        </p>
      </section>
    </main>
  );
}
