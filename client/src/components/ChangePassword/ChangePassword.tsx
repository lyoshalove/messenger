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
import { CustomInputWrapper } from "../ui/CustomInputWrapper/CustomInputWrapper";

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
