import express from 'express'
import { isValidId } from '../middlewares/validityMiddleware'
import { isAuth } from '../middlewares/authMiddleware'
import { errorHandler } from '../middlewares/errorMiddleware'
import {
  getSetups,
  getSetup,
  likeSetup,
  unlikeSetup,
  createComment,
  getComponents,
  createSetup,
  updateSetup,
  deleteSetup,
} from '../controllers/setupsController'

const router = express.Router()

router.get('/getSetups', errorHandler(getSetups))
router.get('/getSetup/:id', isValidId('id', null), errorHandler(getSetup))

router.post('/likeSetup/:id', isAuth, isValidId('id', null), errorHandler(likeSetup))

router.delete('/unlikeSetup/:id', isAuth, isValidId('id', null), errorHandler(unlikeSetup))

router.post('/createComment/:id', isAuth, isValidId('id', null), errorHandler(createComment))

router.get('/getComponents', isAuth, errorHandler(getComponents))

router.post('/createSetup', isAuth, errorHandler(createSetup))

router.put('/updateSetup/:id', isAuth, isValidId('id', null), errorHandler(updateSetup))

router.delete('/deleteSetup/:id', isAuth, isValidId('id', null), errorHandler(deleteSetup))

export default router
