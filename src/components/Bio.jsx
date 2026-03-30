import { useRef } from "react";
import { motion } from "framer-motion";
import ScrollFloat from "./reactbit/ScrollFloat";
import ScrollVelocity from "./reactbit/ScrollVelocity";
import BorderGlow from "./reactbit/BorderGlow";

// ── Fixed hero-matching palette ──────────────────────────────────────────────
const ORANGE      = "#f97316";
const ORANGE_DIM  = "#f9731640";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

const bars = [
  { label: "React", pct: 90 },
  { label: "CSS",   pct: 85 },
  { label: "JS",    pct: 80 },
  { label: "Node",  pct: 60 },
];

const barGrad = { background: `linear-gradient(90deg, ${ORANGE}, #fb923c)` };

// ── Original React Bits default colors ───────────────────────────────────────
const BORDER_GLOW_COLORS  = ["#c084fc", "#f472b6", "#38bdf8"]; // purple, pink, sky
const BORDER_GLOW_COLOR   = "40 80 80";                        // HSL string for outer glow

// ─── Shared card shells ───────────────────────────────────────────────────────
const MobileCard = ({ children, delay = 0, style = {} }) => (
  <motion.div
    {...fadeUp(delay)}
    className="rounded-2xl border border-white/10 relative overflow-hidden transition-all duration-300"
    style={{ background: "rgba(255,255,255,0.03)", ...style }}
    whileHover={{ borderColor: ORANGE_DIM, y: -2 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

// DesktopCard now uses BorderGlow
const DesktopCard = ({ children, delay = 0, style = {}, overflow = false }) => (
  <motion.div {...fadeUp(delay)} style={{ height: "100%", ...style }}>
    <BorderGlow
      edgeSensitivity={10}
      glowColor={BORDER_GLOW_COLOR}
      backgroundColor="#111111"
      borderRadius={16}
      glowRadius={70}
      glowIntensity={1.2}
      coneSpread={30}
      animated={false}
      colors={BORDER_GLOW_COLORS}
      fillOpacity={0.35}
      className={`h-full w-full ${overflow ? "overflow-hidden" : ""}`}
    >
      {children}
    </BorderGlow>
  </motion.div>
);

const Tag = ({ text }) => (
  <p className="text-[10px] tracking-[3px] uppercase font-semibold mb-3" style={{ color: "rgba(255, 255, 255, 0.88)" }}>
    {text}
  </p>
);

const Bio = () => {
  const gridRef = useRef(null);

  return (
    <section className="w-full max-w-5xl pt-10" id="bio">

      {/* ── Heading ── */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-10 text-center text-3xl lg:text-4xl text-white"
        style={{ fontFamily: "Roboto Flex", fontWeight: 600, letterSpacing: "0.08em" }}
      >
        <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
          ABOUT ME
        </ScrollFloat>
      </motion.h2>

      {/* ── MOBILE ── */}
      <div className="flex flex-col gap-3 lg:hidden">

        <MobileCard delay={0}>
          <div className="p-5">
            <Tag text="About Me" />
            <p className="text-sm text-white/55 leading-relaxed">
              Pursuing Computer Science at <span className="text-white font-semibold">KL University</span> (2026). Passionate about building beautiful, functional web experiences that make a real impact.
            </p>
          </div>
        </MobileCard>

        <div className="grid grid-cols-2 gap-3">
          <MobileCard delay={0.1}>
            <div className="p-5">
              <Tag text="Graduation" />
              <p className="font-black leading-none mb-1 text-5xl" style={{ color: ORANGE }}>2026</p>
              <p className="text-xs text-white/40">KL University</p>
            </div>
          </MobileCard>
          <MobileCard delay={0.15}>
            <div className="p-5">
              <Tag text="Projects" />
              <p className="font-black leading-none mb-1 text-5xl" style={{ color: ORANGE }}>15+</p>
              <p className="text-xs text-white/40">Built & shipped</p>
            </div>
          </MobileCard>
        </div>

        <MobileCard delay={0.2}>
          <div className="p-5">
            <Tag text="Proficiency" />
            <div className="flex flex-col gap-3">
              {bars.map((b, i) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="text-[11px] text-white/50 w-10 flex-shrink-0">{b.label}</span>
                  <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full rounded-full"
                      style={barGrad}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MobileCard>

        <div className="grid grid-cols-2 gap-3">
          <MobileCard delay={0.3}>
            <div className="p-5">
              <span className="text-3xl mb-3 block">☕</span>
              <p className="text-sm font-bold text-white mb-1">Fueled by coffee</p>
              <p className="text-xs text-white/40">Best ideas at 2AM.</p>
            </div>
          </MobileCard>
          <MobileCard delay={0.35}>
            <div className="p-5">
              <span className="text-3xl mb-3 block">🎯</span>
              <p className="text-sm font-bold text-white mb-1">Goal</p>
              <p className="text-xs text-white/40">Full-time frontend role.</p>
            </div>
          </MobileCard>
        </div>

        <MobileCard delay={0.4} style={{ overflow: "hidden" }}>
          <div className="pt-5 pb-3 px-5">
            <Tag text="Tech Stack" />
          </div>
          <ScrollVelocity
            texts={[
              `React  ✦  TailwindCSS  ✦  JavaScript  ✦  Framer Motion  ✦  `,
              `Node.js  ✦  Git  ✦  HTML  ✦  CSS  ✦  Vite  ✦  TypeScript  ✦  `,
            ]}
            velocity={60}
            numCopies={4}
            scrollerStyle={{
              fontSize: "1.1rem", fontWeight: 800, letterSpacing: "0.03em",
              color: "rgba(255,255,255,0.9)", paddingTop: "4px", paddingBottom: "4px",
            }}
          />
          <div className="pb-4" />
        </MobileCard>

      </div>

      {/* ── DESKTOP ── */}
      <div
        ref={gridRef}
        className="hidden lg:grid gap-4"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {/* Bio — wide */}
        <DesktopCard delay={0} style={{ gridColumn: "span 2" }}>
          <div className="p-8">
            <Tag text="About Me" />
            <p className="text-base text-white/55 leading-relaxed">
              Pursuing Computer Science at <span className="text-white font-semibold">KL University</span> (2026). Passionate about building beautiful, functional web experiences that make a real impact on users and clients alike.
            </p>
          </div>
        </DesktopCard>

        {/* Graduation */}
        <DesktopCard delay={0.1}>
          <div className="p-8">
            <Tag text="Graduation" />
            <p className="font-black leading-none mb-2" style={{ fontSize: "clamp(48px,5vw,72px)", color: ORANGE }}>2026</p>
            <p className="text-sm text-white/40">Expected · KL University</p>
          </div>
        </DesktopCard>

        {/* Coffee */}
        <DesktopCard delay={0.2}>
          <div className="p-8">
            <span className="text-5xl mb-4 block">☕</span>
            <p className="text-lg font-bold text-white mb-2">Fueled by coffee</p>
            <p className="text-sm text-white/40 leading-relaxed">Best ideas happen at 2AM with a hot cup and good music.</p>
          </div>
        </DesktopCard>

        {/* Proficiency */}
        <DesktopCard delay={0.3}>
          <div className="p-8">
            <Tag text="Proficiency" />
            <div className="flex flex-col gap-4">
              {bars.map((b, i) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="text-xs text-white/50 w-12 flex-shrink-0">{b.label}</span>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full rounded-full"
                      style={barGrad}
                    />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: ORANGE }}>{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </DesktopCard>

        {/* Goal */}
        <DesktopCard delay={0.4}>
          <div className="p-8">
            <span className="text-5xl mb-4 block">🎯</span>
            <p className="text-lg font-bold text-white mb-2">Goal</p>
            <p className="text-sm text-white/40 leading-relaxed">Land a full-time frontend role in a great product company.</p>
          </div>
        </DesktopCard>

        {/* Projects count */}
        <DesktopCard delay={0.5}>
          <div className="p-8">
            <Tag text="Projects Done" />
            <p className="font-black leading-none mb-2" style={{ fontSize: "clamp(48px,5vw,72px)", color: ORANGE }}>15+</p>
            <p className="text-sm text-white/40">Real-world projects built & shipped</p>
          </div>
        </DesktopCard>

        {/* ScrollVelocity — wide */}
        <DesktopCard delay={0.6} style={{ gridColumn: "span 2" }} overflow={true}>
          <div className="pt-8 pb-4 px-8">
            <Tag text="Tech Stack" />
          </div>
          <ScrollVelocity
            texts={[
              `React  ·  TailwindCSS  ·  JavaScript  ·  Framer Motion  ·  `,
              `Node.js  ·  Git  ·  HTML  ·  CSS  ·  Vite  ·  TypeScript  ·  `,
            ]}
            velocity={100}
            numCopies={4}
            scrollerStyle={{
              fontSize: "1.75rem", fontWeight: 800, letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.9)", paddingTop: "6px", paddingBottom: "6px",
            }}
          />
          <div className="pb-6" />
        </DesktopCard>

      </div>
    </section>
  );
};

export default Bio;