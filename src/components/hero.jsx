import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import resume from "../assets/resume.pdf";

const hoverStyles = `
  @keyframes devDrift {
    0%, 100% { transform: rotate(180deg) translateY(0px); opacity: 1; }
    50% { transform: rotate(180deg) translateY(-18px); opacity: 0.85; }
  }
  @keyframes devPulse {
    0%, 100% { color: #1a1a1a; }
    50% { color: #222222; }
  }
  @keyframes ping {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes scrollLine {
    0% { transform: translateY(-100%); opacity: 0; }
    30%, 70% { opacity: 1; }
    100% { transform: translateY(100%); opacity: 0; }
  }
  @media (max-width: 768px) {
    .scroll-indicator { display: none !important; }
  }
`;

const Hero = () => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const heroRef = useRef(null);
  const navHeight = 72;

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = hoverStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleDownload = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2000);
  };

  const stagger = (i) => ({ delay: 0.15 + i * 0.08 });

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: "relative",
        width: "100%",         // ← was "100vw" (caused horizontal overflow)
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        // ← removed marginLeft: "calc(-50vw + 50%)" (was pushing page wider)
        boxSizing: "border-box",
      }}
    >

      {/* BIG vertical DEV */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(320px, 32vw, 480px)",
            fontWeight: 800,
            color: "#1a1a1a",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            whiteSpace: "nowrap",
            animation:
              "devDrift 8s ease-in-out infinite, devPulse 8s ease-in-out infinite",
          }}
        >
          DEV
        </span>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "clamp(65px, 5vh, 52px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "2px",
            height: "48px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "1px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, transparent, rgba(246, 159, 21, 0.94), transparent)",
              animation: "scrollLine 2s ease-in-out infinite",
            }}
          />
        </div>
        <span
          style={{
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(255, 255, 255, 0.37)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          scroll
        </span>
      </div>

      {/* Navbar spacer */}
      <div style={{ height: `${navHeight}px`, flexShrink: 0 }} />

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingLeft: "clamp(24px, 6vw, 80px)",
          paddingRight: "clamp(24px, 6vw, 80px)",
          paddingBottom: "clamp(60px, 10vh, 120px)",
        }}
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ marginBottom: "24px" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "0.5px solid rgba(255,255,255,0.15)",
              borderRadius: "9999px",
              padding: "6px 14px 6px 10px",
            }}
          >
            <div style={{ position: "relative", width: "8px", height: "8px", flexShrink: 0 }}>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "ping 1.8s ease-out infinite",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 400,
              }}
            >
              Available for work
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <h1
          style={{
            margin: 0,
            marginBottom: "22px",
            fontWeight: 800,
            lineHeight: 0.93,
            letterSpacing: "-0.04em",
            fontSize: "clamp(70.5px, 13vw, 160px)",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(0)}
            style={{ display: "block", color: "#ffffff" }}
          >
            Crafting
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(1)}
            style={{
              display: "block",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.45)",
            }}
          >
             experiences
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(2)}
            style={{ display: "block", color: "#ffffff" }}
          >
            that <span style={{ color: "#f97316" }}>matter.</span>
          </motion.span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(3)}
          style={{
            marginBottom: "36px",
            fontSize: "14px",
            fontWeight: 300,
            letterSpacing: "0.01em",
            color: "rgba(255,255,255,0.3)",
            lineHeight: 1.6,
            maxWidth: "480px",
          }}
        >
          I build fast, accessible web apps with React & Node — turning complex
          problems into clean, intuitive interfaces.
        </motion.p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={resume}
            download="Lokesh_sai_resume.pdf"
            onClick={handleDownload}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "10px",
              padding: "14px 28px",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: "#ffffff",
              color: "#0a0a0a",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <i className={`fa-solid ${isDownloaded ? "fa-circle-check" : "fa-download"}`} />
            <span>{isDownloaded ? "Downloaded!" : "Resume"}</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#bio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              borderRadius: "10px",
              padding: "14px 24px",
              fontSize: "12px",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: "transparent",
              border: "0.5px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            About me ↓
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;