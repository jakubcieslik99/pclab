import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import createError from 'http-errors'
import { config, log } from './config/utilities'
import databaseConnect from './config/databaseConnect'
import corsOptions from './config/corsOptions'
import { rateLimiter, speedLimiter } from './config/limitOptions'
import { isError } from './middlewares/errorMiddleware'
import adminAuthRoute from './routes/adminRoutes/adminAuthRoute'
import adminOrdersRoute from './routes/adminRoutes/adminOrdersRoute'
import adminCarriersRoute from './routes/adminRoutes/adminCarriersRoute'
import adminComponentsRoute from './routes/adminRoutes/adminComponentsRoute'
import adminSetupsRoute from './routes/adminRoutes/adminSetupsRoute'
import adminUsersRoute from './routes/adminRoutes/adminUsersRoute'
import authRoute from './routes/authRoute'

const app = express()
app.set('trust proxy', `loopback, ${config.IP}`)
databaseConnect(app)

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(helmet())
app.use(cors(corsOptions))
app.use(rateLimit(rateLimiter))
app.use(slowDown(speedLimiter))

//admin routes
app.use('/admin/auth', adminAuthRoute)
app.use('/admin/orders', adminOrdersRoute)
app.use('/admin/carriers', adminCarriersRoute)
app.use('/admin/components', adminComponentsRoute)
app.use('/admin/setups', adminSetupsRoute)
app.use('/admin/users', adminUsersRoute)
//routes
app.use('/auth', authRoute)

//404 error
app.all('*', (_req, _res, next) => next(createError(404, 'Podany zasób nie istnieje.')))
//errors handling middleware
app.use(isError)

app.on('ready', () => {
  app.listen(config.PORT, () => log.info(`Server started on port ${config.PORT}`))
})
