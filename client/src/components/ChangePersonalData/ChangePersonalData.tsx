import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.sass";
import { IUpdateUser } from "@/types";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ME, UPDATE_USER_INFO } from "@/graphql";
import { userSchema } from "@/schemas";
import { useThemeContext } from "@/hooks";
import { CustomInputWrapper } from "@/components/ui/CustomInputWrapper";
import { avatarExtensions } from "@/features/constants";

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
    resolver: yupResolver(userSchema),
  });
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);
  const fileInputValue = watch("avatar");
  const [getMe] = useLazyQuery(GET_ME, {
    fetchPolicy: "network-only",
  });

  async function onSubmit(data: IUpdateUser) {
    await updateUserInfo({
      variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        file: checkAvatarIsExist(),
      },
      async onCompleted(data) {
        localStorage.setItem("token", data.updateUser.token);
        reset();
        await getMe();
      },
    });
  }

  function checkAvatarIsExist() {
    return fileInputValue && fileInputValue["0"]["name"]
      ? fileInputValue["0"]
      : null;
  }

  function getFileInputText() {
    try {
      if (fileInputValue && fileInputValue["0"]["name"]) {
        const fileName: string = fileInputValue["0"]["name"];
        const fileNameExtension = fileName.split(".")[1].toLowerCase();

        if (avatarExtensions.includes(fileNameExtension)) {
          return fileInputValue["0"]["name"];
        } else {
          return "Неправильный файл для аватара";
        }
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
      <CustomInputWrapper
        labelText="Имя"
        className={theme === "dark" ? "input dark" : "input"}
        {...register("firstName")}
        errorMessage={
          errors.firstName?.message ? errors.firstName?.message : ""
        }
      />
      <CustomInputWrapper
        labelText="Фамилия"
        className={theme === "dark" ? "input dark" : "input"}
        {...register("lastName")}
        errorMessage={errors.lastName?.message ? errors.lastName?.message : ""}
      />
      <CustomInputWrapper
        labelText="Email"
        type="email"
        className={theme === "dark" ? "input dark" : "input"}
        {...register("email")}
        errorMessage={errors.email?.message ? errors.email?.message : ""}
      />
      <CustomInputWrapper
        labelText="Аватар"
        type="file"
        className={
          theme === "dark" ? "input input__file dark" : "input input__file"
        }
        accept={".jpg, .jpeg, .png, .svg, .gif"}
        {...register("avatar")}
        errorMessage={errors.avatar?.message ? errors.avatar?.message : ""}
      >
        <div className="label__upload">{getFileInputText()}</div>
      </CustomInputWrapper>
      <button className="personal__btn btn">Изменить</button>
    </form>
  );
};
