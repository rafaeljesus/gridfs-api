import Router from 'koa-router'

const router = Router()

export default router

router.get('/', async (ctx) => {
  ctx.status = 200
  ctx.body = await {status: 'GridFS API'}
})
