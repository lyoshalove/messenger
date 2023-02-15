import React, { FormEvent, useRef, useState } from "react";
import "./styles.sass";
import sendIcon from "../../../assets/images/icons/air.svg";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../../../graphql/messages";
import { IChat } from "../../../types/chats";
import { useThemeContext } from "../../../hooks/useThemeContext";

interface IProps {
  selectedChat: IChat;
}

export const SendMessageForm: React.FC<IProps> = ({ selectedChat }) => {
  const [message, setMessage] = useState<string>("");
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const [theme] = useThemeContext();

  async function sendMessage(e?: FormEvent) {
    e?.preventDefault();

    if (message.trim().length) {
      await sendMessageMutation({
        variables: {
          chatId: selectedChat?.id,
          message: message.trim(),
        },
      }).finally(() => setMessage(""));
    }
  }

  if (messageInputRef.current) {
    messageInputRef.current.focus();
  }

  return (
    <form className="chats__view-bottom" onSubmit={(e) => sendMessage(e)}>
      <input
        type="text"
        className={
          theme === "dark" ? "chats__view-input dark" : "chats__view-input"
        }
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Напиши сообщение"
        ref={messageInputRef}
      />
      <button
        className="chats__view-btn"
        onClick={() => sendMessage()}
        type="button"
      >
        <img
          src={sendIcon}
          alt="Отправить сообщение"
          className="chats__view-send"
        />
      </button>
    </form>
  );
};
