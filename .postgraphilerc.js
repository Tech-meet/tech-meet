require('dotenv').config();

module.exports = {
  options: {
    connection: `postgres://${process.env.DEVELOPMENT_DB_USERNAME}:${process.env.DEVELOPMENT_DB_PASSWORD}@${process.env.DEVELOPMENT_DB_HOST}:${process.env.DEVELOPMENT_DB_PORT}/${process.env.DEVELOPMENT_DB_NAME}?ssl=true`,
  },
};
