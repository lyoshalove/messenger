import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { GET_ME } from "../graphql/users";
import { initUser } from "../store/userSlice";
import { IGetMe, IUser } from "../types/users";
import { io } from "socket.io-client";
import { SOCKET_API } from "../constants/api";

interface IProps {
  children: React.ReactNode;
}

export const MainTemplate: React.FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [me, setMe] = useState<null | IUser>(null);
  const { loading: userLoading } = useQuery<Partial<IGetMe>>(GET_ME, {
    onCompleted(data) {
      setMe(data.getMe as IUser);
      dispatch(initUser(data.getMe as Partial<IUser>));
    },
    onError() {
      setMe(null);
      navigate("/login");
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (me?.id) {
      io(`http://${SOCKET_API}?userId=${me.id}`);
    }
  }, [me]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <main className="main">{children}</main>
    </>
  );
};
