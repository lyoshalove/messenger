import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { GET_ME } from "../graphql/users";
import { io } from "socket.io-client";
import { SOCKET_API } from "../features/constants/api";
import { useUser } from "../hooks/useUser";

interface IProps {
  children: React.ReactNode;
}

export const MainTemplate: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser, setUser } = useUser();

  useQuery(GET_ME, {
    onCompleted(data) {
      setUser && setUser(data.getMe);
    },
    onError() {
      localStorage.removeItem("token");
      navigate("/login");
      setUser && setUser({});
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (currentUser?.id) {
      io(`http://${SOCKET_API}?userId=${currentUser.id}`);
    }
  }, [currentUser]);

  return (
    <>
      <Header />
      <Sidebar />
      <main className="main">{children}</main>
    </>
  );
};
