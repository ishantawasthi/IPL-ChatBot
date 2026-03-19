

import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div className="p-4 border-t border-blue-900/30 bg-[#070d1a]">
      <div className="flex gap-3 items-center max-w-3xl mx-auto">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything about IPL..."
          disabled={disabled}
          className="flex-1 bg-blue-950/40 border border-blue-800/40 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 transition-all disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="p-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl text-white hover:opacity-90 hover:scale-105 transition-all duration-150 disabled:opacity-40 disabled:scale-100 shadow-lg shadow-blue-900/40"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}