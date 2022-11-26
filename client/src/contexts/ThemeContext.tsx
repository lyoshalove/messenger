import React, { createContext, useState } from "react";
import { TTheme } from "../types/theme";

interface IContext {
  theme: TTheme | string;
  toggleTheme?: () => void;
}

interface IProps {
  children: React.ReactNode;
}

const defaultState: IContext = {
  theme: localStorage.getItem("theme") || "light",
};

export const ThemeContext = createContext<IContext>(defaultState);

export const ThemeProvider: React.FC<IProps> = ({ children }) => {
  const [theme, setTheme] = useState(defaultState.theme);

  const toggleTheme = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
