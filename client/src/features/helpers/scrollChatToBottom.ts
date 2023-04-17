export const scrollChatToBottom = () => {
  const chatWrapper = document.querySelector(".chats__view-content_wrapper");
  const chatContent = document.querySelector(".chats__view-content");

  if (chatWrapper && chatContent) {
    chatWrapper.scrollTop = chatContent.scrollHeight - chatWrapper.clientHeight;
  }
};
