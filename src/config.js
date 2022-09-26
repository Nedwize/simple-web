require('dotenv').config()

const PORT = process.env.PORT || 3030
const MONGO_URI =
  process.env.MONGO_DB_URI || 'mongodb://mongodb:27017/simple-web-books'

const NODE_ENV = process.env.NODE_ENV || 'staging'

const isProd = NODE_ENV === 'production'

module.exports = {
  PORT,
  NODE_ENV,
  isProd,
  MONGO_URI,
}
