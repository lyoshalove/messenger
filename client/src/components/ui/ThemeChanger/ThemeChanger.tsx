import React, { useContext } from "react";
import "./styles.sass";
import sun from "@assets/images/icons/sun.svg";
import moon from "@assets/images/icons/moon.svg";
import { ThemeContext } from "@/contexts";

export const ThemeChanger: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme__changer">
      <img
        className="theme__changer-icon"
        src={theme === "light" ? moon : sun}
        alt={`${theme} theme`}
        onClick={toggleTheme}
      />
    </div>
  );
};
