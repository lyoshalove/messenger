import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_ME } from "../../../graphql/users";
import { initUser } from "../../../store/userSlice";
import { IGetMe } from "../../../types/users";
import "./styles.sass";

export const MyChats: React.FC = () => {
  const dispatch = useDispatch();
  const [lazyGetMe] = useLazyQuery<Partial<IGetMe>>(GET_ME);

  async function getMe() {
    await lazyGetMe().then(({ data }) => {
      const user = data?.getMe;
      
      if(user) {
        dispatch(initUser(user));
      }
    });
  }

  useEffect(() => {
    getMe();
  }, []);

  return <div></div>;
};
