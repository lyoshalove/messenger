import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MY_CHATS } from "../../../query/chats";
import "./styles.sass";

export const MyChats: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MY_CHATS); //NOT WORKS
  console.log(data);

  return <div></div>;
};
