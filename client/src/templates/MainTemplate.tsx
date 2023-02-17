import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { GET_ME } from "../graphql/users";
import { initUser, removeUser } from "../store/userSlice";
import { IUser } from "../types/users";
import { io } from "socket.io-client";
import { SOCKET_API } from "../constants/api";

interface IProps {
  children: React.ReactNode;
}

export const MainTemplate: React.FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [me, setMe] = useState<null | IUser>(null);
  const { loading: userLoading } = useQuery(GET_ME, {
    onCompleted(data) {
      setMe(data.getMe as IUser);
      dispatch(initUser(data.getMe as Partial<IUser>));
    },
    onError() {
      setMe(null);
      localStorage.removeItem("token");
      navigate("/login");
      dispatch(removeUser());
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (me?.id) {
      io(`http://${SOCKET_API}?userId=${me.id}`);
    }
  }, [me]);

  return (
    <>
      <Header />
      <Sidebar />
      <main className="main">{children}</main>
    </>
  );
};
