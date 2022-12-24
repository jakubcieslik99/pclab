import express from 'express'
import { isAuth } from '../middlewares/authMiddleware'
import { errorHandler } from '../middlewares/errorMiddleware'
import {
  register,
  login,
  updateAccount,
  deleteAccount,
  refreshAccessToken,
  logout,
  confirmAccount,
  sendPasswordReset,
  resetPassword,
} from '../controllers/authController'

const router = express.Router()

router.post('/register', errorHandler(register))
router.post('/login', errorHandler(login))

router.put('/updateAccount', isAuth, errorHandler(updateAccount))

router.delete('/deleteAccount', isAuth, errorHandler(deleteAccount))

router.get('/refreshAccessToken', errorHandler(refreshAccessToken))
router.get('/logout', errorHandler(logout))

router.post('/confirmAccount', errorHandler(confirmAccount))
router.post('/sendPasswordReset', errorHandler(sendPasswordReset))
router.post('/resetPassword', errorHandler(resetPassword))

export default router
