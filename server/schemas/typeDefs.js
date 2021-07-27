const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: Int
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: String
    user: [User]
  }

  type Query {
    user: [User]
    savedBooks: [Book]
    me(userId: ID): User
  }

  type Mutation {
      login(email:String!, password: String!): Auth
      addUser(username:String!, email:String!, password:String!): User)
      saveBook(authors:[String], description:String, title:String!, bookId: Int, image: String, link: String)
      removeBook(bookId: Int):User

  }
`;
module.exports = typeDefs;
