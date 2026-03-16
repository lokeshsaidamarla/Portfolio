import { useTheme } from "./ThemeContext";

const ThemeSwitcher = () => {
  const { activeIndex, setActiveIndex, themes } = useTheme();

  return (
    <>
      <style>{`
        .theme-ball {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          position: relative;
          transition:
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.4s ease;
          outline: none;
        }

        .theme-ball:hover {
          transform: scale(1.15) translateY(-2px);
        }

        .theme-ball.active {
          transform: scale(1.1) translateY(-2px);
          animation: glow-pulse 2s ease-in-out infinite;
        }

        /* Ring — spins when active */
        .theme-ball::after {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: rgb(255, 255, 255);
          border-right-color: rgba(255,255,255,0.4);
          border-bottom-color: rgba(255,255,255);
          border-left-color: rgba(255,255,255,0.4);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .theme-ball.active::after {
          opacity: 1;
          animation: spin-ring 1.2s linear infinite;
        }

        @keyframes spin-ring {
          to { transform: rotate(360deg); }
        }

        @keyframes glow-pulse {
          0%, 100% { filter: brightness(1);   }
          50%       { filter: brightness(1.25); }
        }

        /* Click ripple splash */
        .theme-ball .ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          transform: scale(0);
          animation: ripple-out 0.5s ease-out forwards;
          pointer-events: none;
        }

        @keyframes ripple-out {
          to { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <div className="flex items-center gap-3 ml-2 mt-3">
        {themes.map((theme, i) => (
          <div key={theme.name} className="relative group">

            {/* Tooltip */}
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full text-white text-[10px] font-semibold whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(0,0,0,0.7)" }}
            >
              {theme.name}
            </div>

            {/* Ball */}
            <button
              className={`theme-ball ${activeIndex === i ? "active" : ""}`}
              style={{
                background: `conic-gradient(${theme.colors[0]} 0deg 120deg, ${theme.colors[1]} 120deg 240deg, ${theme.colors[2]} 240deg 360deg)`,
                boxShadow: activeIndex === i
                  ? `0 0 18px 4px ${theme.colors[0]}88, 0 0 8px 1px ${theme.colors[2]}66`
                  : `0 2px 8px ${theme.colors[0]}33`,
              }}
              onClick={(e) => {
                const ripple = document.createElement("span");
                ripple.className = "ripple";
                e.currentTarget.appendChild(ripple);
                setTimeout(() => ripple.remove(), 500);
                setActiveIndex(i);
              }}
              aria-label={`Switch to ${theme.name} theme`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ThemeSwitcher;