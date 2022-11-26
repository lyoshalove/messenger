import React, { useContext, useEffect } from "react";
import { sidebarMenu } from "../../constants/sidebarMenu";
import { ThemeChanger } from "../ThemeChanger/ThemeChanger";
import { Link } from "react-router-dom";
import "./styles.sass";
import { useThemeContext } from "../../hooks/useThemeContext";

export const Sidebar: React.FC = () => {
  const [theme] = useThemeContext();

  return (
    <aside className={theme === "light" ? "sidebar" : "sidebar dark"}>
      <ul className="sidebar__menu">
        {sidebarMenu.map((menuItem) => (
          <li key={menuItem.id} className="sidebar__menu-item">
            <Link to="/" className="sidebar__menu-link">
              <img src={menuItem.icon} alt={menuItem.name} />
            </Link>
          </li>
        ))}
      </ul>
      <ThemeChanger />
    </aside>
  );
};
