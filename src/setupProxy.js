const proxy = require('http-proxy-middleware')
const { SERVER_PORT } = require('../server/config')

module.exports = app => {
  app.use('/graphql', proxy({ target: `http://localhost:${SERVER_PORT}` }))
}
