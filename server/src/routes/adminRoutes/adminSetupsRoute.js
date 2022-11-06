import express from 'express'
import { isValidId } from '../../middlewares/validityMiddleware'
import { isPageLimit } from '../../middlewares/paginationMiddleware'
import { isAuth } from '../../middlewares/authMiddleware'
import { isAdmin } from '../../middlewares/permissionsMiddleware'
import { errorHandler } from '../../middlewares/errorMiddleware'
import { getSetups, deleteSetup, tempAddSetup } from '../../controllers/adminControllers/adminSetupsController'

const router = express.Router()

router.get('/getSetups', isAuth, isAdmin, isPageLimit(20), errorHandler(getSetups))

router.delete('/deleteSetup/:id', isAuth, isAdmin, isValidId('id', null), errorHandler(deleteSetup))

//temporary route for testing purposes
router.get('/tempAddSetup', isAuth, isAdmin, errorHandler(tempAddSetup))

export default router
