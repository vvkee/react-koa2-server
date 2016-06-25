import Router from 'koa-router'
import { home } from '../controllers'

const router = new Router()

router.get('/', home.index)

export default router
