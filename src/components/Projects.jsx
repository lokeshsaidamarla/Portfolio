import { MdArrowOutward } from "react-icons/md";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScrollStack, { ScrollStackItem } from "../components/reactbit/ScrollStack";
import Tilt from "react-parallax-tilt";
import ScrollFloat from "./reactbit/ScrollFloat";

const ORANGE = "#f97316";

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="pt-1 px-4" id="projects">

      {/* ── Heading ── */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center text-3xl lg:text-4xl text-white"
        style={{
          fontFamily: "Roboto Flex",
          fontWeight: 600,
          letterSpacing: "0.08em"
        }}
      >
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          PROJECTS
        </ScrollFloat>
      </motion.h2>

      {/* ── MOBILE ── */}
      {isMobile ? (
        <div className="grid grid-cols-1 gap-5 px-2">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-2xl relative shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              style={{
                background: "#1a1a1a",
                border: "1px solid #262626",
              }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="h-[180px] w-full object-cover"
                style={{
                  borderBottom: "1px solid #262626"
                }}
              />

              <div className="p-5 text-center">
                <span
                  className="inline-block text-[10px] tracking-[3px] uppercase font-semibold mb-2 px-2 py-0.5 rounded"
                  style={{ color: ORANGE, background: `${ORANGE}15` }}
                >
                  Project {project.id}
                </span>

                <h3 className="text-lg font-bold text-white mb-2">
                  {project.name}
                </h3>

                <p className="text-sm text-white/50 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: ORANGE }}
                >
                  View on GitHub <MdArrowOutward />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      ) : (
        /* ── DESKTOP ── */
        <ScrollStack
          itemDistance={120}
          itemScale={0.03}
          itemStackDistance={30}
          stackPosition="20%"
          scaleEndPosition="10%"
          baseScale={0.85}
          blurAmount={0.5}
          useWindowScroll={true}
        >
          {PROJECTS.map((project) => (
            <ScrollStackItem
              key={project.id}
              itemClassName="bg-[#1a1a1a] border border-[#262626] flex flex-col justify-between relative overflow-hidden rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:flex-row gap-8 h-full"
              >
                {/* Image */}
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={1200}
                  transitionSpeed={1500}
                  scale={1.03}
                  gyroscope={true}
                  className="w-full lg:w-1/2"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover rounded-xl"
                    style={{ border: "1px solid #262626" }}
                  />
                </Tilt>

                {/* Content */}
                <div className="flex flex-col justify-center gap-4">
                  <span
                    className="text-[10px] tracking-[3px] uppercase font-semibold w-fit px-2 py-0.5 rounded"
                    style={{ color: ORANGE, background: `${ORANGE}18` }}
                  >
                    Project {project.id}
                  </span>

                  <h3 className="text-3xl font-bold tracking-wide text-white">
                    {project.name}
                  </h3>

                  <p className="max-w-xl leading-relaxed text-white/50">
                    {project.description}
                  </p>

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: ORANGE }}
                  >
                    View on GitHub <MdArrowOutward />
                  </a>
                </div>
              </motion.div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      )}

    </section>
  );
};

export default Projects;