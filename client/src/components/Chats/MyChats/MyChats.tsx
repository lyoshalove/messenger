import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MY_CHATS } from "../../../query/chats";
import { GET_ME } from "../../../query/users";
import "./styles.sass";

export const MyChats: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ME);
  // const { loading, error, data } = useQuery(GET_MY_CHATS); //NOT WORKS
  console.log(error);

  return <div></div>;
};
