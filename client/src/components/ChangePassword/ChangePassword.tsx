import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.sass";
import { IPasswords } from "../../types/password";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD } from "../../graphql/users";
import { useNavigate } from "react-router-dom";
import { passwordSchema } from "../../schemas/user";
import { useThemeContext } from "../../hooks/useThemeContext";
import { CustomInputWrapper } from "../ui/CustomInputWrapper/CustomInputWrapper";
import { useUser } from "../../hooks/useUser";

export const ChangePassword: React.FC = () => {
  const [theme] = useThemeContext();
  const { setUser } = useUser();
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
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
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
    setUser && setUser({});
    navigate("/login");
  }

  return (
    <>
      <form
        className="profile__password password"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomInputWrapper
          labelText="Предыдущий пароль"
          className={theme === "dark" ? "input dark" : "input"}
          {...register("oldPassword")}
          errorMessage={
            errors.oldPassword?.message ? errors.oldPassword?.message : ""
          }
        />
        <CustomInputWrapper
          labelText="Новый пароль"
          className={theme === "dark" ? "input dark" : "input"}
          {...register("newPassword")}
          errorMessage={
            errors.newPassword?.message ? errors.newPassword?.message : ""
          }
        />
        <CustomInputWrapper
          labelText="Повторите новый пароль"
          className={theme === "dark" ? "input dark" : "input"}
          {...register("confirmPassword")}
          errorMessage={
            errors.confirmPassword?.message
              ? errors.confirmPassword?.message
              : ""
          }
        />
        <button className="password__btn btn">Изменить</button>
      </form>
      <button className="btn logout__btn" onClick={logout}>
        Выйти
      </button>
    </>
  );
};
