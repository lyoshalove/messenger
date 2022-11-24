import home from "../assets/images/icons/home.svg";
import message from "../assets/images/icons/message.svg";

interface ISidebarMenu {
  id: number;
  name: string;
  icon: string;
}

export const sidebarMenu: ISidebarMenu[] = [
  {
    id: 0,
    name: "Home",
    icon: home,
  },
  {
    id: 1,
    name: "messages",
    icon: message,
  },
];
