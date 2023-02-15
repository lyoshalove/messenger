import { API } from "../../constants/api";

export const getAvatar = (avatarId: string) => {
  if (avatarId) {
    return `http://${API}/files/${avatarId}`;
  }
};
