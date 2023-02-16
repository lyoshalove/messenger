import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.sass";
import { IPasswords } from "../../types/password";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD } from "../../graphql/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/userSlice";
import { passwordSchema } from "../../schemas/user";
import { useThemeContext } from "../../hooks/useThemeContext";

export const ChangePassword: React.FC = () => {
  const [theme] = useThemeContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(passwordSchema),
  });
  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(data: IPasswords) {
    await updatePassword({
      variables: {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
    });
    reset();
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/login");
  }

  return (
    <>
      <form
        className="profile__password password"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="password__label">
          <span className="password__label-text">Предыдущий пароль</span>
          <input
            type="password"
            className={
              theme === "dark" ? "password__input dark" : "password__input"
            }
            {...register("oldPassword")}
          />
          {errors.oldPassword?.message && (
            <span className="password__error">
              {errors.oldPassword.message}
            </span>
          )}
        </label>
        <label className="password__label">
          <span className="password__label-text">Новый пароль</span>
          <input
            type="password"
            className={
              theme === "dark" ? "password__input dark" : "password__input"
            }
            {...register("newPassword")}
          />
          {errors.newPassword?.message && (
            <span className="password__error">
              {errors.newPassword.message}
            </span>
          )}
        </label>
        <label className="password__label">
          <span className="password__label-text">Повторите новый пароль</span>
          <input
            type="password"
            className={
              theme === "dark" ? "password__input dark" : "password__input"
            }
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <span className="password__error">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <button className="password__btn btn">Изменить</button>
      </form>
      <button className="btn logout__btn" onClick={logout}>
        Выйти
      </button>
    </>
  );
};