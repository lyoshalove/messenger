import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.sass";
import { IUpdateUser, userDataSchema } from "../../types/users";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_INFO } from "../../graphql/users";

export const ChangePersonalData: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      avatar: undefined,
    },
    resolver: yupResolver(userDataSchema),
  });
  const [updateUserInfo, { loading }] = useMutation(UPDATE_USER_INFO);
  const onSubmit = async (data: IUpdateUser) => {
    await updateUserInfo({
      variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        avatar: data.avatar,
      },
      async onCompleted(data) {
        localStorage.setItem("token", data.updateUser.token);
        reset();
      },
    });
  };

  return (
    <form
      className="profile__personal personal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="personal__label">
        <span className="personal__label-text">Имя</span>
        <input
          type="text"
          className="personal__input"
          {...register("firstName")}
        />
        {errors.firstName?.message && (
          <span className="personal__error">{errors.firstName.message}</span>
        )}
      </div>
      <div className="personal__label">
        <span className="personal__label-text">Фамилия</span>
        <input
          type="text"
          className="personal__input"
          {...register("lastName")}
        />
        {errors.lastName?.message && (
          <span className="personal__error">{errors.lastName.message}</span>
        )}
      </div>
      <div className="personal__label">
        <span className="personal__label-text">Email</span>
        <input
          type="email"
          className="personal__input"
          {...register("email")}
        />
        {errors.email?.message && (
          <span className="personal__error">{errors.email.message}</span>
        )}
      </div>
      <button className="personal__btn btn">Изменить</button>
    </form>
  );
};
