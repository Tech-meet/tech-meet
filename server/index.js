const express = require('express')
const { postgraphile } = require('postgraphile')
require('dotenv').config()

const app = express()

app.use(
  postgraphile(
    {
      host: process.env.DEVELOPMENT_DB_HOST || 'localhost',
      port: process.env.DEVELOPMENT_DB_PORT || 5432,
      database: process.env.DEVELOPMENT_DB_NAME,
      user: process.env.DEVELOPMENT_DB_USERNAME,
      password: process.env.DEVELOPMENT_DB_PASSWORD,
    },
    'public',
    {
      graphiql: true,
    }
  )
)

const SERVER_PORT = process.env.SERVER_PORT || 4000
app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`)
})
