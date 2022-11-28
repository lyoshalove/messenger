import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    getMe {
      firstName
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      firstName
      lastName
    }
  }
`;
