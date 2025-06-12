const { gql } = require("apollo-server-express");

module.exports = gql`
  type Todo {
    id: ID!
    name: String
    description: String!
  }

  type Query {
    searchTodos(
      name: String
      description: String
    ): [Todo]
  }
`;
