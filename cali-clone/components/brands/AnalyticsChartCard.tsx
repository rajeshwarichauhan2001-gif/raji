import type { AnalyticsCard } from "@/lib/brand";

// A self-contained, code-drawn analytics card rendered entirely in the brand
// color. Chart elements use light (white) tones so it reads cleanly on any
// solid color OR gradient passed as `brandColor`.
const W = 320;
const H = 150;
const PAD = { l: 6, r: 6, t: 8, b: 6 };

function linePath(pts: number[]) {
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const span = max - min || 1;
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  return pts.map((v, i) => {
    const x = PAD.l + (innerW * i) / (pts.length - 1);
    const y = PAD.t + innerH - ((v - min) / span) * innerH;
    return { x, y };
  });
}

export default function AnalyticsChartCard({ card, brandColor }: { card: AnalyticsCard; brandColor: string }) {
  const pts = card.points?.length ? card.points : [1, 2, 3];
  const coords = linePath(pts);
  const lineD = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const areaD = `${lineD} L${coords[coords.length - 1].x.toFixed(1)},${H - PAD.b} L${coords[0].x.toFixed(1)},${H - PAD.b} Z`;
  const max = Math.max(...pts) || 1;

  return (
    <div style={{ position: "absolute", inset: 0, background: brandColor, color: "#fff", display: "flex", flexDirection: "column", padding: "16px 18px", boxSizing: "border-box", fontFamily: "var(--font-dm-sans, system-ui), sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>{card.label}</div>
          <div style={{ fontSize: 11, opacity: 0.78, marginTop: 4 }}>{card.dateRange}</div>
        </div>
        <span style={{ flexShrink: 0, fontSize: 13, fontWeight: 700, color: "#1a1008", background: "rgba(255,255,255,0.92)", padding: "3px 10px", borderRadius: 999 }}>{card.stat}</span>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: 0, marginTop: 10 }}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          {[0.25, 0.5, 0.75, 1].map((g) => (
            <line key={g} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + (H - PAD.t - PAD.b) * g} y2={PAD.t + (H - PAD.t - PAD.b) * g} stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
          ))}
          {card.chartType === "bar" ? (
            pts.map((v, i) => {
              const innerW = W - PAD.l - PAD.r;
              const innerH = H - PAD.t - PAD.b;
              const bw = (innerW / pts.length) * 0.6;
              const x = PAD.l + (innerW * i) / pts.length + (innerW / pts.length - bw) / 2;
              const bh = (v / max) * innerH;
              return <rect key={i} x={x} y={PAD.t + innerH - bh} width={bw} height={bh} rx={2} fill="rgba(255,255,255,0.9)" />;
            })
          ) : (
            <>
              <path d={areaD} fill="rgba(255,255,255,0.16)" />
              <path d={lineD} fill="none" stroke="#fff" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
              {coords.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r={2.6} fill="#fff" />)}
            </>
          )}
        </svg>
      </div>

      {/* Footer metrics */}
      <div style={{ display: "flex", gap: 18, marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 12 }}>
        {[card.metricA, card.metricB].map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <span style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(255,255,255,0.18)", flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: 10.5, opacity: 0.8, marginTop: 2, whiteSpace: "nowrap" }}>{m.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
