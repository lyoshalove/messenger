import React from "react";
import { IChat } from "./chats";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  online: boolean;
  chats: IChat[];
}

export interface IGetMe {
  getMe: {
    id: string;
    firstName: string;
    lastName: string;
  };
}