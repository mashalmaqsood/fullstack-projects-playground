const {ApolloServer} = require("apollo-server-express")
const productTypeDefs = require("./typeDefs/productTypeDefs")
const productReolvers = require("./resolvers/productResolver") 
const userTypeDefs = require("./typeDefs/userTypeDefs")
const userResolvers = require("./resolvers/userResolver")
const todoTypeDefs = require("./typeDefs/todoTypeDefs")
const todoResolvers = require("./resolvers/todoResolver")

const server = new ApolloServer({
    typeDefs : [productTypeDefs,userTypeDefs,todoTypeDefs],
    resolvers: [productReolvers,userResolvers,todoResolvers],
    context:({req,res}) => ({req,res})
})

module.exports = server;