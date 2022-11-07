import express from 'express'
import { isValidId } from '../../middlewares/validityMiddleware'
import { isPageLimit } from '../../middlewares/paginationMiddleware'
import { isAuth } from '../../middlewares/authMiddleware'
import { isAdmin } from '../../middlewares/permissionsMiddleware'
import { errorHandler } from '../../middlewares/errorMiddleware'
import { getUsers, getUser, updateUser, deleteUser } from '../../controllers/adminControllers/adminUsersController'

const router = express.Router()

router.get('/getUsers', isAuth, isAdmin, isPageLimit(20), errorHandler(getUsers))
router.get('/getUser/:id', isAuth, isAdmin, isValidId('id', null), errorHandler(getUser))

router.put('/updateUser/:id', isAuth, isAdmin, isValidId('id', null), errorHandler(updateUser))

router.delete('/deleteUser/:id', isAuth, isAdmin, isValidId('id', null), errorHandler(deleteUser))

export default router
