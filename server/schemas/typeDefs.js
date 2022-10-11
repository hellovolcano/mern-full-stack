const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Poem {
        _id: ID
        poemText: String
        createdAt: String
        username: String
        riffs: [Riff]
    }

    type User {
        _id: ID
        username: String
        email: String
        poems: [Poem]
    }

    type Riff {
        _id: ID
        riffBody: String
        createdAt: String
        username: String
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        poems(username: String): [Poem]
        poem(_id: ID!): Poem
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPoem(poemText: String!): Poem
        addRiff(poemId: ID!, riffBody: String!): Poem
    }
    `

module.exports = typeDefs;
