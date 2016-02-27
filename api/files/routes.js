import Router from 'koa-router'

import * as File from './model'

const router = Router()

export default router

router
.post('/v1/files', async function (context) {
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

.get('/v1/files/:id', async function (context) {
  try {
    const id = this.params.id
    const file = await File.findOne(id)
    this.type = file.contentType
    this.body = file
    File.readStream(id).pipe(this.res)
  } catch (err) {
    this.throw(412, err)
  }
})

.get('/v1/files/:id/check-exists', async function (context) {
  try {
    this.body = await File.exist(this.params.id)
  } catch (err) {
    this.throw(412, err)
  }
})

.delete('/v1/files/:id', async function (context) {
  try {
    await File.remove(this.params.id)
    this.body = {message: 'OK'}
  } catch (err) {
    console.log(err)
    this.throw(412, err)
  }
})
