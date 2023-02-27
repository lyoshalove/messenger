import incognitoAvatar from "@assets/images/incognito.png";
import { getAvatar } from "@/features/helpers";

export const checkUserAvatar = (avatar: any) => {
  return avatar ? getAvatar(avatar.id) : incognitoAvatar;
};
