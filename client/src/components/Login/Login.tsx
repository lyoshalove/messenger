import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api";
import "./styles.sass";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password).then(({ data }) =>
      localStorage.setItem("token", data.token)
    );
  };

  return (
    <section className="login">
      <div className="container">
        <div className="login__inner">
          <div className="login__header">
            <span className="login__header-emoji">👋</span>
            <h2 className="login__header-title">Рад тебя видеть снова!</h2>
            <p className="login__header-description">Общайся в Chatio!</p>
          </div>
          <form className="login__form" onSubmit={(e) => submitHandler(e)}>
            <label className="login__form-item">
              <span className="login__form-description">Email</span>
              <input
                className="login__form-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="login__form-item">
              <span className="login__form-description">Пароль</span>
              <input
                className="login__form-input"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="login__form-btn btn">Войти</button>
          </form>
          <div className="login__bottom">
            <span className="login__bottom-span">
              Ещё нет аккаунта?{" "}
              <Link className="login__bottom-name" to="/authorization">
                Зарегаться
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
