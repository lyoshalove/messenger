import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserFromToChat } from "../../../features/helpers/addUserFromToChat";
import {
  GET_CHAT_WITH_MESSAGES,
  GET_MY_CHATS,
  SUBSCRIBE_CHAT,
  SUBSCRIBE_MY_CHAT,
} from "../../../graphql/chats";
import { useScrollbar } from "../../../hooks/useScrollbar";
import { RootState } from "../../../store";
import { IChat } from "../../../types/chats";
import { CreateChatModal } from "../../CreateChatModal/CreateChatModal";
import "./styles.sass";
import createChatIcon from "../../../assets/images/icons/create-chat-icon.svg";
import createChatIconLight from "../../../assets/images/icons/create-chat-icon-light.svg";
import {
  SUBSCRIBE_MESSAGES_UPDATED,
  UPDATE_MESSAGES_READ,
} from "../../../graphql/messages";
import { IMessage } from "../../../types/messages";
import { CheckRead } from "../../ui/CheckRead/CheckRead";
import { UserItem } from "../UserItem/UserItem";
import { ChatMessagesHeader } from "../ChatMessagesHeader/ChatMessagesHeader";
import { SendMessageForm } from "../SendMessageForm/SendMessageForm";
import { identifyWhoseMessage } from "../../../features/helpers/identifyWhoseMessage";
import { useThemeContext } from "../../../hooks/useThemeContext";
import { removeUser } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../ui/Loader/Loader";
import { SUBSCRIBE_ONLINE_USER } from "../../../graphql/users";

export const MyChats: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [chats, setChats] = useState<IChat[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [toggleScrollbar] = useScrollbar();
  const {
    data: chatsData,
    loading: chatsDataLoading,
    refetch: refetchChats,
  } = useQuery(GET_MY_CHATS, {
    fetchPolicy: "network-only",
    onError: (error) => {
      if (error.message === "Unauthorized") {
        localStorage.removeItem("token");
        dispatch(removeUser());
        navigate("/login");
      }
    },
  });
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const [getChatById, { loading: getChatByIdLoading }] = useLazyQuery(
    GET_CHAT_WITH_MESSAGES,
    {
      fetchPolicy: "network-only",
    }
  );
  const [updateMessagesRead] = useMutation(UPDATE_MESSAGES_READ);
  const chatContentRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const [theme] = useThemeContext();

  function toggleModal() {
    setShowModal((prev) => !prev);
    toggleScrollbar();
  }

  async function getChat(chat: IChat) {
    if (selectedChat?.id === chat.id) return;

    setSelectedChat(chat);
    await getChatById({
      variables: {
        id: chat.id,
      },
    }).then(({ data: { getChatByIdWithMessages } }) => {
      setMessages(getChatByIdWithMessages.messages);
    });
  }

  function handleCreateChat() {
    refetchChats();
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

  useLayoutEffect(() => {
    const chatWrapper = document.querySelector(".chats__view-content_wrapper");
    const chatContent = document.querySelector(".chats__view-content");

    if (chatWrapper && chatContent) {
      chatWrapper.scrollTop =
        chatContent.scrollHeight - chatWrapper.clientHeight;
    }
  }, [messages]);

  useSubscription(SUBSCRIBE_CHAT, {
    variables: {
      chatId: selectedChat?.id,
    },
    shouldResubscribe: true,
    onData: ({
      data: {
        data: { messageSent },
      },
    }) => {
      console.log("data ", messageSent);
      if (messageSent.userFrom.id !== currentUser.id) {
        updateMessagesRead({
          variables: {
            messageIds: [messageSent.id],
            chatId: selectedChat?.id,
          },
        });
      }
      setMessages((prev) => [...prev, messageSent]);
    },
  });

  useSubscription(SUBSCRIBE_MESSAGES_UPDATED, {
    variables: {
      chatId: selectedChat?.id,
    },
    shouldResubscribe: true,
    onData: ({
      data: {
        data: { messagesUpdated },
      },
    }) => {
      console.log("123", messagesUpdated);
      setMessages(
        messages.map((message) => {
          if (messagesUpdated.messageIds.includes(message.id)) {
            return { ...message, read: true };
          }
          return message;
        })
      );
    },
  });

  useSubscription(SUBSCRIBE_MY_CHAT, {
    variables: {
      userId: currentUser.id,
    },
    shouldResubscribe: true,
    onData: ({
      data: {
        data: { chatUpdated },
      },
    }) => {
      const newChats = chats.map((chat) => {
        if (chat.id === chatUpdated.id) {
          return chatUpdated;
        }
        return chat;
      });
      console.log("chats: ", addUserFromToChat(newChats, currentUser.id!));

      setChats(addUserFromToChat(newChats, currentUser.id!));
    },
  });

  useSubscription(SUBSCRIBE_ONLINE_USER, {
    onData: (data) => {
      console.log(data);
    },
  });

  if (chatsDataLoading) return <Loader />;

  return (
    <>
      {chats.length ? (
        <div className={theme === "dark" ? "chats dark" : "chats"}>
          <div className="chats__item chats__left">
            <div className="chats__left-top">
              <button className="chats__left-btn">
                <img
                  src={theme === "dark" ? createChatIconLight : createChatIcon}
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
              !selectedChat?.id ? "center" : "active"
            }`}
          >
            {selectedChat?.id ? (
              <>
                <ChatMessagesHeader
                  selectedChat={selectedChat}
                  setSelectedChat={() => setSelectedChat(null)}
                />
                {getChatByIdLoading && <Loader />}
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
      {showModal && (
        <CreateChatModal
          closeModal={toggleModal}
          handleCreateChat={handleCreateChat}
        />
      )}
    </>
  );
};
