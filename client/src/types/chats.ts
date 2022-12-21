import { IUser } from "./users";

export interface IChat {
  id: string;
  users: IUser[];
  messages: [];
}