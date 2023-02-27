import React from "react";
import { useThemeContext } from "@/hooks";
import './styles.sass';

export const Loader: React.FC = () => {
  const [theme] = useThemeContext();

  return (
    <div
      className={theme === "dark" ? "loader__wrapper dark" : "loader__wrapper"}
    >
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};