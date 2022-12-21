import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { create } from "yup/lib/Reference";
import { CREATE_CHAT, GET_MY_CHATS } from "../../../graphql/chats";
import { GET_ME } from "../../../graphql/users";
import { IGetMe } from "../../../types/users";
import "./styles.sass";

export const MyChats: React.FC = () => {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery<IGetMe>(GET_ME);
  const {
    loading: chatLoading,
    error: chatError,
    data: chatData,
  } = useQuery(GET_MY_CHATS, {
    variables: {
      id: userData?.getMe?.id,
    },
  });
  const [createChat, {loading, error}] = useMutation(CREATE_CHAT);
  console.log(userData);
  console.log(chatData);

  async function create() {
    await createChat({
      variables: {
        userToId: userData?.getMe.id,
      },
    }).then(({ data }) => console.log("Chat: ", data));
  }

  useEffect(() => {
    create();
  }, []);

  return <div></div>;
};
