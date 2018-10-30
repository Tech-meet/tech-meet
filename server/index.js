const express = require('express')
const { GraphQLServer } = require('graphql-yoga')
const { makeResolvers } = require('./schema/resolvers')
const fs = require('fs')
const massive = require('massive')
require('dotenv').config()

const typeDefs = fs.readFileSync(`${__dirname}/schema/typeDefs.graphql`, 'utf8')

// We don't even technically need this part yet
//
// const app = express()
const SERVER_PORT = process.env.SERVER_PORT || 4000
// app.listen(SERVER_PORT, () => {
//   console.log(`Web server is listening on port ${SERVER_PORT}`)
// })

const GRAPHQL_PORT = process.env.GRAPHQL_PORT || SERVER_PORT + 1
const options = {
  port: GRAPHQL_PORT,
  endpoint: '/graphql',
  playground: '/graphiql',
}

massive(
  `postgres://${process.env.DEVELOPMENT_DB_USERNAME}:${
    process.env.DEVELOPMENT_DB_PASSWORD
  }@${process.env.DEVELOPMENT_DB_HOST}:${process.env.DEVELOPMENT_DB_PORT}/${
    process.env.DEVELOPMENT_DB_NAME
  }?ssl=true`
).then(db => {
  console.log('Connected to database')

  const gqlServer = new GraphQLServer({
    typeDefs,
    resolvers: makeResolvers(db),
  })
  gqlServer.start(options).then(() => {
    console.log(`GraphQL server is listening on port ${GRAPHQL_PORT}`)
  })
})
