import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { addUserFromToChat } from "../../../features/helpers/addUserFromToChat";
import { GET_CHAT_WITH_MESSAGES, GET_MY_CHATS } from "../../../graphql/chats";
import { useScrollbar } from "../../../hooks/useScrollbar";
import { RootState } from "../../../store";
import { IChat } from "../../../types/chats";
import { CreateChatModal } from "../../CreateChatModal/CreateChatModal";
import "./styles.sass";
import createChatIcon from "../../../assets/images/icons/create-chat-icon.svg";
import {
  SUBSCRIBE_MESSAGES_UPDATED,
  SUBSCRIBE_CHAT,
  UPDATE_MESSAGES_READ,
  SUBSCRIBE_MY_CHAT,
} from "../../../graphql/messages";
import { IMessage } from "../../../types/messages";
import { CheckRead } from "../../ui/CheckRead";
import { UserItem } from "../UserItem/UserItem";
import { ChatMessagesHeader } from "../ChatMessagesHeader/ChatMessagesHeader";
import { SendMessageForm } from "../SendMessageForm/SendMessageForm";
import { identifyWhoseMessage } from "../../../features/helpers/identifyWhoseMessage";

export const MyChats: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [chats, setChats] = useState<IChat[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [toggleScrollbar] = useScrollbar();
  const { data: chatsData } = useQuery(GET_MY_CHATS, {
    fetchPolicy: "network-only",
  });
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const [getChatById] = useLazyQuery(GET_CHAT_WITH_MESSAGES, {
    fetchPolicy: "network-only",
  });
  const [updateMessagesRead] = useMutation(UPDATE_MESSAGES_READ);
  const chatContentRef = useRef<NodeListOf<HTMLDivElement> | null>(null);

  function toggleModal() {
    setShowModal((prev) => !prev);
    toggleScrollbar();
  }

  function scrollChatToBottom() {
    const chatWrapper = document.querySelector(".chats__view-content_wrapper");
    const chatContent = document.querySelector(".chats__view-content");

    if (chatWrapper && chatContent) {
      setTimeout(() => {
        chatWrapper.scrollTop =
          chatContent.scrollHeight - chatWrapper.clientHeight;
      }, 1);
    }
  }

  async function getChat(chat: IChat) {
    if (selectedChat?.id === chat.id) return;

    setSelectedChat(chat);
    await getChatById({
      variables: {
        id: chat.id,
      },
    }).then(({ data: { getChatByIdWithMessages } }) => {
      console.log(getChatByIdWithMessages);
      setMessages(getChatByIdWithMessages.messages);
    });
    scrollChatToBottom();
  }

  useEffect(() => {
    if (chatsData && currentUser.id) {
      let dataChats: IChat[] = addUserFromToChat(
        chatsData.getMyChats,
        currentUser.id
      );

      setChats(dataChats);
    }
  }, [chatsData, currentUser]);

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setSelectedChat(null);
      }
    };
    document.addEventListener("keyup", (e) => escapeHandler(e));

    return () => document.removeEventListener("keyup", (e) => escapeHandler(e));
  }, []);

  useEffect(() => {
    chatContentRef.current = document.querySelectorAll(
      ".chats__view-message_other"
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (
          entry.isIntersecting &&
          entry.target.attributes[1].value === "false"
        ) {
          await updateMessagesRead({
            variables: {
              messageIds: [entry.target.attributes[2].value],
              chatId: selectedChat?.id,
            },
          });
        }
      });
    });

    if (chatContentRef.current) {
      chatContentRef.current.forEach((message) => {
        observer.observe(message);
      });
    }

    return () => {
      if (chatContentRef.current) {
        chatContentRef.current.forEach((message) => {
          observer.unobserve(message);
        });
      }
    };
  }, [selectedChat, chatContentRef.current]);

  useSubscription(SUBSCRIBE_CHAT, {
    variables: {
      chatId: selectedChat?.id,
    },
    onData: ({
      data: {
        data: { messageSent },
      },
    }) => {
      if (messageSent.userFrom.id !== currentUser.id) {
        updateMessagesRead({
          variables: {
            messageIds: [messageSent.id],
            chatId: selectedChat?.id,
          },
        });
      }
      setMessages((prev) => [...prev, messageSent]);
      scrollChatToBottom();
    },
  });

  useSubscription(SUBSCRIBE_MESSAGES_UPDATED, {
    variables: {
      chatId: selectedChat?.id,
    },
    onData: ({
      data: {
        data: { messagesUpdated },
      },
    }) => {
      setMessages(
        messages.map((message) => {
          if (messagesUpdated.messageIds.includes(message.id)) {
            return { ...message, read: true };
          }
          return message;
        })
      );
      scrollChatToBottom();
    },
  });

  useSubscription(SUBSCRIBE_MY_CHAT, {
    variables: {
      userId: currentUser.id,
    },
    onData: ({
      data: {
        data: { chatUpdated },
      },
    }) => {
      console.log(chatUpdated);
      const newChats = chats.map((chat) => {
        if (chat.id === chatUpdated.id) {
          return chatUpdated;
        }
        return chat;
      });

      setChats(addUserFromToChat(newChats, currentUser.id!));
    },
  });

  return (
    <>
      {chats.length ? (
        <div className="chats">
          <div className="chats__item chats__left">
            <div className="chats__left-top">
              <input
                className="chats__filter"
                type="text"
                placeholder="Поиск"
              />
              <button className="chats__left-btn">
                <img
                  src={createChatIcon}
                  alt="создать чат"
                  className="chats__left-icon"
                  onClick={toggleModal}
                  title="Создать чат"
                />
              </button>
            </div>
            <ul className="chats__list">
              {chats.map((chat) => {
                return (
                  <UserItem
                    key={chat.id}
                    chat={chat}
                    getChat={() => getChat(chat)}
                  />
                );
              })}
            </ul>
          </div>
          <div
            className={`chats__view chats__item chats__right ${
              !selectedChat?.id && "center"
            }`}
          >
            {selectedChat?.id ? (
              <>
                <ChatMessagesHeader
                  selectedChat={selectedChat}
                  setSelectedChat={() => setSelectedChat(null)}
                />
                <div className="chats__view-content_wrapper">
                  <div className="chats__view-content">
                    {messages.length ? (
                      messages.map((message: IMessage) => {
                        return (
                          <p
                            key={message.id}
                            className={`chats__view-message ${
                              identifyWhoseMessage(
                                currentUser.id!,
                                message.userFrom.id
                              )
                                ? "chats__view-message_my"
                                : "chats__view-message_other"
                            }`}
                            data-read={message.read}
                            data-id={message.id}
                          >
                            {message.message}
                            <CheckRead
                              className="chats__view-message_read"
                              color={message.read ? "#2b84e9" : "#b2b2b2"}
                            />
                          </p>
                        );
                      })
                    ) : (
                      <p className="chats__view-description">
                        Сообщений пока нет
                      </p>
                    )}
                  </div>
                </div>
                <SendMessageForm selectedChat={selectedChat} />
              </>
            ) : (
              <p className="chats__view-text">
                Выберите чат или{" "}
                <span className="chats__view-span" onClick={toggleModal}>
                  создайте новый
                </span>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="chats__wrapper">
          <h2 className="chats__title">Чатов пока нет</h2>
          <button className="chats__btn btn" onClick={toggleModal}>
            Создать
          </button>
        </div>
      )}
      {showModal && <CreateChatModal closeModal={toggleModal} />}
    </>
  );
};
