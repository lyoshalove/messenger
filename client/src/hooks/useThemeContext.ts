import { useContext } from "react";
import { ThemeContext } from "@/contexts";
import { TTheme } from "@/types";

type ThemeContextResult = [TTheme, () => void];

export const useThemeContext = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return [theme, toggleTheme] as ThemeContextResult;
};
