import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation sendMessage($chatId: String!, $message: String!) {
    sendMessage(input: { chatId: $chatId, message: $message }) {
      id
      message
      userFrom {
        id
        avatar {
          id
        }
      }
    }
  }
`;

export const UPDATE_MESSAGES_READ = gql`
  mutation setMessagesRead($messageIds: [String!]!, $chatId: String!) {
    setMessagesRead(messageIds: $messageIds, chatId: $chatId)
  }
`;

export const SUBSCRIBE_MESSAGES_UPDATED = gql`
  subscription messagesUpdated($chatId: String!) {
    messagesUpdated(chatId: $chatId) {
      chatId
      messageIds
    }
  }
`;


