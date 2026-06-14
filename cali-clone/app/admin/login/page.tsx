"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setErr(d.error || "Login failed");
    }
  }

  return (
    <div style={S.wrap}>
      <form onSubmit={submit} style={S.card}>
        <h1 style={S.title}>Admin Login</h1>
        <p style={S.sub}>Raji website dashboard</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={S.input}
          autoFocus
        />
        {err && <p style={S.err}>{err}</p>}
        <button type="submit" disabled={loading} style={S.btn}>
          {loading ? "..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  wrap: { minHeight: "100vh", display: "grid", placeItems: "center", background: "#0f0e0c", fontFamily: "system-ui, sans-serif" },
  card: { width: 340, padding: 32, background: "#1a1815", borderRadius: 16, border: "1px solid #2c2a26", display: "flex", flexDirection: "column", gap: 14 },
  title: { color: "#fff", fontSize: 24, margin: 0 },
  sub: { color: "#9a958c", fontSize: 13, margin: 0 },
  input: { padding: "12px 14px", borderRadius: 10, border: "1px solid #3a3833", background: "#0f0e0c", color: "#fff", fontSize: 15 },
  btn: { padding: "12px 14px", borderRadius: 10, border: "none", background: "#e8c37e", color: "#1a1815", fontSize: 15, fontWeight: 600, cursor: "pointer" },
  err: { color: "#ff8a8a", fontSize: 13, margin: 0 },
};
