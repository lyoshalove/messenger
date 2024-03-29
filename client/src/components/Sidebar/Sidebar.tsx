import React from "react";
import { sidebarMenu } from "@/features/constants";
import { ThemeChanger } from "@/components/ui/ThemeChanger";
import { Link } from "react-router-dom";
import "./styles.sass";
import { useThemeContext } from "@/hooks";

export const Sidebar: React.FC = () => {
  const [theme] = useThemeContext();

  return (
    <aside className={theme === "light" ? "sidebar" : "sidebar dark"}>
      <ul className="sidebar__menu">
        {sidebarMenu.map((menuItem) => (
          <li key={menuItem.id} className="sidebar__menu-item">
            <Link to={menuItem.path} className="sidebar__menu-link">
              <img
                src={theme === "light" ? menuItem.icon : menuItem.iconLight}
                alt={menuItem.name}
              />
            </Link>
          </li>
        ))}
      </ul>
      <ThemeChanger />
    </aside>
  );
};
