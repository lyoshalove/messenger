import React from "react";
import { useThemeContext } from "@/hooks";
import { ChangePassword } from "@/components/ChangePassword";
import { ChangePersonalData } from "@/components/ChangePersonalData";
import "./styles.sass";

export const Profile: React.FC = () => {
  const [theme] = useThemeContext();

  return (
    <section className={theme === "dark" ? "profile dark" : "profile"}>
      <div className="container">
        <div className="profile__inner">
          <h2 className="profile__title">Аккаунт</h2>
          <div className="profile__columns">
            <div className="profile__column">
              <h3 className="profile__column-title">Личные данные</h3>
              <ChangePersonalData />
            </div>
            <div className="profile__column">
              <h3 className="profile__column-title">Пароль</h3>
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
