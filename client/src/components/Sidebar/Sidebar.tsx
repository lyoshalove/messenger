import React from "react";
import { sidebarMenu } from "../../constants/sidebarMenu";
import { ThemeChanger } from "../ThemeChanger/ThemeChanger";
import { Link } from "react-router-dom";
import "./styles.sass";

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
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
