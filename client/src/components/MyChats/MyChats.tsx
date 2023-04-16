import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { addUserFromToChat } from "@/features/helpers";
import {
  GET_CHAT_WITH_MESSAGES,
  GET_MY_CHATS,
  SUBSCRIBE_CHAT,
  SUBSCRIBE_MY_CHAT,
  SUBSCRIBE_MESSAGES_UPDATED,
  UPDATE_MESSAGES_READ,
  SUBSCRIBE_ONLINE_USER,
} from "@/graphql";
import {
  useScrollbar,
  useThemeContext,
  useUser,
  useObserveMessages,
} from "@/hooks";
import { IChat, IMessage } from "@/types";
import { CreateChatModal } from "@/components/CreateChatModal";
import "./styles.sass";
import createChatIcon from "@assets/images/icons/create-chat-icon.svg";
import createChatIconLight from "@assets/images/icons/create-chat-icon-light.svg";
import { UserItem } from "@/components/UserItem";
import { ChatMessagesHeader } from "@/components/ChatMessagesHeader";
import { SendMessageForm } from "@/components/SendMessageForm";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components/ui/Loader";
import { MessagesList } from "@/components/MessagesList";
import { getSocket } from "@/features/socket";

export const MyChats: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setUser } = useUser();
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
        setUser && setUser({});
        navigate("/login");
        const socket = getSocket();
        socket?.disconnect();
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
    if (currentUser.id) {
      let dataChats: IChat[] = addUserFromToChat(
        chatsData.getMyChats,
        currentUser.id
      );

      setChats(dataChats);
    }
  }, [currentUser.id]);

  useEffect(() => {
    const { initObserverMessages, removeObserverMessages } = useObserveMessages(
      chatContentRef,
      selectedChat?.id!,
      updateMessagesRead
    );

    initObserverMessages();

    return () => {
      removeObserverMessages();
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

      setChats(addUserFromToChat(newChats, currentUser.id!));
      refetchChats();
    },
  });

  useSubscription(SUBSCRIBE_ONLINE_USER, {
    onData: ({
      data: {
        data: { userOnline },
      },
    }) => {
      if (chats.length && userOnline.id) {
        setChats(
          chats.map((chat) => {
            if (chat.userFrom.id === userOnline.id) {
              return {
                ...chat,
                userFrom: { ...chat.userFrom, online: userOnline.online },
              };
            }

            return chat;
          })
        );
      }
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
                  <MessagesList
                    messages={messages}
                    currentUserId={currentUser.id!}
                  />
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
        <div
          className={
            theme === "dark" ? "chats__wrapper dark" : "chats__wrapper"
          }
        >
          <h2 className="chats__title">Чатов пока нет</h2>
          <button className="chats__btn btn" onClick={toggleModal}>
            Создать
          </button>
        </div>
      )}
      {showModal && (
        <CreateChatModal
          closeModal={toggleModal}
          handleCreateChat={refetchChats}
        />
      )}
    </>
  );
};
