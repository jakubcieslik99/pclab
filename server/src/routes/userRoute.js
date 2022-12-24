import express from 'express'
import { isValidId } from '../middlewares/validityMiddleware'
import { isAuth } from '../middlewares/authMiddleware'
import { errorHandler } from '../middlewares/errorMiddleware'
import { getUser, getLoggedUser } from '../controllers/userController'

const router = express.Router()

router.get('/getUser/:id', isValidId('id', null), errorHandler(getUser))
router.get('/getLoggedUser', isAuth, errorHandler(getLoggedUser))

export default router
