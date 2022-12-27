import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_MY_CHATS } from "../../../graphql/chats";
import { useScrollbar } from "../../../hooks/useScrollbar";
import { IChat } from "../../../types/chats";
import { CreateChatModal } from "../../CreateChatModal/CreateChatModal";
import "./styles.sass";

export const MyChats: React.FC = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [toggleScrollbar] = useScrollbar();
  const { loading: chatsLoading } = useQuery(GET_MY_CHATS, {
    onCompleted(data) {
      console.log(data);
      setChats(data.getMyChats);
    },
  });

  function toggleModal() {
    setShowModal(prev => !prev);
    toggleScrollbar();
  }

  return (
    <>
      {chats.length ? (
        1
      ) : (
        <div className="chats__wrapper">
          <h2 className="chats__title">Чатов пока нет</h2>
          <button className="chats__btn btn" onClick={toggleModal}>
            Создать
          </button>
          {showModal && <CreateChatModal closeModal={toggleModal} />}
        </div>
      )}
    </>
  );
};
