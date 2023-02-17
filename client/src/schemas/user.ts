import * as yup from "yup";

export const userDataSchema = yup.object({
  firstName: yup.string().trim().nullable(),
  lastName: yup.string().trim().nullable(),
  email: yup.string().email("Поле должно содержать email").trim(),
  avatar: yup
    .object()
    .shape({
      file: yup.mixed().required("A file is required"),
    })
    .nullable(),
});

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

export const authSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "В имени должно быть минимум 2 буквы")
    .trim()
    .required("Имя обязательное поле"),
  lastName: yup
    .string()
    .min(2, "В фамилии должно быть минимум 2 буквы")
    .trim()
    .required("Фамилия обязательное поле"),
  email: yup.string().email("Неправильный email").trim().required(),
  password: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .trim()
    .required("Пароль это обязательное поле"),
});
