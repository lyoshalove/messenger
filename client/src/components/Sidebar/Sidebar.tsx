import React from "react";
import { sidebarMenu } from "../../constants/sidebarMenu";
import { ThemeChanger } from "../ThemeChanger/ThemeChanger";
import "./styles.sass";

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar__menu">
        {sidebarMenu.map((menuItem) => (
          <li key={menuItem.id} className="sidebar__menu-item">
            <a href="#" className="sidebar__menu-link">
              <img src={menuItem.icon} alt={menuItem.name} />
            </a>
          </li>
        ))}
      </ul>
      <ThemeChanger />
    </aside>
  );
};
