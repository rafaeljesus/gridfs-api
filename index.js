'use strict'

const koa = require('koa')
const cors = require('kcors')
const helmet = require('koa-helmet')
const logger = require('koa-logger')
const serve = require('koa-static')

const homeAPI = require('./api/home/routes')
const fileAPI = require('./api/files/routes')
const app = koa()

app.use(logger())
app.use(cors({
  methods: ['POST', 'GET', 'DELETE']
}))
app.use(helmet())
app.use(homeAPI.routes())
app.use(fileAPI.routes())
app.use(serve('public'))

module.exports = app
