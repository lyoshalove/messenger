import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.sass";
import { IUpdateUser } from "../../types/users";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_INFO } from "../../graphql/users";
import { userDataSchema } from "../../schemas/user";
import { useThemeContext } from "../../hooks/useThemeContext";

export const ChangePersonalData: React.FC = () => {
  const [theme] = useThemeContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      avatar: null,
    },
    resolver: yupResolver(userDataSchema),
  });
  const [updateUserInfo, { loading }] = useMutation(UPDATE_USER_INFO);
  const fileInputValue = watch("avatar");

  async function onSubmit(data: IUpdateUser) {
    await updateUserInfo({
      variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        file: data.avatar["0"],
      },
      async onCompleted(data) {
        localStorage.setItem("token", data.updateUser.token);
        reset();
      },
    });
  }

  function getFileInputText() {
    try {
      if (fileInputValue && fileInputValue["0"]["name"]) {
        return fileInputValue["0"]["name"];
      }

      return "Нажми или перетащи сюда файл";
    } catch (e) {
      return "Нажми или перетащи сюда файл";
    }
  }

  return (
    <form
      className="profile__personal personal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="personal__label">
        <span className="personal__label-text">Имя</span>
        <input
          type="text"
          className={
            theme === "dark" ? "personal__input dark" : "personal__input"
          }
          {...register("firstName")}
        />
        {errors.firstName?.message && (
          <span className="personal__error">{errors.firstName.message}</span>
        )}
      </label>
      <label className="personal__label">
        <span className="personal__label-text">Фамилия</span>
        <input
          type="text"
          className={
            theme === "dark" ? "personal__input dark" : "personal__input"
          }
          {...register("lastName")}
        />
        {errors.lastName?.message && (
          <span className="personal__error">{errors.lastName.message}</span>
        )}
      </label>
      <label className="personal__label">
        <span className="personal__label-text">Email</span>
        <input
          type="email"
          className={
            theme === "dark" ? "personal__input dark" : "personal__input"
          }
          {...register("email")}
        />
        {errors.email?.message && (
          <span className="personal__error">{errors.email.message}</span>
        )}
      </label>
      <label className="personal__label">
        <span className="personal__label-text">Аватар</span>
        <div className="personal__label-upload">{getFileInputText()}</div>
        <input
          type="file"
          className={
            theme === "dark"
              ? "personal__input personal__input-file dark"
              : "personal__input personal__input-file"
          }
          {...register("avatar")}
        />
        {errors.avatar?.message && (
          <span className="personal__error">{errors.avatar.message}</span>
        )}
      </label>
      <button className="personal__btn btn">Изменить</button>
    </form>
  );
};
