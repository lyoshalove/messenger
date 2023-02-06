import React from "react";
import { MainTemplate } from "../../templates/MainTemplate";
import { Profile as ProfileComponent } from '../../components/Profile/Profile';
import './styles.sass';

export const Profile: React.FC = () => {
  return <ProfileComponent />;
};
