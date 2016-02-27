import koa from 'koa'
import cors from 'kcors'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import serve from 'koa-static'

import homeAPI from './api/home/routes'
import fileAPI from './api/files/routes'

const app = koa()

app.use(logger())
app.use(cors({
  methods: ['POST', 'GET', 'DELETE']
}))
app.use(helmet())
app.use(homeAPI.routes())
app.use(fileAPI.routes())
app.use(serve('public'))

app.experimental = true

export default app
