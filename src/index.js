const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

const { PORT, isProd, NODE_ENV, MONGO_URI } = require('./config')
const { errorHandler, unknownEndpoint, limiter } = require('./utils/middleware')

const { bookRouter } = require('./controllers')

const startServer = () => {
  const app = express()

  console.log('NODE_ENV', NODE_ENV)

  app.use(limiter(15, 200))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())
  app.use(morgan(isProd ? 'tiny' : 'dev'))
  app.use(helmet())

  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('connected to MongoDB'))
    .catch((err) => {
      console.log('error connecting to MongoDB:', err.message)
      console.log('shutting down the server')
      process.exit(0)
    })

  app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'ok' })
  })

  app.use('/books', bookRouter)

  app.use(errorHandler)
  app.use(unknownEndpoint)

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  })
}

startServer()
