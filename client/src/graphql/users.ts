import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    getMe {
      id
      firstName
      lastName
      email
      avatar {
        id
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      firstName
      lastName
      avatar {
        id
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUser($id: String!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      avatar {
        id
      }
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo(
    $firstName: String!
    $lastName: String!
    $email: String!
    $file: Upload
  ) {
    updateUser(
      input: { firstName: $firstName, lastName: $lastName, email: $email }
      file: $file
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

export const SUBSCRIBE_ONLINE_USER = gql`
  subscription userOnline {
    userOnline {
      id
      online
    }
  }
`;
