import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Send, ArrowLeft, RotateCcw } from "lucide-react";
import { SYSTEM_PROMPT } from "../lib/systemPrompt";

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "Namaste! 🏏 I'm CricBot — your ultimate IPL expert. Ask me anything: team stats, player records, match history — I've got it all. What's on your mind?",
};

const suggestions = [
  "Who has the most IPL titles? 🏆",
  "Tell me about Virat Kohli's records",
  "Which team has the best win rate?",
  "Who is the best death bowler?",
  "Explain the IPL auction system",
];

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "14px 16px" }}>
      <span style={{ fontSize: 13, color: "#475569" }}>CricBot is thinking</span>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#3b82f6",
            animation: "bounce 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (location.state?.question) {
      sendMessage(location.state.question);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

const sendMessage = async (content) => {
  const newMessages = [...messages, { role: "user", content }];
  setMessages(newMessages);
  setInput("");
  setIsLoading(true);
  setError("");

  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...newMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
    }),
  }
);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "API error");
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "Hmm, couldn't catch that. Try again!";

    setMessages([...newMessages, { role: "assistant", content: reply }]);
  } catch (err) {
    console.error(err);
    setError("Bowled out! 😅 Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
    inputRef.current?.focus();
  }
};

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
  };

  const showSuggestions = messages.length === 1;

  return (
    <div style={{ minHeight: "100vh", background: "#060c18", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <header style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 20px",
        background: "rgba(6,12,24,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <button
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", padding: 6, borderRadius: 8, display: "flex", alignItems: "center" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#475569"}
        >
          <ArrowLeft size={18} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, #2563eb, #0891b2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, flexShrink: 0,
          boxShadow: "0 0 12px rgba(37,99,235,0.4)"
        }}>
          🏏
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 14 }}>CricBot</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 5px #22c55e" }} />
            <span style={{ fontSize: 11, color: "#22c55e" }}>IPL Expert · Online</span>
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={() => setMessages([INITIAL_MESSAGE])}
          title="New chat"
          style={{ background: "none", border: "none", color: "#334155", cursor: "pointer", padding: 6, borderRadius: 8, display: "flex", alignItems: "center" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#94a3b8"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#334155"}
        >
          <RotateCcw size={16} />
        </button>
      </header>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", display: "flex", flexDirection: "column", gap: 16, maxWidth: 760, width: "100%", margin: "0 auto" }}>

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              gap: 10,
              animation: "fadeIn 0.25s ease",
            }}
          >
            {/* Bot avatar on left */}
            {msg.role === "assistant" && (
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "linear-gradient(135deg, #1e3a6e, #0e4f6e)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, flexShrink: 0, marginTop: 2,
                border: "1px solid rgba(37,99,235,0.3)"
              }}>
                🏏
              </div>
            )}

            <div
              style={{
                maxWidth: "75%",
                padding: "12px 16px",
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                fontSize: 14,
                lineHeight: 1.65,
                ...(msg.role === "user"
                  ? {
                      background: "linear-gradient(135deg, #2563eb, #0891b2)",
                      color: "#fff",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#cbd5e1",
                    }),
              }}
            >
              {msg.content}
            </div>

            {/* User avatar on right */}
            {msg.role === "user" && (
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, color: "#94a3b8", flexShrink: 0, marginTop: 2,
              }}>
                👤
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div style={{ display: "flex", gap: 10, animation: "fadeIn 0.25s ease" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #1e3a6e, #0e4f6e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, border: "1px solid rgba(37,99,235,0.3)"
            }}>
              🏏
            </div>
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "18px 18px 18px 4px",
            }}>
              <TypingIndicator />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            textAlign: "center", fontSize: 13, color: "#f87171",
            padding: "8px 16px", background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.15)", borderRadius: 12,
          }}>
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div style={{ padding: "0 16px 16px", maxWidth: 760, width: "100%", margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "#1e293b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, textAlign: "center" }}>
            Try asking
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  padding: "7px 14px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 999,
                  color: "#64748b",
                  fontSize: 12,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#e2e8f0";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#64748b";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input bar */}
      <div style={{
        padding: "12px 16px 20px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(6,12,24,0.95)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", maxWidth: 760, margin: "0 auto" }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about IPL..."
            disabled={isLoading}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "13px 18px",
              color: "#f1f5f9",
              fontSize: 14,
              outline: "none",
              transition: "border 0.15s",
            }}
            onFocus={(e) => e.target.style.borderColor = "rgba(37,99,235,0.5)"}
            onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            style={{
              width: 46, height: 46,
              borderRadius: 14,
              background: input.trim() && !isLoading
                ? "linear-gradient(135deg, #2563eb, #0891b2)"
                : "rgba(255,255,255,0.05)",
              border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
              transition: "all 0.15s",
              flexShrink: 0,
              boxShadow: input.trim() && !isLoading ? "0 0 20px rgba(37,99,235,0.4)" : "none",
            }}
          >
            <Send size={17} color={input.trim() && !isLoading ? "#fff" : "#334155"} />
          </button>
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: "#1e293b", marginTop: 10 }}>
          Developed by <span style={{ color: "#334155" }}>Ishant Awasthi</span>
        </p>
      </div>

    </div>
  );
}