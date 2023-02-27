import { useContext } from "react";
import { UserContext } from "@/contexts";

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  return { currentUser: user, setUser };
};
