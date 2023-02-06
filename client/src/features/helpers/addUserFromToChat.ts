import { IChat } from "../../types/chats";

export const addUserFromToChat = (
  chats: IChat[],
  currentUserId: string
) => {
  const chatsCopy = JSON.parse(JSON.stringify(chats));

  chatsCopy.forEach((chat: Partial<IChat>) => {
    if (chat.users?.length === 1) {
      chat.userFrom = chat.users[0];
      return;
    }

    const userFrom = chat.users?.filter((user) => user.id !== currentUserId)[0];
    chat.userFrom = userFrom;
  });

  return chatsCopy;
};
