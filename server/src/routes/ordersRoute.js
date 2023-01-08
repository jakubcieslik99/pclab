import express from 'express'
import { isValidId } from '../middlewares/validityMiddleware'
import { isAuth } from '../middlewares/authMiddleware'
import { errorHandler } from '../middlewares/errorMiddleware'
import { getOrder, getCarriers, placeOrder } from '../controllers/ordersController'

const router = express.Router()

router.get('/getOrder/:id', isAuth, isValidId('id', null), errorHandler(getOrder))

router.get('/getCarriers', errorHandler(getCarriers))

router.post('/placeOrder', isAuth, errorHandler(placeOrder))

export default router
