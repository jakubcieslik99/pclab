import express from 'express'
import { isValidId } from '../../middlewares/validityMiddleware'
import { isPageLimit } from '../../middlewares/paginationMiddleware'
import { isAuth } from '../../middlewares/authMiddleware'
import { isAdmin } from '../../middlewares/permissionsMiddleware'
import { errorHandler } from '../../middlewares/errorMiddleware'
import { getOrders, getOrder, updateOrder, stripeWebhook } from '../../controllers/adminControllers/adminOrdersController'

const router = express.Router()

router.get('/getOrders', isAuth, isAdmin, isPageLimit(20), errorHandler(getOrders))
router.get('/getOrder/:id', isAuth, isAdmin, isValidId('id', null), errorHandler(getOrder))

router.put('/updateOrder/:id', isAuth, isAdmin, isValidId('id', null), errorHandler(updateOrder))

router.post('/stripeWebhook', express.raw({ type: 'application/json' }), errorHandler(stripeWebhook))

export default router
