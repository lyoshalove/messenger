import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GET_MY_CHATS } from "../../../graphql/chats";
import { RootState } from "../../../store";
import { IChat } from "../../../types/chats";
import "./styles.sass";

export const MyChats: React.FC = () => {
  const [ chats, setChats ] = useState<IChat[]>([]);
  const { loading: chatsLoading } = useQuery(GET_MY_CHATS, {
    onCompleted(data) {
      setChats(data.getMyChats);
    },
  });

  return <div>
    {chats.length ? <h2>Чаты есть</h2> : <h2>Чатов пока нет</h2>}
  </div>;
};
