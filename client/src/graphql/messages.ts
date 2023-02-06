import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation sendMessage($chatId: String!, $message: String!) {
    sendMessage(input: { chatId: $chatId, message: $message }) {
      id
      message
      userFrom {
        id
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

export const SUBSCRIBE_CHAT = gql`
  subscription messageSent($chatId: String!) {
    messageSent(chatId: $chatId) {
      id
      message
      createdAt
      userFrom {
        id
        firstName
        lastName
      }
    }
  }
`;

export const SUBSCRIBE_MY_CHAT = gql`
  subscription chatUpdated($userId: String!) {
    chatUpdated(userId: $userId) {
      id
      users {
        id
        firstName
        lastName
        online
      }
      messages {
        createdAt
        userFrom {
          id
          firstName
          lastName
        }
        message
        read
      }
    }
  }
`;

export const SUBSCRIBE_ONLINE_USER = gql`
  subscription userOnline {
    userOnline {
      id
      online
    }
  }
`;
