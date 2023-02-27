import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER } from "@/graphql";
import "./styles.sass";
import { CustomInput } from "@/components/ui/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "@/schemas";
import { IAuth } from "@/types";

export const Auth: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
    resolver: yupResolver(authSchema),
  });
  const navigate = useNavigate();
  const [registration] = useMutation(REGISTER);
  const [isError, setIsError] = useState<boolean>(false);

  async function onSubmit(data: IAuth) {
    await registration({
      variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    })
      .then(({ data }) => {
        setIsError(false);
        localStorage.setItem("token", data.registration.token);
        navigate("/");
      })
      .catch((error) => setIsError(true));
  }

  return (
    <section className="auth">
      <div className="container-mini">
        <div className="auth__inner">
          <div className="auth__header">
            <span className="auth__header-emoji">👋</span>
            <h2 className="auth__header-title">Приветик!</h2>
            <p className="auth__header-description">Общайся в Chatio!</p>
          </div>
          <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
            <label className="auth__form-item">
              <span className="auth__form-description">Имя</span>
              <CustomInput
                className="auth__form-input"
                placeholder="Имя"
                {...register("firstName")}
              />
              {errors.firstName?.message && (
                <div className="auth__input-error">
                  {errors.firstName.message}
                </div>
              )}
            </label>
            <label className="auth__form-item">
              <span className="auth__form-description">Фамилия</span>
              <CustomInput
                className="auth__form-input"
                placeholder="Фамилия"
                {...register("lastName")}
              />
              {errors.lastName?.message && (
                <div className="auth__input-error">
                  {errors.lastName.message}
                </div>
              )}
            </label>
            <label className="auth__form-item">
              <span className="auth__form-description">Email</span>
              <CustomInput
                className="auth__form-input"
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email?.message && (
                <div className="auth__input-error">{errors.email.message}</div>
              )}
            </label>
            <label className="auth__form-item">
              <span className="auth__form-description">Пароль</span>
              <CustomInput
                className="auth__form-input"
                type="password"
                placeholder="Пароль"
                {...register("password")}
              />
              {errors.password?.message && (
                <div className="auth__input-error">
                  {errors.password.message}
                </div>
              )}
              {isError && (
                <div className="auth__error">Некорректные данные</div>
              )}
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
