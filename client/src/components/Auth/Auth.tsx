import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { registration } from "../../api";
import "./styles.sass";

export const Auth: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    await registration(name, surname, email, password).then(({ data }) =>
      localStorage.setItem("token", data.token)
    );
  };

  return (
    <section className="auth">
      <div className="container">
        <div className="auth__inner">
          <div className="auth__header">
            <span className="auth__header-emoji">👋</span>
            <h2 className="auth__header-title">Приветик!</h2>
            <p className="auth__header-description">Общайся в Chatio!</p>
          </div>
          <form className="auth__form" onSubmit={(e) => submitHandler(e)}>
            <label className="auth__form-item">
              <span className="auth__form-description">Имя</span>
              <input
                className="auth__form-input"
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="auth__form-item">
              <span className="auth__form-description">Фамилия</span>
              <input
                className="auth__form-input"
                type="text"
                placeholder="Фамилия"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </label>
            <label className="auth__form-item">
              <span className="auth__form-description">Email</span>
              <input
                className="auth__form-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="auth__form-item">
              <span className="auth__form-description">Пароль</span>
              <input
                className="auth__form-input"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="auth__form-btn btn">Зарегаться</button>
          </form>
          <div className="auth__bottom">
            <span className="auth__bottom-span">
              Уже есть аккаунт?{" "}
              <Link className="auth__bottom-name" to="/login">
                Войти
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
