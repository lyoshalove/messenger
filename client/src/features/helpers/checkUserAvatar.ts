import incognitoAvatar from "../../assets/images/incognito.png";
import { getAvatar } from "./getAvatar";

export const checkUserAvatar = (avatar: any) => {
  return avatar ? getAvatar(avatar.id) : incognitoAvatar;
};