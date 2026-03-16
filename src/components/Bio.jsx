import { useRef } from "react";
import { motion } from "framer-motion";
import ScrollFloat from "./reactbit/ScrollFloat";
import { useTheme } from "./reactbit/ThemeContext";
import ScrollVelocity from "./reactbit/ScrollVelocity";
import { ParticleCard, GlobalSpotlight } from "./reactbit/MagicCard";

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

const Bio = () => {
  const { activeTheme } = useTheme();
  const [c1, c2, c3] = activeTheme.colors;
  const gridRef = useRef(null);

  // Convert hex color to RGB string for MagicCard e.g. "#7cff67" → "124, 255, 103"
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };
  const glowRgb = hexToRgb(c1);

  const gradientText  = { background: `linear-gradient(135deg, ${c1}, ${c2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };
  const gradientText2 = { background: `linear-gradient(135deg, ${c2}, ${c3})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };
  const barGradient   = { background: `linear-gradient(90deg, ${c1}, ${c2})` };
  const hoverBorder   = `${c1}40`;
  const topLine       = { background: `linear-gradient(90deg, transparent, ${c1}30, transparent)` };

  // ── Mobile card (no magic effects) ──
  const MobileCard = ({ children, delay = 0, style = {} }) => (
    <motion.div
      {...fadeUp(delay)}
      className="rounded-2xl border border-white/15 relative overflow-hidden transition-all duration-300"
      style={{ background: "rgba(255,255,255,0.04)", ...style }}
      whileHover={{ borderColor: hoverBorder, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={topLine} />
      {children}
    </motion.div>
  );

  // ── Desktop card (with MagicCard tilt + particles + click) ──
  const DesktopCard = ({ children, delay = 0, style = {} }) => (
    <motion.div {...fadeUp(delay)} style={style}>
      <ParticleCard
        glowColor={glowRgb}
        particleCount={7}
        enableTilt={true}
        clickEffect={true}
        className="rounded-2xl border border-white/15 h-full transition-colors duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        {/* top glow line — stays on the shell, participates in tilt */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={topLine} />
        {/* magic-card-content counter-rotates so text stays flat */}
        <div className="magic-card-content h-full" style={{ borderRadius: "inherit" }}>
          {children}
        </div>
      </ParticleCard>
    </motion.div>
  );

  const Tag = ({ text }) => (
    <p className="text-[10px] tracking-[3px] uppercase font-semibold mb-3" style={{ color: `${c1}90` }}>{text}</p>
  );

  return (
    <section className="w-full max-w-5xl pt-10" id="bio">

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-10 text-center text-3xl lg:text-4xl"
        style={{ fontFamily: "Roboto Flex", fontWeight: 600, letterSpacing: "0.08em" }}
      >
        <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
          ABOUT ME
        </ScrollFloat>
      </motion.h2>

      {/* ── MOBILE (< lg) — plain cards, no magic ── */}
      <div className="flex flex-col gap-3 lg:hidden">

        <MobileCard delay={0}>
          <div className="p-5">
            <Tag text="About Me" />
            <p className="text-sm text-white/60 leading-relaxed">
              Pursuing Computer Science at <span className="text-white font-semibold">KL University</span> (2026). Passionate about building beautiful, functional web experiences that make a real impact.
            </p>
          </div>
        </MobileCard>

        <div className="grid grid-cols-2 gap-3">
          <MobileCard delay={0.1}>
            <div className="p-5">
              <Tag text="Graduation" />
              <p className="font-black leading-none mb-1" style={{ fontSize: "42px", ...gradientText }}>2026</p>
              <p className="text-xs text-white/40">KL University</p>
            </div>
          </MobileCard>
          <MobileCard delay={0.15}>
            <div className="p-5">
              <Tag text="Projects" />
              <p className="font-black leading-none mb-1" style={{ fontSize: "42px", ...gradientText2 }}>15+</p>
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
                  <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${b.pct}%` }} transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }} viewport={{ once: true }} className="h-full rounded-full" style={barGradient} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MobileCard>

        <div className="grid grid-cols-2 gap-3">
          <MobileCard delay={0.3}><div className="p-5"><span className="text-3xl mb-3 block">☕</span><p className="text-sm font-bold mb-1">Fueled by coffee</p><p className="text-xs text-white/40">Best ideas at 2AM.</p></div></MobileCard>
          <MobileCard delay={0.35}><div className="p-5"><span className="text-3xl mb-3 block">🎯</span><p className="text-sm font-bold mb-1">Goal</p><p className="text-xs text-white/40">Full-time frontend role.</p></div></MobileCard>
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
              color: "rgba(255,255,255,0.92)", paddingTop: "4px", paddingBottom: "4px",
            }}
          />
          <div className="pb-4" />
        </MobileCard>

      </div>

      {/* ── DESKTOP (lg+) — MagicCard effects on every card ── */}

      {/* Spotlight follows mouse across all desktop cards */}
      <GlobalSpotlight containerRef={gridRef} glowColor={glowRgb} spotlightRadius={350} />

      <div
        ref={gridRef}
        className="hidden lg:grid gap-4"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >

        {/* Card: Bio — wide */}
        <DesktopCard delay={0} style={{ gridColumn: "span 2" }}>
          <div className="p-8">
            <Tag text="About Me" />
            <p className="text-base text-white/60 leading-relaxed">
              Pursuing Computer Science at <span className="text-white font-semibold">KL University</span> (2026). Passionate about building beautiful, functional web experiences that make a real impact on users and clients alike.
            </p>
          </div>
        </DesktopCard>

        {/* Card: Graduation */}
        <DesktopCard delay={0.1}>
          <div className="p-8">
            <Tag text="Graduation" />
            <p className="font-black leading-none mb-2" style={{ fontSize: "clamp(48px,5vw,72px)", ...gradientText }}>2026</p>
            <p className="text-sm text-white/40">Expected · KL University</p>
          </div>
        </DesktopCard>

        {/* Card: Coffee */}
        <DesktopCard delay={0.2}>
          <div className="p-8">
            <span className="text-5xl mb-4 block">☕</span>
            <p className="text-lg font-bold mb-2">Fueled by coffee</p>
            <p className="text-sm text-white/40 leading-relaxed">Best ideas happen at 2AM with a hot cup and good music.</p>
          </div>
        </DesktopCard>

        {/* Card: Proficiency */}
        <DesktopCard delay={0.3}>
          <div className="p-8">
            <Tag text="Proficiency" />
            <div className="flex flex-col gap-4">
              {bars.map((b, i) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="text-xs text-white/50 w-12 flex-shrink-0">{b.label}</span>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${b.pct}%` }} transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }} viewport={{ once: true }} className="h-full rounded-full" style={barGradient} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: c1 }}>{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </DesktopCard>

        {/* Card: Goal */}
        <DesktopCard delay={0.4}>
          <div className="p-8">
            <span className="text-5xl mb-4 block">🎯</span>
            <p className="text-lg font-bold mb-2">Goal</p>
            <p className="text-sm text-white/40 leading-relaxed">Land a full-time frontend role in a great product company.</p>
          </div>
        </DesktopCard>

        {/* Card: Projects */}
        <DesktopCard delay={0.5}>
          <div className="p-8">
            <Tag text="Projects Done" />
            <p className="font-black leading-none mb-2" style={{ fontSize: "clamp(48px,5vw,72px)", ...gradientText2 }}>15+</p>
            <p className="text-sm text-white/40">Real-world projects built & shipped</p>
          </div>
        </DesktopCard>

        {/* Card: ScrollVelocity — wide */}
        <DesktopCard delay={0.6} style={{ gridColumn: "span 2", overflow: "hidden" }}>
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
              color: "rgba(255,255,255,0.92)", paddingTop: "6px", paddingBottom: "6px",
            }}
          />
          <div className="pb-6" />
        </DesktopCard>

      </div>

    </section>
  );
};

export default Bio;