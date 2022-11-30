import * as yup from "yup";

export const authSchema = yup.object().shape({
  firstName: yup.string().required("Имя обязательное поле"),
  lastName: yup.string().required("Фамилия обязательное поле"),
  email: yup.string().email("Неправильный email").required(),
  password: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .required("Пароль это обязательное поле"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Неправильный email").required("Email это обязательное поле"),
  password: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .required("Пароль это обязательное поле"),
});
