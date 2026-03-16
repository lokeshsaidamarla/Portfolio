import { useEffect, useState } from "react";

const codeLines = [
  { tokens: [{ text: "// 👨‍💻 About Lokesh Sai", type: "comment" }] },
  { tokens: [] },
  {
    tokens: [
      { text: "const ", type: "keyword" },
      { text: "developer", type: "variable" },
      { text: " = {", type: "punctuation" },
    ],
  },
  {
    tokens: [
      { text: "  name", type: "property" },
      { text: ":     ", type: "punctuation" },
      { text: '"Lokesh Sai"', type: "string" },
      { text: ",", type: "punctuation" },
    ],
  },
  {
    tokens: [
      { text: "  role", type: "property" },
      { text: ":     ", type: "punctuation" },
      { text: '"Web Developer"', type: "string" },
      { text: ",", type: "punctuation" },
    ],
  },
  {
    tokens: [
      { text: "  location", type: "property" },
      { text: ": ", type: "punctuation" },
      { text: '"Mangalagiri, IN"', type: "string" },
      { text: ",", type: "punctuation" },
    ],
  },
  {
    tokens: [
      { text: "  skills", type: "property" },
      { text: ":   [", type: "punctuation" },
      { text: '"React"', type: "string" },
      { text: ", ", type: "punctuation" },
      { text: '"Node"', type: "string" },
      { text: ", ", type: "punctuation" },
      { text: '"CSS"', type: "string" },
      { text: "],", type: "punctuation" },
    ],
  },
  {
    tokens: [
      { text: "  coffee", type: "property" },
      { text: ":   ", type: "punctuation" },
      { text: "true", type: "boolean" },
      { text: ",", type: "punctuation" },
    ],
  },
  { tokens: [{ text: "};", type: "punctuation" }] },
  { tokens: [] },
  {
    tokens: [
      { text: "function ", type: "keyword" },
      { text: "hire", type: "function" },
      { text: "(", type: "punctuation" },
      { text: "dev", type: "variable" },
      { text: ") {", type: "punctuation" },
    ],
  },
  {
    tokens: [
      { text: "  if ", type: "keyword" },
      { text: "(", type: "punctuation" },
      { text: "dev", type: "variable" },
      { text: ".", type: "punctuation" },
      { text: "passionate", type: "property" },
      { text: ") {", type: "punctuation" },
    ],
  },
  {
    tokens: [
      { text: "    return ", type: "keyword" },
      { text: '"Let\'s build something"', type: "string" },
      { text: ";", type: "punctuation" },
    ],
  },
  { tokens: [{ text: "  }", type: "punctuation" }] },
  { tokens: [{ text: "}", type: "punctuation" }] },
  { tokens: [] },
  {
    tokens: [
      { text: "hire", type: "function" },
      { text: "(", type: "punctuation" },
      { text: "developer", type: "variable" },
      { text: ");", type: "punctuation" },
    ],
  },
  {
    tokens: [
      { text: '// → "Let\'s build something" ', type: "comment" },
    ],
    cursor: true,
  },
];

const tokenColors = {
  comment:     "text-slate-500 italic",
  keyword:     "text-pink-400",
  variable:    "text-purple-300",
  punctuation: "text-slate-400",
  property:    "text-cyan-300",
  string:      "text-yellow-300",
  boolean:     "text-purple-400",
  function:    "text-green-400",
};

export default function CodeEditor() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= codeLines.length) return;
    const timer = setTimeout(() => {
      setVisibleLines((v) => v + 1);
    }, visibleLines === 0 ? 400 : 120);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div
      className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-white/10"
      style={{
        background: "#0d1117",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.04), 0 32px 64px rgba(0,0,0,0.6), 0 0 60px rgba(130,60,220,0.12)",
        fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)",
        }}
      />

      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-white/5"
        style={{ background: "#161b22" }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" style={{ background: "#ff5f57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>

        {/* File tab */}
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-t text-xs text-white/70 border border-white/10 border-b-0"
          style={{ background: "#0d1117", fontSize: "11px" }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#f97316" }}
          />
          lokesh.js
        </div>

        {/* Language badge */}
        <div
          className="ml-auto text-xs font-bold tracking-widest px-3 py-1 rounded-full"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #db2777)",
            fontSize: "10px",
            letterSpacing: "1px",
          }}
        >
          JS
        </div>
      </div>

      {/* Code body */}
      <div className="flex" style={{ minHeight: "340px" }}>
        {/* Line numbers */}
        <div
          className="select-none text-right border-r border-white/5 py-5"
          style={{
            color: "rgba(255,255,255,0.18)",
            fontSize: "12px",
            lineHeight: "1.85",
            padding: "20px 12px 20px 14px",
            minWidth: "42px",
          }}
        >
          {codeLines.slice(0, visibleLines).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code lines */}
        <div
          className="py-5 px-4 flex-1"
          style={{ fontSize: "13px", lineHeight: "1.85" }}
        >
          {codeLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="flex items-center whitespace-pre">
              {line.tokens.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                line.tokens.map((token, j) => (
                  <span key={j} className={tokenColors[token.type] || "text-white"}>
                    {token.text}
                  </span>
                ))
              )}
              {/* Blinking cursor on last line */}
              {line.cursor && i === visibleLines - 1 && (
                <span
                  className="inline-block w-0.5 h-4 align-middle ml-px"
                  style={{
                    background: "#bd93f9",
                    animation: "blink 1s step-end infinite",
                    verticalAlign: "text-bottom",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center gap-4 px-4 py-1.5 border-t border-white/5 text-xs"
        style={{ background: "#161b22", color: "rgba(255,255,255,0.35)", fontSize: "11px" }}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Ready
        </span>
        <span>JavaScript</span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#f97316" }}
          />
          UTF-8
        </span>
        <span className="ml-auto">
          Ln {visibleLines}, Col 32
        </span>
      </div>

      {/* Blink keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}