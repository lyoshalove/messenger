import React from "react";
import './styles.sass';
import logo from '../../assets/images/icons/logo.svg';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <img src={logo} alt="" className="header__logo" />
        <div className="header__user">
          <Link to="/">
            <img
              src="https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80"
              alt="avatar"
              className="header__user-avatar"
            />
          </Link>
          <div className="header__user-info">
            <h3 className="header__user-name">Anya Snus</h3>
            <span className="header__user-email">snus@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}