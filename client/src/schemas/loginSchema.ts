import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Неправильный email")
    .required("Email это обязательное поле"),
  password: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .required("Пароль это обязательное поле"),
});