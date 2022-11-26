import home from "../assets/images/icons/home.svg";
import homeLight from "../assets/images/icons/home-light.svg";
import message from "../assets/images/icons/message.svg";
import messageLight from "../assets/images/icons/message-light.svg";

interface ISidebarMenu {
  id: number;
  name: string;
  icon: string;
  iconLight: string;
}

export const sidebarMenu: ISidebarMenu[] = [
  {
    id: 0,
    name: "Home",
    icon: home,
    iconLight: homeLight,
  },
  {
    id: 1,
    name: "messages",
    icon: message,
    iconLight: messageLight,
  },
];
