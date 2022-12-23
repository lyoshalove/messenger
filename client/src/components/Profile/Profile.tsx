import React from "react";
import './styles.sass';

export const Profile: React.FC = () => {
  return (
    <section className="profile">
      <div className="container">
        <div className="profile__inner">
          <h2 className="profile__title">Аккаунт</h2>
        </div>
      </div>
    </section>
  );
};