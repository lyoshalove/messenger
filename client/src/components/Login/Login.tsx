import { useQuery, useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { LOGIN } from "../../graphql/authAndLogin";
import { GET_ME } from "../../graphql/users";
import { IGetMe, IUser } from "../../types/users";
import "./styles.sass";
import { initUser } from "../../store/userSlice";

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN);
  const { loading: userLoading } = useQuery<Partial<IGetMe>>(GET_ME, {
    onCompleted(data) {
      dispatch(initUser(data.getMe as Partial<IUser>));
      navigate("/");
    },
    fetchPolicy: "network-only",
  });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    await login({
      variables: {
        email,
        password,
      },
    })
    .then(({data}) => {
      localStorage.setItem("token", data.login.token);
      navigate("/");
    })
  };

  return (
    <section className="login">
      <div className="container-mini">
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
                required
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
                minLength={8}
                required
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
