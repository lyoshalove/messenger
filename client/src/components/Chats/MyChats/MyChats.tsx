import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_ME } from "../../../graphql/users";
import { initUser } from "../../../store/userSlice";
import { IGetMe, IUser } from "../../../types/users";
import "./styles.sass";

export const MyChats: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useQuery<Partial<IGetMe>>(GET_ME, {
    onCompleted(data) {
      dispatch(initUser(data.getMe as Partial<IUser>));
    },
  });

  return <div></div>;
};
