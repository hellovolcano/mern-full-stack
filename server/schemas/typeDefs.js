const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Poem {
        _id: ID
        poemText: String
        createdAt: String
        username: String
        snapCount: Int
        riffs: [Riff]
    }

    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        poems: [Poem]
        friends: [User]
    }

    type Riff {
        _id: ID
        riffBody: String
        createdAt: String
        username: String
    }

    type Query {
        users: [User]
        user(username: String!): User
        poems(username: String): [Poem]
        poem(_id: ID!): Poem
    }

    type Mutation {
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): User
        addPoem(poemText: String!): Poem
        addRiff(poemId: ID!, riffBody: String!): Poem
        addFriend(friendId: ID!): User
    }
    `

module.exports = typeDefs;
