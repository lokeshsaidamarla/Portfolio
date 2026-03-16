import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LogoLoop from "./reactbit/LogoLoop"
import ScrollFloat from "./reactbit/ScrollFloat"

import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiGithub,
  SiPython,
} from "react-icons/si"

const techLogos = [
  { node: <SiReact />,       title: "React" },
  { node: <SiNextdotjs />,   title: "Next.js" },
  { node: <SiJavascript />,  title: "JavaScript" },
  { node: <SiTypescript />,  title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiNodedotjs />,   title: "Node.js" },
  { node: <SiMongodb />,     title: "MongoDB" },
  { node: <SiGithub />,      title: "GitHub" },
  { node: <SiPython />,      title: "Python" },
]

const Skills = () => {
  const [tooltip, setTooltip] = useState({ visible: false, name: "", x: 0, y: 0 })

  const renderItem = useCallback((item) => (
    <span
      className="inline-flex items-center justify-center"
      onMouseEnter={() => setTooltip(t => ({ ...t, visible: true, name: item.title }))}
      onMouseLeave={() => setTooltip(t => ({ ...t, visible: false }))}
      onMouseMove={(e) => setTooltip(t => ({ ...t, x: e.clientX, y: e.clientY }))}
    >
      {item.node}
    </span>
  ), [])

  return (
    <div className="container mx-auto px-6" id="skills">

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center text-3xl lg:text-4xl"
        style={{ fontFamily: "Roboto Flex", fontWeight: 600, letterSpacing: "0.08em" }}
      >
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          SKILLS
        </ScrollFloat>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative rounded-3xl py-5 overflow-hidden w-full"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <LogoLoop
          logos={techLogos}
          speed={210}
          direction="left"
          logoHeight={80}
          gap={80}
          pauseOnHover
          scaleOnHover
          renderItem={renderItem}
        />
      </motion.div>

      {/* Cursor-following tooltip — fixed so nothing clips it */}
      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            key="skill-tooltip"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed z-[9999] pointer-events-none"
            style={{
              left: tooltip.x + 16,
              top: tooltip.y - 12,
            }}
          >
            <div
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white whitespace-nowrap"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              {tooltip.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Skills