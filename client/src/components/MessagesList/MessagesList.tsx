import React from "react";
import { identifyWhoseMessage } from "@/features/helpers";
import { IMessage } from "@/types";
import { CheckRead } from "@/components/ui/CheckRead";
import "./styles.sass";
import { useThemeContext } from "@/hooks";

interface IProps {
  messages: IMessage[];
  currentUserId: string;
}

export const MessagesList: React.FC<IProps> = ({ messages, currentUserId }) => {
  const [theme] = useThemeContext();

  return (
    <div className="chats__view-content">
      {messages.length ? (
        messages.map((message: IMessage) => {
          return (
            <p
              key={message.id}
              className={`chats__view-message ${
                identifyWhoseMessage(currentUserId, message.userFrom.id)
                  ? "chats__view-message_my"
                  : "chats__view-message_other"
              } ${theme === "dark" ? "dark" : ""}`}
              data-read={message.read}
              data-id={message.id}
            >
              {message.message}
              {identifyWhoseMessage(currentUserId, message.userFrom.id) && (
                <CheckRead
                  className="chats__view-message_read"
                  color={message.read ? "#2b84e9" : "#b2b2b2"}
                />
              )}
            </p>
          );
        })
      ) : (
        <p className="chats__view-description">Сообщений пока нет</p>
      )}
    </div>
  );
};
