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
import Aurora from "./components/reactbit/Aurora";
import Ribbons from "./components/reactbit/Ribbons";
import { ThemeProvider, useTheme } from "./components/reactbit/ThemeContext";

// Inner app reads the theme
const AppInner = () => {
  const { activeTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-y-auto antialiased">

      {/* Aurora Background — colors update with theme */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={activeTheme.colors}
          amplitude={1.0}
          blend={0.5}
          speed={1}
        />
      </div>

      {/* Global Ribbon Cursor Effect */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        <Ribbons
          colors={["#ffe627"]}
          baseThickness={31}
          speedMultiplier={0.5}
          maxAge={500}
          enableFade={false}
          enableShaderEffect={false}
          backgroundColor={[0, 0, 0, 0]}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center p-4 space-y-8 container mx-auto">
        <Hero />
        <Navbar />
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
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
};

export default App;