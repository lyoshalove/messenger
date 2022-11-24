import React, { useState } from "react";
import './styles.sass';
import sun from '../../assets/images/icons/sun.svg';
import moon from "../../assets/images/icons/moon.svg";

export const ThemeChanger: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  return (
    <div className="theme__changer">
      <img
        className="theme__changer-icon"
        src={theme === "light" ? moon : sun}
        alt={`${theme} theme`}
      />
    </div>
  );
};