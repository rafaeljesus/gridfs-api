import Koa from 'koa'
import cors from 'kcors'
import logger from 'koa-logger'
import http from 'http'

import homeAPI from './resources/home/routes'
import fileAPI from './resources/files/routes'

const app = new Koa()
const port = process.env.PORT || 3000

app.use(logger())
app.use(cors({
  methods: ['POST', 'GET', 'DELETE']
}))
app.use(homeAPI.routes())
app.use(fileAPI.routes())

http.globalAgent.maxSockets = Infinity
http.createServer(app.callback())

app.listen(port)

console.log(`GridFS API - port ${port}`)
