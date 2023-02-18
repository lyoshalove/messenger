import React from "react";
import "./styles.sass";
import logo from "../../assets/images/icons/logo.svg";
import logoLight from "../../assets/images/icons/logo-light.svg";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../hooks/useThemeContext";
import { checkUserAvatar } from "../../features/helpers/checkUserAvatar";
import { Burger } from "../ui/Burger/Burger";
import { useUser } from "../../hooks/useUser";

export const Header: React.FC = () => {
  const [theme] = useThemeContext();
  const { currentUser } = useUser();

  return (
    <header className={theme === "light" ? "header" : "header dark"}>
      <div className="header__inner">
        <Link to="/" className="header__logo-link">
          <img
            src={theme === "light" ? logo : logoLight}
            alt=""
            className="header__logo"
          />
        </Link>
        <div className="header__user">
          <div className="header__user-image">
            <img
              src={checkUserAvatar(currentUser.avatar)}
              alt="avatar"
              className="header__user-avatar"
            />
          </div>
          <div className="header__user-info">
            <h3 className="header__user-name">
              {currentUser.firstName} {currentUser.lastName}
            </h3>
            <span className="header__user-email">{currentUser.email}</span>
          </div>
          <Burger />
        </div>
      </div>
    </header>
  );
};
