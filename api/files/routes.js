import Router from 'koa-router'

import File from './model'

const router = Router()

export default router

router
.post('/v1/files', async function () {
  try {
    const ws = File.writeStream(this.query)
    const store = new Promise((resolve, reject) => {
      this.req.pipe(ws)
      ws.on('close', resolve)
      ws.on('error', reject)
    })
    this.body = await store
  } catch (err) {
    this.throw(422, err)
  }
})

.get('/v1/files/:id', async function () {
  try {
    const file = await File.findOne(this.params.id)
    this.type = file.contentType
    this.body = file
    File.readStream.pipe(this.res)
  } catch (err) {
    this.throw(412, err)
  }
})

.get('/v1/files/:id/check-exists', async function () {
  try {
    this.body = await File.exist(this.params.id)
  } catch (err) {
    this.throw(412, err)
  }
})

.delete('/v1/files/:id', async function () {
  try {
    await File.remove(this.params.id)
    this.body = {message: 'OK'}
  } catch (err) {
    this.throw(412, err)
  }
})
