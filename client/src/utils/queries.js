import { gql } from '@apollo/client';

export const QUERY_POEMS = gql`
  query poems($username: String) {
    poems(username: $username) {
      _id
      poemText
      createdAt
      username
      riffCount
      riffs {
        _id
        createdAt
        username
        riffBody
      }
    }
  }
`;

export const QUERY_POEM = gql`
  query poem($id: ID!) {
    poem(_id: $id) {
      _id
      poemText
      createdAt
      username
      riffCount
      riffs {
        _id
        createdAt
        username
        riffBody
      }
    }
  }
`;


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      poems {
        _id
        poemText
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      poems {
        _id
        poemText
        createdAt
        riffCount
        riffs {
          _id
          createdAt
          riffBody
          username
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;