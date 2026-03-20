import { useNavigate } from "react-router-dom";

const topics = [
  "Who won IPL 2024?",
  "Best batsman ever?",
  "CSK vs MI rivalry",
  "Orange Cap holders",
  "RCB's heartbreaks 😢",
];

const stats = [
  { label: "IPL Teams", value: "10" },
  { label: "Seasons", value: "17+" },
  { label: "Records", value: "500+" },
];

const teams = ["MI", "CSK", "RCB", "KKR", "DC", "PBKS", "RR", "SRH", "GT", "LSG"];

const teamColors = {
  MI: "#004BA0",
  CSK: "#F5A800",
  RCB: "#CC0000",
  KKR: "#3A225D",
  DC: "#0078BC",
  PBKS: "#ED1B24",
  RR: "#EA1A85",
  SRH: "#F7A721",
  GT: "#1B2133",
  LSG: "#A0E6FF",
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main
      style={{ background: "#060c18", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", position: "relative", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(30,80,160,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 300, height: 300, background: "radial-gradient(circle, rgba(0,180,200,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 680, textAlign: "center" }}>

        {/* Live badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 999, padding: "6px 16px", marginBottom: 32 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />
          <span style={{ fontSize: 12, color: "#94a3b8", letterSpacing: "0.05em" }}>IPL 2026 SEASON IS LIVE</span>
        </div>

        {/* Heading */}
        <div style={{ fontSize: 80, lineHeight: 1, fontWeight: 800, marginBottom: 12, letterSpacing: "-3px" }}>
          <span style={{ background: "linear-gradient(135deg, #60a5fa, #22d3ee, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Cric
          </span>
          <span style={{ color: "white" }}>Bot</span>
        </div>

        <p style={{ fontSize: 18, color: "#7dd3fc", fontWeight: 500, marginBottom: 10 }}>
          Your ultimate IPL cricket expert
        </p>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
          Ask anything about IPL — teams, players, records, stats, history, controversies. I live and breathe cricket.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 40 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#22d3ee", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#475569", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Team badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 40 }}>
          {teams.map((team) => (
            <div
              key={team}
              style={{
                padding: "5px 14px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: team === "CSK" || team === "SRH" || team === "LSG" ? "#000" : "#fff",
                background: teamColors[team],
                opacity: 0.85,
              }}
            >
              {team}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)", marginBottom: 32 }} />

        {/* Suggested questions */}
        <p style={{ fontSize: 11, color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Try asking</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 40 }}>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => navigate("/chat", { state: { question: topic } })}
              style={{
                padding: "8px 16px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 999,
                color: "#94a3b8",
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.07)";
                e.target.style.color = "#e2e8f0";
                e.target.style.borderColor = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.03)";
                e.target.style.color = "#94a3b8";
                e.target.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/chat")}
          style={{
            padding: "16px 48px",
            background: "linear-gradient(135deg, #2563eb, #0891b2)",
            border: "none",
            borderRadius: 999,
            color: "white",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.02em",
            boxShadow: "0 0 40px rgba(37,99,235,0.35)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.04)";
            e.target.style.boxShadow = "0 0 60px rgba(37,99,235,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 0 40px rgba(37,99,235,0.35)";
          }}
        >
          Start Chatting 🏏
        </button>

        {/* Footer */}
        <p style={{ marginTop: 32, fontSize: 12, color: "#1e293b" }}>
          Developed by <span style={{ color: "#334155", fontWeight: 500 }}>Ishant Awasthi</span> 
        </p>

      </div>
    </main>
  );
}
