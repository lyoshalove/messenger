import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_MY_CHATS } from "../../../graphql/chats";
import { GET_ME } from "../../../graphql/users";
import { RootState } from "../../../store";
import { initUser } from "../../../store/userSlice";
import { IChat } from "../../../types/chats";
import { IGetMe, IUser } from "../../../types/users";
import "./styles.sass";

export const MyChats: React.FC = () => {
  const [ chats, setChats ] = useState<IChat[]>([]);
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  const { loading: userLoading } = useQuery<Partial<IGetMe>>(GET_ME, {
    onCompleted(data) {
      dispatch(initUser(data.getMe as Partial<IUser>));
    },
  });
  const { loading: chatsLoading } = useQuery(GET_MY_CHATS, {
    onCompleted(data) {
      setChats(data.getMyChats);
    },
  });

  return <div>
    {chats.length ? <h2>Чаты есть</h2> : <h2>Чатов пока нет</h2>}
  </div>;
};
