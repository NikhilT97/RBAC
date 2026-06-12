import { useContext, useState } from "react";
import { createContext } from "react";
import React from "react";

const ThemeContext = createContext();

export const ThemeProvider = (children) => {
  const [isDark, setisDark] = useState(false);

  const toggleTheme = () => {
    setisDark((prev) => !prev.isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = useContext(ThemeContext)