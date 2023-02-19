import React from "react";

export const useObserveMessages = (
  ref: React.MutableRefObject<NodeListOf<HTMLDivElement> | null>,
  selectedChatId: string,
  updateMessagesRead: (params: {
    variables: { messageIds: string[]; chatId: string };
  }) => void
) => {
  ref.current = document.querySelectorAll(".chats__view-message_other");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (
        entry.isIntersecting &&
        entry.target.attributes[1].value === "false"
      ) {
        await updateMessagesRead({
          variables: {
            messageIds: [entry.target.attributes[2].value],
            chatId: selectedChatId,
          },
        });
      }
    });
  });

  const initObserverMessages = () => {
    if (ref.current) {
      ref.current.forEach((message) => {
        observer.observe(message);
      });
    }
  };
  const removeObserverMessages = () => {
    if (ref.current) {
      ref.current.forEach((message) => {
        observer.unobserve(message);
      });
    }
  };

  return { initObserverMessages, removeObserverMessages };
};
