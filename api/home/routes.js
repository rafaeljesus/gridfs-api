import Router from 'koa-router'

import { reply as wrap } from '../../lib/wrap'

const router = Router()

export default router

router.get('/', wrap(async () => {
  return { status: 'GridFS API' }
}))
