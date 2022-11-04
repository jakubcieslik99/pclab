import express from 'express'
import { errorHandler } from '../../middlewares/errorMiddleware'
import { login, refreshAccessToken, logout, tempRegister } from '../../controllers/adminControllers/adminAuthController'

const router = express.Router()

router.post('/login', errorHandler(login))

router.get('/refreshAccessToken', errorHandler(refreshAccessToken))
router.get('/logout', errorHandler(logout))

//temporary route for testing purposes
router.get('/tempRegister', errorHandler(tempRegister))

export default router
