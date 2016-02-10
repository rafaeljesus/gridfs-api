'use strict'

const mongoose = require('mongoose')

const config = require('../config/db')
const log = require('../lib/log')
const dbUri = config[process.env.NODE_ENV]

mongoose.connect(dbUri)

mongoose.connection.on('error', err => log.error(`Mongoose connection error: ${err}`))

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0)
  })
})

module.exports = mongoose
