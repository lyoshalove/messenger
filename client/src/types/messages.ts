import { IChat } from "./chats";
import { IUser } from "./users";

export interface IMessage {
  id: string;
  message: string;
  read: boolean;
  chat: IChat;
  userFrom: IUser;
  createdAt: string;
}