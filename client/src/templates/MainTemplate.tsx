import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { GET_ME } from "../graphql/users";
import { initUser } from "../store/userSlice";
import { IGetMe, IUser } from "../types/users";

interface IProps {
  children: React.ReactNode;
}

export const MainTemplate: React.FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading: userLoading } = useQuery<Partial<IGetMe>>(GET_ME, {
    onCompleted(data) {
      dispatch(initUser(data.getMe as Partial<IUser>));
    },
  });
  const navigate = useNavigate();

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
