import incognitoAvatar from "../../assets/images/incognito.png";

export const checkUserAvatar = (avatar: any) => {
  return avatar ? avatar : incognitoAvatar;
};