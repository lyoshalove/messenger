import React from "react";
import "./styles.sass";
import logo from "../../assets/images/icons/logo.svg";
import logoLight from "../../assets/images/icons/logo-light.svg";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { checkUserAvatar } from "../../features/helpers/checkUserAvatar";
import { Burger } from "../ui/Burger/Burger";

export const Header: React.FC = () => {
  const [theme] = useThemeContext();
  const user = useSelector((state: RootState) => state.user.value);

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
              src={checkUserAvatar(user.avatar)}
              alt="avatar"
              className="header__user-avatar"
            />
          </div>
          <div className="header__user-info">
            <h3 className="header__user-name">
              {user.firstName} {user.lastName}
            </h3>
            <span className="header__user-email">{user.email}</span>
          </div>
          <Burger />
        </div>
      </div>
    </header>
  );
};
