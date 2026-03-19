
const questions = [
  "Who has the most IPL titles? 🏆",
  "Tell me about Virat Kohli's IPL records",
  "Which team has the best win rate?",
  "Who is the best death bowler in IPL?",
  "Explain the IPL auction system",
];

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="px-4 pb-4">
      <p className="text-slate-500 text-xs mb-3 text-center">Try asking...</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {questions.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="px-3 py-2 bg-blue-950/60 border border-blue-800/40 rounded-xl text-blue-300 text-xs hover:bg-blue-900/60 hover:border-blue-600/60 transition-all duration-150"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}