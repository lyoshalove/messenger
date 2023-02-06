import { IChat } from "./chats";
import * as yup from "yup";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  online: boolean;
  chats: IChat[];
}

export interface IGetMe {
  getMe: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface IUpdateUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: any;
}

export const userDataSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "Имя должно содержать не менее 2 букв")
    .required("Обязательное поле"),
  lastName: yup
    .string()
    .min(2, "Фамилия должна содержать не менее 2 букв")
    .required("Обязательное поле"),
  email: yup
    .string()
    .email("Поле должно содержать email")
    .required("Обязательное поле"),
  // avatar: yup.string(),
});
