import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    getMe {
      id, firstName, lastName
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      firstName,
      lastName
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUser($id: String!) {
    getUserById(id: $id) {
      id,
      firstName,
      lastName
    }
  }
`;
