import express from 'express'
import { errorHandler } from '../../middlewares/errorMiddleware'
import { login, refreshAccessToken, logout } from '../../controllers/adminControllers/adminAuthController'

const router = express.Router()

router.post('/login', errorHandler(login))

router.get('/refreshAccessToken', errorHandler(refreshAccessToken))
router.get('/logout', errorHandler(logout))

export default router
