import { Chats } from "@/pages/Chats";
import { Authorization } from "@/pages/Authorization";
import { Login } from "@/pages/Login";
import { Profile } from "@/pages/Profile";

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
