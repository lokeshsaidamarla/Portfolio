import { useState, useEffect } from "react";
import Bio from "./components/Bio";
import ContactForm from "./components/ContactForm";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Hero from "./components/hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ScrollToTop from "./components/totop";
import Workexp from "./components/Workexp";
import Certificates from "./components/Certificates";
import ShapeGrid from "./components/reactbit/ShapeGrid";

// Returns a different squareSize depending on screen width
const useSquareSize = (mobileSize = 30, desktopSize = 55, breakpoint = 768) => {
  const [squareSize, setSquareSize] = useState(
    window.innerWidth < breakpoint ? mobileSize : desktopSize
  );
  useEffect(() => {
    const handler = () =>
      setSquareSize(window.innerWidth < breakpoint ? mobileSize : desktopSize);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [mobileSize, desktopSize, breakpoint]);
  return squareSize;
};

const App = () => {
  const squareSize = useSquareSize(40, 55); // mobile=40, desktop=55
  return (
    <div
      className="relative min-h-screen overflow-y-auto antialiased"
      style={{ background: "#111111" }}
    >

      {/* ── ShapeGrid: fixed, full viewport, behind everything ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <ShapeGrid
          speed={0.5}
          squareSize={squareSize}
          direction="diagonal"
          borderColor="#f9f6f60e"
          hoverFillColor="#222222"
          shape="square"
          hoverTrailAmount={3}
        />
      </div>

      {/* Orange ambient glow — sits above grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 70% 35% at 50% -5%, rgba(249,115,22,0.07) 0%, transparent 60%)`,
        }}
      />

      {/* All page content — sits above grid + glow */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar />

        <div className="relative w-full">
          <Hero />
        </div>

        <div className="relative flex flex-col items-center p-4 space-y-8 container mx-auto">
          <Bio />
          <Projects />
          <Skills />
          <Workexp />
          <Certificates />
          <Education />
          <ContactForm />
          <Footer />
          <ScrollToTop />
        </div>
      </div>

    </div>
  );
};

export default App;