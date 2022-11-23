import React from "react";
import './styles.sass';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <img src="" alt="" className="header__logo" />
        <div className="header__user">
          <img src="" alt="avatar" className="header__user-avatar" />
          <div className="header__user-info">
            <h3 className="header__user-name">Anya Snus</h3>
            <span className="header__user-email">snus@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}