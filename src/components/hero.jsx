import { HERO } from "../constants";
import CodeEditor from "./reactbit/CodeEditor";
import { motion } from "framer-motion";
import resume from "../assets/resume.pdf";
import { useEffect, useRef, useState } from "react";
import VariableProximity from "../components/reactbit/VariableProximity";
import ThemeSwitcher from "../components/reactbit/ThemeSwitcher";
import TypingGreet from "../components/reactbit/TypingGreet";

const Hero = () => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const heroRef = useRef(null);
  const nameContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setShowButton(rect.top < window.innerHeight && rect.bottom > 200);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2000);
  };

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-wrap items-center pl-2 pr-2 md:pl-10 md:pr-2"
    >
      {/* LEFT SECTION */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2"
      >
        <p className="mt-11 p-2 text-3xl tracking-tighter lg:text-4xl">
  <TypingGreet />
</p>

       <p className="mb-2 p-2 text-xl italic text-white/60">
  {HERO.wel}
</p>

        {/* VARIABLE PROXIMITY NAME */}
        <div
          ref={nameContainerRef}
          className="my-1 p-1 text-4xl font-bold md:text-5xl lg:text-[7rem] tracking-tight"
          style={{ position: "relative" }}
        >
          <VariableProximity
            label={HERO.name}
            className="text-white"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={nameContainerRef}
            radius={100}
            falloff="linear"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex items-center flex-wrap gap-4 p-2">
          <p className="text-xl">{HERO.description}</p>
        </div>

        {/* RESUME BUTTON */}
        {showButton && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            href={resume}
            download="Lokesh_sai_resume.pdf"
            onClick={handleDownload}
            className="ml-2 mt-4 mb-2 inline-flex items-center gap-3 px-4 py-2 bg-transparent text-white font-medium rounded-2xl shadow-md border border-stone-50/30"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              cursor: "pointer",
            }}
          >
            <i
              className={`fa-solid ${
                isDownloaded
                  ? "fa-circle-check fa-lg text-green-600 rounded-full"
                  : "fa-download"
              }`}
            ></i>
            <span>{isDownloaded ? "Downloaded!" : "Download Resume"}</span>
          </motion.a>
        )}

        {/* THEME SWITCHER */}
        <div className="ml-2 mt-4 flex items-center gap-3">
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
            Theme
          </span>
          <ThemeSwitcher />
        </div>
      </motion.div>

      {/* RIGHT SECTION — hidden on mobile, visible from md breakpoint */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex md:w-1/2 lg:p-4 mt-2"
      >
        <div className="flex justify-center w-full">
          <CodeEditor />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;