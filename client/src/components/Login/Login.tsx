import { useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../graphql/authAndLogin";
import { GET_ME } from "../../graphql/users";
import { IGetMe, IUser } from "../../types/users";
import "./styles.sass";
import { initUser } from "../../store/userSlice";
import { CustomInput } from "../ui/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { ILogin } from "../../types/authAndLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/user";

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN);
  const [isError, setIsError] = useState<boolean>(false);
  const { loading: userLoading } = useQuery<Partial<IGetMe>>(GET_ME, {
    onCompleted(data) {
      dispatch(initUser(data.getMe as Partial<IUser>));
      navigate("/");
    },
    fetchPolicy: "network-only",
  });

  async function onSubmit(data: ILogin) {
    await login({
      variables: {
        email: data.email,
        password: data.password,
      },
    })
      .then(({ data }) => {
        setIsError(false);
        localStorage.setItem("token", data.login.token);
        navigate("/");
      })
      .catch((error) => setIsError(true));
  }

  return (
    <section className="login">
      <div className="container-mini">
        <div className="login__inner">
          <div className="login__header">
            <span className="login__header-emoji">👋</span>
            <h2 className="login__header-title">Рад тебя видеть снова!</h2>
            <p className="login__header-description">Общайся в Chatio!</p>
          </div>
          <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <label className="login__form-item">
              <span className="login__form-description">Email</span>
              <CustomInput
                className="login__form-input"
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email?.message && (
                <div className="login__input-error">{errors.email.message}</div>
              )}
            </label>
            <label className="login__form-item">
              <span className="login__form-description">Пароль</span>
              <CustomInput
                className="login__form-input"
                type="password"
                placeholder="Пароль"
                {...register("password")}
              />
              {errors.password?.message && (
                <div className="login__input-error">
                  {errors.password.message}
                </div>
              )}
              {isError && (
                <div className="login__error">
                  Неправильный email или пароль
                </div>
              )}
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
