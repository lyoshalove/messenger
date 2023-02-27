import { API } from "@/features/constants";

export const getAvatar = (avatarId: string) => {
  if (avatarId) {
    return `http://${API}/files/${avatarId}`;
  }
};
