import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";

interface IProps {
  children: React.ReactNode;
}

export const MainTemplate: React.FC<IProps> = ({ children }) => {
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
