import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POEM = gql`
  mutation addPoem($poemText: String!) {
    addPoem(poemText: $poemText) {
      _id
      poemText
      createdAt
      username
      riffCount
      riffs {
        _id
      }
    }
  }
`;

export const ADD_RIFF = gql`
  mutation addRiff($poemId: ID!, $riffBody: String!) {
    addRiff(poemId: $poemId, riffBody: $riffBody) {
      _id
      riffCount
      riffs {
        _id
        riffBody
        createdAt
        username
      }
    }
  }
`;

export const DELETE_POEM = gql`
  mutation deletePoem($poemId: ID!) {
    deletePoem(poemId: $poemId) {
      username
      poems {
        _id
        poemText
        createdAt
        riffCount
      }
    }
  }`