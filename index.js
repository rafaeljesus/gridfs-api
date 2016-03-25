import Koa from 'koa'
import cors from 'kcors'
import logger from 'koa-logger'

import homeAPI from './api/home/routes'
import fileAPI from './api/files/routes'

const app = new Koa()

app.use(logger())
app.use(cors({
  methods: ['POST', 'GET', 'DELETE']
}))
app.use(homeAPI.routes())
app.use(fileAPI.routes())

export default app
