import Router from 'koa-router'

import {
  writeStream,
  readStream,
  findOne,
  exist,
  remove
} from './model'

const router = Router()

export default router

router
.post('/v1/files', async (ctx) => {
  try {
    const ws = writeStream(ctx.query)
    const store = new Promise((resolve, reject) => {
      ctx.req.pipe(ws)
      ws.on('close', resolve)
      ws.on('error', reject)
    })
    ctx.body = await store
  } catch (err) {
    ctx.throw(422, err)
  }
})

.get('/v1/files/:id', async (ctx) => {
  try {
    const id = ctx.params.id
    const file = await findOne(id)
    ctx.type = file.contentType
    ctx.body = file
    readStream(id).pipe(ctx.res)
  } catch (err) {
    ctx.throw(412, err)
  }
})

.get('/v1/files/:id/check-exists', async (ctx) => {
  try {
    ctx.body = await exist(ctx.params.id)
  } catch (err) {
    ctx.throw(412, err)
  }
})

.delete('/v1/files/:id', async (ctx) => {
  try {
    await remove(ctx.params.id)
    ctx.body = {message: 'OK'}
  } catch (err) {
    ctx.throw(412, err)
  }
})
