import { IAvatar } from "./avatar";
import { IChat } from "./chats";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: IAvatar | null;
  online: boolean;
  chats: IChat[];
}

export interface IGetMe {
  getMe: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: IAvatar | null;
  };
}

export interface IUpdateUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: any;
}
