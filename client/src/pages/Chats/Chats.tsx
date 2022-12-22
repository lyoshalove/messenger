import React from "react";
import { MainTemplate } from "../../templates/MainTemplate";
import { Chats as AllChats } from '../../components/Chats/Chats';

export const Chats: React.FC = () => {
  return (
    <MainTemplate>
      <main className="main">
        <AllChats />
      </main>
    </MainTemplate>
  );
};
