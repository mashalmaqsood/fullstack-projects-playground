const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    name: String
    username: String
    email: String
    password: String
    plan: String
  }

  type AuthPayload {
    user: User
    token: String
  }

  type Mutation {
    registerUser(
      name: String
      username: String
      email: String
      password: String
      plan: String
    ): AuthPayload

    loginUser(email: String, password: String): AuthPayload
  }
`;
