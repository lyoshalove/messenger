import { gql } from "@apollo/client";

export const GET_MY_CHATS = gql`
  query getChats($id: String) {
    getMyChats(id: $id) {
      users {
        firstName, lastName
      }
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation createChat($userToId: String!) {
    createChat(userToId: $userToId) {
      id, users {
        id, firstName, lastName
      }
    }
  }
`;