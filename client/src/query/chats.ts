import { gql } from "@apollo/client";

export const GET_MY_CHATS = gql`
  query {
    getMyChats {
      users {
        firstName
      }
    }
  }
`;