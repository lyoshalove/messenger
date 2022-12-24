import * as yup from "yup";

export interface IPasswords {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const passwordSchema = yup.object({
  oldPassword: yup
    .string()
    .min(8, "Должно содержать не менее 8 символов")
    .required("Обязательное поле"),
  newPassword: yup
    .string()
    .min(8, "Должно содержать не менее 8 символов")
    .required("Обязательное поле"),
  confirmPassword: yup
    .string()
    .min(8, "Должно содержать не менее 8 символов")
    .required("Обязательное поле"),
});
