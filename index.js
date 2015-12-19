'use strict'

const express = require('express')
  , cors = require('cors')
  , helmet = require('helmet')
  , homeAPI = require('./api/home/routes')
  , fileAPI = require('./api/files/routes')
  , app = express()

app.use(cors())
app.use(helmet())
app.use(homeAPI)
app.use(fileAPI)

module.exports = app
