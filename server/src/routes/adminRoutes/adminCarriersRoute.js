import express from 'express'
import { isValidId } from '../../middlewares/validityMiddleware'
import { isPageLimit } from '../../middlewares/paginationMiddleware'
import { isAuth } from '../../middlewares/authMiddleware'
import { isAdmin } from '../../middlewares/permissionsMiddleware'
import { errorHandler } from '../../middlewares/errorMiddleware'
import {
  getCarriers,
  createCarrier,
  updateCarrier,
  deleteCarrier,
} from '../../controllers/adminControllers/adminCarriersController'

const router = express.Router()

router.get('/getCarriers', isAuth, isAdmin, isPageLimit(20), errorHandler(getCarriers))

router.post('/createCarrier', isAuth, isAdmin, errorHandler(createCarrier))

router.put('/updateCarrier/:id', isAuth, isAdmin, isValidId('id', null), errorHandler(updateCarrier))

router.delete('/deleteCarrier/:id', isAuth, isAdmin, isValidId('id', null), errorHandler(deleteCarrier))

export default router
