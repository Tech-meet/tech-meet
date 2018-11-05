const proxy = require('http-proxy-middleware')
require('dotenv').config()

module.exports = app => {
  app.use(
    '/graphql',
    proxy({ target: `http://localhost:${process.env.SERVER_PORT}` })
  )
}
