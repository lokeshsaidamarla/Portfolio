import { createContext, useContext, useState } from "react";

export const themes = [
  {
    name: "Mine",
    colors: ["#7cff67", "#B19EEF", "#5227FF"],
  },
   {
    name: "Dark",
    colors: ["#2b3537", "#0c3d62", "#d2b037"],
  },
  {
    name: "Sky",
    colors: ["#6b8aa7", "#beddfc", "#88bdf1"],
  },
  {
    name: "Sunset",
    colors: ["#FF6B6B", "#FFD93D", "#FF8E53"],
  },
  {
    name: "Barbie",
    colors: ["#F1E9E9", "#982598", "#E491C9"],
  },
  {
    name : "Forest",
    colors : ["#90AB8B", "#5A7863", "#3B4953"]
  }
 
  
];

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTheme = themes[activeIndex];

  return (
    <ThemeContext.Provider value={{ activeIndex, setActiveIndex, activeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);