import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.sass";
import { IPasswords, passwordSchema } from "../../types/password";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD } from "../../graphql/users";

export const ChangePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(passwordSchema),
  });
  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD);
  const onSubmit = async (data: IPasswords) => {
    await updatePassword({
      variables: {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
    });
    reset();
  };

  return (
    <form
      className="profile__password password"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="password__label">
        <span className="password__label-text">Предыдущий пароль</span>
        <input
          type="password"
          className="password__input"
          {...register("oldPassword")}
        />
        {errors.oldPassword?.message && (
          <span className="password__error">{errors.oldPassword.message}</span>
        )}
      </div>
      <div className="password__label">
        <span className="password__label-text">Новый пароль</span>
        <input
          type="password"
          className="password__input"
          {...register("newPassword")}
        />
        {errors.newPassword?.message && (
          <span className="password__error">{errors.newPassword.message}</span>
        )}
      </div>
      <div className="password__label">
        <span className="password__label-text">Повторите новый пароль</span>
        <input
          type="password"
          className="password__input"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message && (
          <span className="password__error">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <button className="password__btn btn">Изменить</button>
    </form>
  );
};
