import { useState } from "react";

export const useScrollbar = () => {
  const [scrollbar, setScrollbar] = useState<boolean>(false);

  document.body.style.overflow = `${scrollbar ? "hidden" : "auto"}`;

  function toggleScrollbar() {
    setScrollbar((prev) => !prev);
  }

  return [toggleScrollbar];
};
