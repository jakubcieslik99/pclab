import express from 'express'
import fileUpload from 'express-fileupload'
import { isValidId } from '../../middlewares/validityMiddleware'
import { isPageLimit } from '../../middlewares/paginationMiddleware'
import { isAuth } from '../../middlewares/authMiddleware'
import { isAdmin } from '../../middlewares/permissionsMiddleware'
import {
  isProperAmount,
  isProperAmountUpdated,
  isProperExtension,
  isProperSize,
} from '../../middlewares/uploadFilesMiddleware'
import { errorHandler } from '../../middlewares/errorMiddleware'
import {
  getComponents,
  getComponent,
  createComponent,
  updateComponent,
  deleteComponent,
} from '../../controllers/adminControllers/adminComponentsController'

const router = express.Router()

router.get('/getComponents', isAuth, isAdmin, isPageLimit(20), errorHandler(getComponents))
router.get('/getComponent/:id', isAuth, isAdmin, isValidId('id', null), errorHandler(getComponent))

router.post(
  '/createComponent',
  isAuth,
  isAdmin,
  fileUpload({ parseNested: true }),
  isProperAmount(0, 1),
  isProperExtension(['.jpg', '.jpeg', '.png']),
  isProperSize(3),
  errorHandler(createComponent)
)

router.put(
  '/updateComponent/:id',
  isAuth,
  isAdmin,
  isValidId('id', null),
  fileUpload({ parseNested: true }),
  isProperAmountUpdated(0, 1, 'images'),
  isProperExtension(['.jpg', '.jpeg', '.png']),
  isProperSize(3),
  errorHandler(updateComponent)
)

router.delete('/deleteComponent/:id', isValidId('id', null), isAuth, isAdmin, errorHandler(deleteComponent))

export default router
