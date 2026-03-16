import { MdArrowOutward } from "react-icons/md";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScrollStack, { ScrollStackItem } from "../components/reactbit/ScrollStack";
import Tilt from "react-parallax-tilt";
import ScrollFloat from './reactbit/ScrollFloat';

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <section className="pt-1 px-4" id="projects">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center text-3xl lg:text-4xl"
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


      {isMobile ? (
        <div className="grid grid-cols-1 gap-6 px-2">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-3xl bg-neutral-900 border border-white/10"
            >
              <img
                src={project.image}
                alt={project.name}
                className="h-[180px] w-full object-cover"
              />

              <div className="p-5 text-center text-white">
                <h3 className="text-lg font-bold">
                  {project.id}. {project.name}
                </h3>

                <p className="text-sm text-neutral-300 mt-2">
                  {project.description}
                </p>

                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-black text-sm hover:bg-gray-300 transition"
                >
                  View on GitHub
                  <MdArrowOutward />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* DESKTOP VIEW (SCROLL STACK) */
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
              itemClassName="bg-neutral-900/80 backdrop-blur-xl border border-white/10 text-white flex flex-col justify-between"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:flex-row gap-8 h-full"
              >
                {/* IMAGE WITH 3D TILT */}
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
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </Tilt>

                {/* PROJECT CONTENT */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-4 tracking-wide">
                    {project.id}. {project.name}
                  </h3>

                  <p className="text-neutral-300 mb-6 max-w-xl">
                    {project.description}
                  </p>

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit rounded-xl bg-white px-5 py-2 text-black flex items-center gap-2 hover:bg-gray-200 transition"
                  >
                    View on GitHub
                    <MdArrowOutward />
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
