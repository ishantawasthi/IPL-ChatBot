
import { useEffect, useRef } from "react";

function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center px-4 py-3">
      <span className="text-slate-400 text-xs mr-2">CricBot is thinking</span>
      <div className="typing-dot w-1.5 h-1.5 bg-blue-400 rounded-full" />
      <div className="typing-dot w-1.5 h-1.5 bg-blue-400 rounded-full" />
      <div className="typing-dot w-1.5 h-1.5 bg-blue-400 rounded-full" />
    </div>
  );
}

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto chat-scrollbar px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          {msg.role === "assistant" && (
            <span className="text-xl mr-2 mt-1 flex-shrink-0">🏏</span>
          )}
          <div
            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-sm"
                : "bg-blue-950/60 border border-blue-800/30 text-slate-200 rounded-bl-sm"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <span className="text-xl mr-2">🏏</span>
          <div className="bg-blue-950/60 border border-blue-800/30 rounded-2xl rounded-bl-sm">
            <TypingIndicator />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}