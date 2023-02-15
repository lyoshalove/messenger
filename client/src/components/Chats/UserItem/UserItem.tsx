import React from "react";
import "./styles.sass";
import { checkUserAvatar } from "../../../features/helpers/checkUserAvatar";
import { sliceText } from "../../../features/helpers/sliceText";
import { IChat } from "../../../types/chats";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface IProps {
  chat: IChat;
  getChat: () => void;
}

export const UserItem: React.FC<IProps> = ({ chat, getChat }) => {
  const currentUser = useSelector((state: RootState) => state.user.value);
  const getUnreadMessagesCount = () => {
    if (currentUser.id && chat.messages) {
      return chat.messages.filter(
        (message) =>
          message.read === false && message.userFrom?.id !== currentUser.id
      ).length;
    }

    return 0;
  };

  return (
    <li key={chat.id} onClick={getChat} className="chats__list-item">
      <div className="chats__list-item_left">
        <div className="chats__list-image">
          <img
            src={checkUserAvatar(chat.userFrom?.avatar)}
            alt={`${chat.userFrom?.firstName} ${chat.userFrom?.lastName}`}
            className="chats__list-avatar"
          />
          {chat.userFrom?.online && <div className="chats__list-online" />}
        </div>
        <div className="chats__list-info">
          <p className="chats__list-name">
            {chat.userFrom?.firstName} {chat.userFrom?.lastName}
          </p>
          {chat.messages?.length > 0 && (
            <p className="chats__list-message">
              {sliceText(chat.messages[chat.messages?.length - 1].message, 50)}
            </p>
          )}
        </div>
      </div>
      <div className="chats__list-item_right">
        {getUnreadMessagesCount() > 0 && (
          <span className="chats__list-count">{getUnreadMessagesCount()}</span>
        )}
      </div>
    </li>
  );
};
