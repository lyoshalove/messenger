import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "@/contexts";
import { useScrollbar, useThemeContext } from "@/hooks";
import "./styles.sass";

export const Burger: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [theme] = useThemeContext();
  const [toggleScrollbar] = useScrollbar();
  const { toggleTheme } = useContext(ThemeContext);

  function getClasses(defaultClass: string): string {
    let result = defaultClass;

    if (isActive) result += " active";
    if (theme === "dark") result += " dark";

    return result;
  }

  function changeIsActiveBurger() {
    setIsActive((prev) => !prev);
    toggleScrollbar();
  }

  function changeThemeAndCloseMenu() {
    changeIsActiveBurger();
    if (toggleTheme) {
      setTimeout(() => toggleTheme(), 500);
    }
  }

  return (
    <>
      <div className={getClasses("burger")} onClick={changeIsActiveBurger}>
        <div className="burger__line" />
        <div className="burger__line" />
        <div className="burger__line" />
      </div>
      <ul className={getClasses("burger__menu")}>
        <li className="burger__menu-item" onClick={changeIsActiveBurger}>
          <Link to="/profile" className="burger__menu-link">
            Профиль
          </Link>
        </li>
        <li className="burger__menu-item" onClick={changeIsActiveBurger}>
          <Link to="/" className="burger__menu-link">
            Сообщения
          </Link>
        </li>
        <li className="burger__menu-item" onClick={changeThemeAndCloseMenu}>
          <span className="burger__menu-link">Поменять тему</span>
        </li>
      </ul>
    </>
  );
};
