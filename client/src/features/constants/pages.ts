import { Chats } from "../../pages/Chats/Chats";
import { Authorization } from "../../pages/Authorization/Authorization";
import { Login } from "../../pages/Login/Login";
import { Profile } from "../../pages/Profile/Profile";

export const pages = [
  {
    id: 0,
    path: "/",
    element: Chats,
  },
  {
    id: 1,
    path: "/authorization",
    element: Authorization,
  },
  {
    id: 2,
    path: "/login",
    element: Login,
  },
  {
    id: 3,
    path: "/profile",
    element: Profile,
  },
];
