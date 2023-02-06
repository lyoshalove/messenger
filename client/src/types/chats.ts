import { IMessage } from "./messages";
import { IUser } from "./users";

export interface IChat {
  id: string;
  users: IUser[];
  messages: [IMessage];
  userFrom?: IUser;
  unreadMessagesCount?: number;
}
