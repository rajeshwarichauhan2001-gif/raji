import CardsFan from "@/components/sections/CardsFan";

export default function Test2Page() {
  return (
    <main>
      <CardsFan />
      <section style={{ height: "60vh", padding: "80px 25px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}>
          (scroll past — keep going)
        </p>
      </section>
    </main>
  );
}
