import * as yup from "yup";

export const userSchema = yup.object({
  firstName: yup.string().trim().nullable(),
  lastName: yup.string().trim().nullable(),
  email: yup.string().email("Поле должно содержать email").trim(),
  avatar: yup
    .object()
    .shape({
      file: yup
        .mixed()
        .test("type", "Файл неверного расширения", (file) => {
          return (file && file[0].type === "image/jpeg") || "image/png";
        }),
    })
    .nullable(),
});
