import { Router } from 'express'
import eventsController from '../controller/event'

const router = Router()

router.get('/', eventsController.getEvents)

export default router
