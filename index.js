'use strict'

const koa = require('koa')
  , kbody = require('koa-bodyparser')
  , serve = require('koa-static')
  , logger = require('koa-logger')
  , compress = require('koa-compress')
  , helmet = require('koa-helmet')
  , cors = require('kcors')
  , zlib = require('zlib')
  , homeAPI = require('./api/home/routes')
  , app = koa()

app.use(compress({
  filter: contentType => /text/i.test(contentType)
  , threshold: 2048
  , flush: zlib.Z_SYNC_FLUSH
}))
app.use(kbody())
app.use(logger())
app.use(helmet())
app.use(cors())
app.use(homeAPI.routes())
app.use(serve('public'))

module.exports = app
