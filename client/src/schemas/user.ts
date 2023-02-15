import * as yup from "yup";

export const userDataSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "Имя должно содержать не менее 2 букв")
    .nullable(),
  lastName: yup
    .string()
    .min(2, "Фамилия должна содержать не менее 2 букв")
    .nullable(),
  email: yup.string().email("Поле должно содержать email"),
  // avatar: yup.string().nullable(),
});

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
