import * as yup from "yup";

export const passwordSchema = yup.object({
  oldPassword: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .trim()
    .required("Обязательное поле"),
  newPassword: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .trim()
    .required("Обязательное поле"),
  confirmPassword: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .trim()
    .required("Обязательное поле"),
});
