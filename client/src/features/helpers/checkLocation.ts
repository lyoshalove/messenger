import { useLocation } from "react-router-dom";

export const checkLocation = (locations: string[]) => {
  const location = useLocation();

  return !!locations.filter((locationPath) => locationPath === location.pathname)
    .length;
};
