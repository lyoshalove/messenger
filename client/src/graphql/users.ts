import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    getMe {
      id
      firstName
      lastName
      email
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

export const GET_USER_BY_ID = gql`
  query getUser($id: String!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateUser(
      input: { firstName: $firstName, lastName: $lastName, email: $email }
    ) {
      token
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $oldPassword: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    updatePassword(
      input: {
        oldPassword: $oldPassword
        newPassword: $newPassword
        confirmPassword: $confirmPassword
      }
    )
  }
`;
