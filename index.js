'use strict'

const koa = require('koa')
  , cors = require('kcors')
  , helmet = require('koa-helmet')
  , logger = require('koa-logger')
  , serve = require('koa-static')
  , homeAPI = require('./api/home/routes')
  , fileAPI = require('./api/files/routes')
  , app = koa()

app.use(logger())
app.use(cors({
  methods: ['POST', 'GET', 'DELETE']
}))
app.use(helmet())
app.use(homeAPI.routes())
app.use(fileAPI.routes())
app.use(serve('public'))

module.exports = app
