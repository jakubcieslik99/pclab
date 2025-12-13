import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import createError from 'http-errors'
import { loadConfig, config } from './config/utilities'
import databaseConnect from './config/databaseConnect'
import corsOptions from './config/corsOptions'
import { rateLimiter, speedLimiter, adminRateLimiter, adminSpeedLimiter } from './config/limitOptions'
import bodyParser from './middlewares/parserMiddleware'
import { isError } from './middlewares/errorMiddleware'
import adminAuthRoute from './routes/adminRoutes/adminAuthRoute'
import adminOrdersRoute from './routes/adminRoutes/adminOrdersRoute'
import adminCarriersRoute from './routes/adminRoutes/adminCarriersRoute'
import adminComponentsRoute from './routes/adminRoutes/adminComponentsRoute'
import adminSetupsRoute from './routes/adminRoutes/adminSetupsRoute'
import adminUsersRoute from './routes/adminRoutes/adminUsersRoute'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import setupsRoute from './routes/setupsRoute'
import ordersRoute from './routes/ordersRoute'
;(async () => {
  await loadConfig()

  const app = express()
  app.set('trust proxy', `loopback, ${config.HOST === 'localhost' ? '127.0.0.1' : config.HOST}`)

  app.use(express.urlencoded({ extended: true }))
  app.use(bodyParser)
  app.use(cookieParser())
  app.use(helmet())
  app.use(cors(corsOptions))

  // static files
  app.use('/static/components/', express.static('uploads/components'))
  // admin routes
  app.use('/admin/*splat', rateLimit(adminRateLimiter), slowDown(adminSpeedLimiter))
  app.use('/admin/auth', adminAuthRoute)
  app.use('/admin/orders', adminOrdersRoute)
  app.use('/admin/carriers', adminCarriersRoute)
  app.use('/admin/components', adminComponentsRoute)
  app.use('/admin/setups', adminSetupsRoute)
  app.use('/admin/users', adminUsersRoute)
  // routes
  app.use('/auth', rateLimit(rateLimiter), slowDown(speedLimiter), authRoute)
  app.use('/user', rateLimit(rateLimiter), slowDown(speedLimiter), userRoute)
  app.use('/setups', rateLimit(rateLimiter), slowDown(speedLimiter), setupsRoute)
  app.use('/orders', rateLimit(rateLimiter), slowDown(speedLimiter), ordersRoute)

  // 404 error
  app.all('/{*splat}', (_req, _res, next) => next(createError(404, 'Podany zasób nie istnieje.')))
  // errors handling middleware
  app.use(isError)

  databaseConnect(app)
})()
