import { API } from "@/features/constants";

export const getAvatar = (avatarId: string) => {
  if (avatarId) {
    return `https://${API}/files/${avatarId}`;
  }
};
