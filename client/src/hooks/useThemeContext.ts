import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useThemeContext = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return [theme, toggleTheme];
};
