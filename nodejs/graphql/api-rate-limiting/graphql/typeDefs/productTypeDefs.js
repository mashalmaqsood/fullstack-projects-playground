const { gql } = require("apollo-server-express");

module.exports = gql`
  type Product {
    id: ID!
    name: String
    description: String!
    quantity: Int
    price: Float
    category: String
  }

  type Query {
    searchProducts(
      name: String
      description: String
      quantity: Int
      price: Float
      category: String
      lowStock:Boolean,
      minQuantity: Int,
      maxQuantity: Int,
      minPrice: Float,
      maxPrice: Float
    ): [Product]
  }
`;
