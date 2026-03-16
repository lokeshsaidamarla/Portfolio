import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScrollFloat from "./reactbit/ScrollFloat"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
  viewport: { once: true },
})

const projects = [
  {
  num: "01",
  text: "Online Art Gallery",
  stack: "Python · MongoDB",
  accent: "#7c3aed",
  desc: "A web-based platform for displaying and purchasing digital artwork. Built using Python and MongoDB to manage artwork collections, artist profiles, and user interactions with efficient data retrieval and storage.",
  tags: ["Python", "MongoDB", "Art Gallery", "Database Management"],
},
{
  num: "02",
  text: "E-Commerce Platform",
  stack: "ReactJS · Node.js · Express · MongoDB",
  accent: "#0ea5e9",
  desc: "A modern e-commerce web application developed with ReactJS for the frontend and Node.js with Express for the backend. Features product listings, shopping cart functionality, user authentication, and secure order processing.",
  tags: ["ReactJS", "Node.js", "Express", "MongoDB", "E-commerce"],
},
{
  num: "03",
  text: "Project Management System",
  stack: "Spring Boot · Maven · Hibernate",
  accent: "#f59e0b",
  desc: "A role-based project management web application built with Spring Boot, Maven, and Hibernate. Allows teams to create projects, assign tasks, track progress, and manage workflows with secure role-based access control.",
  tags: ["Spring Boot", "Maven", "Hibernate", "Task Management"],
},
]

// ── Mobile Accordion ──────────────────────────────────────────────────
const MobileCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      {...fadeUp(index * 0.1)}
      className="rounded-2xl border overflow-hidden"
      style={{
        background: "#000",
        borderColor: open ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)",
        transition: "border-color 0.3s",
      }}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", fontWeight: 500 }}>{item.num}</span>
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{item.text}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{item.stack}</p>
          </div>
        </div>
        <span className="text-lg font-light flex-shrink-0 ml-3"
          style={{ color: open ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)" }}>
          {open ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-sm leading-relaxed pt-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-md"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Custom Folder ─────────────────────────────────────────────────────
const ControlledFolder = ({ isOpen, onToggle }) => {
  const [hovered, setHovered] = useState(false)

  const getPaperStyle = (index) => {
    const sizes = [
      { width: "70%", height: "80%" },
      { width: "80%", height: "70%" },
      { width: "90%", height: "60%" },
    ]
    const paperColors = ["#fde68a", "#fef3c7", "#fffbeb"]
    const peekTransforms = [
      "translate(-120%, -70%) rotate(-15deg)",
      "translate(10%, -70%) rotate(15deg)",
      "translate(-50%, -100%) rotate(5deg)",
    ]
    return {
      position: "absolute",
      borderRadius: "10px",
      bottom: "10%",
      left: "50%",
      transition: "all 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)",
      zIndex: 20,
      ...sizes[index],
      backgroundColor: paperColors[index],
      transform: hovered && !isOpen ? peekTransforms[index] : "translate(-50%, 10%)",
      opacity: isOpen ? 0 : 1,
    }
  }

  const flapStyle = (skew) => ({
    position: "absolute",
    zIndex: 30,
    width: "100%",
    height: "100%",
    backgroundColor: "#f59e0b",
    borderRadius: "5px 10px 10px 10px",
    transformOrigin: "bottom center",
    transition: "transform 0.3s ease",
    transform: hovered || isOpen ? `skew(${skew}deg) scaleY(0.6)` : "none",
  })

  // Outer div reserves the visual space of the scaled folder (100px * 2 = 200px wide, 80px * 2 = 160px tall)
  return (
    <div
      style={{ width: "200px", height: "160px", cursor: "pointer", position: "relative", marginBottom: "20px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
    >
      {/* Inner scaled folder, centered inside the reserved space */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%) scale(2)",
        transformOrigin: "top center",
      }}>
        <div style={{ position: "relative", width: "100px", height: "80px" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "80px", backgroundColor: "#b45309", borderRadius: "0 10px 10px 10px" }} />
          <span style={{ position: "absolute", zIndex: 0, bottom: "98%", left: 0, width: "30px", height: "10px", backgroundColor: "#b45309", borderRadius: "5px 5px 0 0" }} />
          {[2, 1, 0].map(i => (
            <div key={i} style={getPaperStyle(i)} />
          ))}
          <div style={flapStyle(15)} />
          <div style={flapStyle(-15)} />
        </div>
      </div>
    </div>
  )
}

// ── Desktop: Folder + Fly-out Cards ──────────────────────────────────
const DesktopFolder = () => {
  const [open, setOpen] = useState(false)

  // Auto-close only when scrolling DOWN into certifications
  useEffect(() => {
    if (!open) return
    const next = document.getElementById("certifications")
    if (!next) return
    let lastScrollY = window.scrollY
    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrollingDown = window.scrollY > lastScrollY
        lastScrollY = window.scrollY
        if (entry.isIntersecting && scrollingDown) setOpen(false)
      },
      { threshold: 0.01 }
    )
    observer.observe(next)
    return () => observer.disconnect()
  }, [open])

  return (
    <motion.div {...fadeUp(0.15)} className="flex flex-col items-center">

      <AnimatePresence>
        {open && (
          <motion.div
            key="cards"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ width: "100%", overflow: "hidden" }}
          >
            <div style={{ display: "flex", gap: "1rem", width: "100%", paddingBottom: "2.5rem" }}>
              {projects.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.9 }}
                  transition={{ duration: 0.45, delay: i * 0.09, ease: [0.34, 1.3, 0.64, 1] }}
                  style={{
                    flex: 1,
                    background: "#000",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderTop: `3px solid ${p.accent}`,
                    borderRadius: "16px",
                    padding: "1.5rem",
                  }}
                >
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.2)" }}>{p.num}</p>
                  <p className="font-bold mb-1 leading-snug" style={{ color: "rgba(255,255,255,0.92)", fontSize: "1rem", fontFamily: "Roboto Flex" }}>{p.text}</p>
                  <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.28)" }}>{p.stack}</p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.48)" }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-3" style={{ paddingTop: "80px" }}>
        <ControlledFolder isOpen={open} onToggle={() => setOpen(o => !o)} />

        {/* Hint text — plain indicator, no button */}
        <motion.p
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.08em",
            fontStyle: "italic",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {open ? "scroll down to close" : "↑ click the folder to open"}
        </motion.p>
      </div>

    </motion.div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────
const Workexp = () => {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <section className="pt-20 pb-24" id="work">
      <div className="container mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center text-3xl lg:text-4xl"
          style={{ fontFamily: "Roboto Flex", fontWeight: 600, letterSpacing: "0.08em" }}
        >
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            EXPERIENCE
          </ScrollFloat>
        </motion.h2>

        <motion.p {...fadeUp(0.05)}
          className="text-xs tracking-widest uppercase mb-2 text-center"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}>
          Academic Projects
        </motion.p>

        <motion.p {...fadeUp(0.1)}
          className="text-sm text-center mb-10"
          style={{ color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>
          "Projects built for academic purposes at college hackathons"
        </motion.p>

        {isDesktop ? <DesktopFolder /> : (
          <div className="flex flex-col gap-3">
            {projects.map((item, i) => (
              <MobileCard key={i} item={item} index={i} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default Workexp