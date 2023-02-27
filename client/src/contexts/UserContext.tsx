import { useQuery } from "@apollo/client";
import React, { createContext, useState } from "react";
import { GET_ME } from "@/graphql";
import { IUser } from "@/types";

interface IContext {
  user: Partial<IUser>;
  setUser?: (newUser: Partial<IUser>) => void;
}

interface IProps {
  children?: React.ReactNode;
}

const defaultState: IContext = {
  user: {},
};

export const UserContext = createContext<IContext>(defaultState);

export const UserProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<Partial<IUser>>({});

  useQuery(GET_ME, {
    onCompleted: (data) => {
      setUser(data.getMe);
    },
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
