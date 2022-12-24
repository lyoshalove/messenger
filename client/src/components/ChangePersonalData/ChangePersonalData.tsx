import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.sass";
import { IGetMe, IUpdateUser, IUser, userDataSchema } from "../../types/users";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ME, UPDATE_USER_INFO } from "../../graphql/users";
import { useDispatch } from "react-redux";
import { initUser } from "../../store/userSlice";

export const ChangePersonalData: React.FC = () => {
  const dispatch = useDispatch();
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
  const [getMeLazy, { loading: userLoading }] =
    useLazyQuery<Partial<IGetMe>>(GET_ME);
  const [updateUserInfo, { loading }] = useMutation(UPDATE_USER_INFO);
  const onSubmit = async (data: IUpdateUser) => {
    await updateUserInfo({
      variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        avatar: data.avatar,
      },
      onCompleted(data) {
        localStorage.setItem("token", data.updateUser.token);
        getMeLazy({
          onCompleted(data) {
            dispatch(initUser(data.getMe as Partial<IUser>));
          },
        });
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
