const express = require("express")
const server = require("./graphql")
const apiLmiter = require("./middlewares/rateLimiter")

const app = express()

async function startServer(){
  await server.start()

  app.use("/graphql",apiLmiter)
  server.applyMiddleware({app})
  
  app.listen(process.env.PORT, ()=> {
    console.log(`🚀 GraphQL server running at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  })
}

startServer();