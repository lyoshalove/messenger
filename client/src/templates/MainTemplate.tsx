import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { GET_ME } from "@/graphql";
import { SOCKET_API } from "@/features/constants";
import { useThemeContext, useUser } from "@/hooks";
import { initSocket, getSocket } from "@/features/socket";
import { changeBodyTheme, getAppHeight } from "@/features/helpers";

interface IProps {
  children: React.ReactNode;
}

export const MainTemplate: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser, setUser } = useUser();
  const [theme] = useThemeContext();

  useQuery(GET_ME, {
    onCompleted(data) {
      setUser && setUser(data.getMe);
    },
    onError() {
      localStorage.removeItem("token");
      navigate("/login");
      setUser && setUser({});
      const socket = getSocket();
      socket?.disconnect();
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    changeBodyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (currentUser?.id) {
      initSocket(`https://${SOCKET_API}?userId=${currentUser.id}`);
    }
  }, [currentUser]);

  useEffect(() => {
    getAppHeight();

    window.addEventListener("resize", getAppHeight);

    return () => window.removeEventListener("resize", getAppHeight);
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <main className="main">{children}</main>
    </>
  );
};
