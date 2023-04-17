import { TTheme } from "@/types";

export const changeBodyTheme = (theme: TTheme) => {
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};
