import ImpactFlip from "@/components/sections/ImpactFlip";

export default function Test3Page() {
  return (
    <main style={{ background: "#08111e" }}>
      <ImpactFlip />
      <section style={{ height: "60vh", padding: "80px 25px", textAlign: "center", color: "#f4ece0", background: "#08111e" }}>
        <p style={{ fontFamily: "var(--font-body)", opacity: 0.7 }}>
          (scroll past — keep going)
        </p>
      </section>
    </main>
  );
}
