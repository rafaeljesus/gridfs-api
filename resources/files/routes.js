import Router from 'koa-router'

import { reply as wrap } from '../../lib/wrap'
import {
  writeStream,
  readStream,
  findOne,
  exist,
  remove
} from './model'

const router = Router()

export default router

router.post('/v1/files', wrap(async (ctx) => {
  const ws = writeStream(ctx.query)
  return new Promise((resolve, reject) => {
    ctx.req.pipe(ws)
    ws.on('close', resolve)
    ws.on('error', reject)
  })
}))

.get('/v1/files/:id', wrap(async (ctx) => {
  const id = ctx.params.id
  const file = await findOne(id)
  ctx.type = file.contentType
  readStream(id).pipe(ctx.res)
  return file
}))

.get('/v1/files/:id/check-exists', wrap(async (ctx) => {
  return await exist(ctx.params.id)
}))

.delete('/v1/files/:id', wrap(async (ctx) => {
  await remove(ctx.params.id)
  return { message: 'OK' }
}))
