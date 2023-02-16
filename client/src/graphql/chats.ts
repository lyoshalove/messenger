import { gql } from "@apollo/client";

export const GET_MY_CHATS = gql`
  query {
    getMyChats {
      id
      users {
        id
        firstName
        lastName
        online
        avatar {
          id
        }
      }
      messages {
        id
        message
        read
        userFrom {
          id
          firstName
          lastName
          avatar {
            id
          }
        }
      }
    }
  }
`;

export const GET_MY_CHAT_BY_ID = gql`
  query getMyChatById($id: String!) {
    getMyChatById(id: $id) {
      id
      users {
        id
        firstName
        lastName
        avatar {
          id
        }
      }
    }
  }
`;

export const GET_CHAT_WITH_MESSAGES = gql`
  query getChatWithMessages($id: String!) {
    getChatByIdWithMessages(id: $id) {
      id
      messages {
        id
        message
        read
        userFrom {
          id
          online
          avatar {
            id
          }
        }
      }
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation createChat($userToId: String!) {
    createChat(userToId: $userToId) {
      id
      users {
        id
        firstName
        lastName
      }
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
        avatar {
          id
        }
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
        avatar {
          id
        }
      }
      messages {
        createdAt
        userFrom {
          id
          firstName
          lastName
          avatar {
            id
          }
        }
        message
        read
      }
    }
  }
`;
