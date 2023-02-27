import * as yup from "yup";

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
