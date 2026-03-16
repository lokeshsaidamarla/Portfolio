import { motion } from "framer-motion";
import ScrollFloat from "./reactbit/ScrollFloat";

const EDUCATION = [
  {
    degree: "Secondary Education",
    institution: "S.S. High School",
    duration: "June 2019 – May 2020",
    description:
      "Completed secondary education with a CGPA of 9.8. Studied a broad range of subjects including Mathematics, Science, Social Studies, and Languages.",
    tags: ["Mathematics", "Science", "Social Studies", "Languages"],
  },
  {
    degree: "Intermediate (MPC)",
    institution: "Narayana Junior College",
    duration: "June 2020 – May 2022",
    description:
      "Specialized in Mathematics, Physics, and Chemistry. Achieved a CGPA of 9.1.",
    tags: ["Mathematics", "Physics", "Chemistry"],
  },
  {
    degree: "B.Tech Computer Science",
    institution: "Koneru Lakshmaiah University",
    duration: "June 2022 – May 2026",
    description:
      "Pursuing a B.Tech with focus on web development, programming languages, and database management. Actively participating in hackathons, building web apps using HTML, CSS, JavaScript, and React. Developing an e-commerce platform as senior project.",
    tags: ["Web Dev", "React", "DSA", "DBMS", "Networks"],
  },
];

const ACCENT = [
  { bg: "#EEEDFE", color: "#534AB7" }, // purple  — Secondary
  { bg: "#E1F5EE", color: "#0F6E56" }, // teal    — Intermediate
  { bg: "#FAEEDA", color: "#854F0B" }, // amber   — B.Tech
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Education() {
  return (
    <section className="py-16 px-4 text-white" id="education">
      {/* ── Section heading ── */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center text-3xl lg:text-4xl"
        style={{ fontFamily: "Roboto Flex", fontWeight: 600, letterSpacing: "0.08em" }}
      >
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          EDUCATION
        </ScrollFloat>
      </motion.h2>

      {/* ── Desktop ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="hidden lg:flex flex-col max-w-2xl mx-auto"
      >
        {EDUCATION.map((edu, index) => (
          <motion.div key={index} variants={fadeUp} className="flex gap-4">
            {/* Step indicator + connector */}
            <div className="flex flex-col items-center" style={{ width: 32, flexShrink: 0 }}>
              <div
                className="flex items-center justify-center text-xs font-medium rounded-full flex-shrink-0"
                style={{
                  width: 30,
                  height: 30,
                  background: ACCENT[index].bg,
                  color: ACCENT[index].color,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              {index < EDUCATION.length - 1 && (
                <div
                  className="flex-1 mt-1"
                  style={{ width: 1, minHeight: 28, background: "rgba(255,255,255,0.12)" }}
                />
              )}
            </div>

            {/* Content */}
            <div className={index < EDUCATION.length - 1 ? "pb-8" : "pb-2"}>
              <p
                className="text-xs font-medium tracking-widest uppercase mb-1"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {edu.duration}
              </p>
              <h3 className="text-base font-semibold text-white leading-snug">{edu.degree}</h3>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                {edu.institution}
              </p>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                {edu.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {edu.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-0.5 rounded-full"
                    style={{
                      border: "0.5px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.5)",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Mobile ── */}
      <div className="lg:hidden flex flex-col gap-6 max-w-lg mx-auto">
        {EDUCATION.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center" style={{ width: 30, flexShrink: 0 }}>
              <div
                className="flex items-center justify-center text-xs font-medium rounded-full flex-shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  background: ACCENT[index].bg,
                  color: ACCENT[index].color,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              {index < EDUCATION.length - 1 && (
                <div
                  className="flex-1 mt-1"
                  style={{ width: 1, minHeight: 28, background: "rgba(255,255,255,0.12)" }}
                />
              )}
            </div>

            <div className={index < EDUCATION.length - 1 ? "pb-6" : "pb-2"}>
              <p
                className="text-xs tracking-widest uppercase mb-1"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {edu.duration}
              </p>
              <h3 className="text-sm font-semibold text-white">{edu.degree}</h3>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                {edu.institution}
              </p>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                {edu.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {edu.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      border: "0.5px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}