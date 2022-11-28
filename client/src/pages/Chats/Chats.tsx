import React from "react";
import { MyChats } from "../../components/Chats/MyChats/MyChats";
import { MainTemplate } from "../../templates/MainTemplate";

export const Chats: React.FC = () => {
  return (
    <MainTemplate>
      <main className="main">
        <h2>Chats</h2>
        <MyChats />
      </main>
    </MainTemplate>
  );
};
