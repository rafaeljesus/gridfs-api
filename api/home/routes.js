import Router from 'koa-router'

const router = Router()

export default router

router.get('/', async function() {
  this.status = 200
  this.body = {status: 'GridFS API'}
})
