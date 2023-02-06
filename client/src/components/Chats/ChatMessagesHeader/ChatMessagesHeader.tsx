import React from "react";
import { checkUserAvatar } from "../../../features/helpers/checkUserAvatar";
import { IChat } from "../../../types/chats";
import "./styles.sass";
import backIcon from "../../../assets/images/icons/back.svg";

interface IProps {
  selectedChat: IChat;
  setSelectedChat: () => void;
}

export const ChatMessagesHeader: React.FC<IProps> = ({
  selectedChat,
  setSelectedChat,
}) => {
  return (
    <div className="chats__view-top">
      <button className="chats__view-back" onClick={setSelectedChat}>
        <img src={backIcon} alt="Назад" className="chats__view-back_icon" />
        Назад
      </button>
      <span className="chats__view-name">
        {selectedChat.userFrom?.firstName} {selectedChat.userFrom?.lastName}
      </span>
      <img
        src={checkUserAvatar(selectedChat.userFrom?.avatar)}
        alt={`${selectedChat.userFrom?.firstName} ${selectedChat.userFrom?.lastName}`}
        className="chats__view-chat_icon"
      />
    </div>
  );
};
