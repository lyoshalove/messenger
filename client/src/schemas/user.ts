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
    .min(8, "Должно содержать не менее 8 символов")
    .trim()
    .required("Обязательное поле"),
  newPassword: yup
    .string()
    .min(8, "Должно содержать не менее 8 символов")
    .trim()
    .required("Обязательное поле"),
  confirmPassword: yup
    .string()
    .min(8, "Должно содержать не менее 8 символов")
    .trim()
    .required("Обязательное поле"),
});
