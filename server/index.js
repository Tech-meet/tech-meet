const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { makeResolvers } = require('./schema/resolvers')
const fs = require('fs')
const massive = require('massive')
const path = require('path')
const { SERVER_PORT } = require('./config')
require('dotenv').config()

const typeDefs = fs.readFileSync(`${__dirname}/schema/typeDefs.graphql`, 'utf8')

const catcher = developerMessage => error => {
  console.error(developerMessage, error)
}

const app = express()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/../build`))
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })
}

massive(process.env.DATABASE_URL)
  .then(db => {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers: makeResolvers(db),
    })
    apolloServer.applyMiddleware({ app, path: '/graphql' })
    app.listen(SERVER_PORT, () => {
      console.log(`Server is listening on port ${SERVER_PORT}`)
    })
  })
  .catch(catcher('Error connecting to massive'))
