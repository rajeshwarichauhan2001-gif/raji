import MotionSlideCards from "@/components/sections/MotionSlideCards";

export default function Test4Page() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <MotionSlideCards />
      <section style={{ height: "40vh", padding: "80px 25px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}>
          (scroll past — keep going)
        </p>
      </section>
    </main>
  );
}
