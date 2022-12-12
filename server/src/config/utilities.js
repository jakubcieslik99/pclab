import dotenv from 'dotenv'
import logger from 'pino'

dotenv.config()

const config = {
  ENV: process.env.ENV || 'dev',
  /*------------------------------------------------------------------------------------------*/
  PORT: process.env.PORT || 3002,
  IP: process.env.IP || '127.0.0.1',
  API_URL: process.env.API_URL || 'http://localhost:3002',
  WEBAPP_URL: process.env.WEBAPP_URL || 'http://localhost:3000',
  ADMINPANEL_URL: process.env.ADMINPANEL_URL || 'http://localhost:3001',
  /*------------------------------------------------------------------------------------------*/
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pclab',
  /*------------------------------------------------------------------------------------------*/
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || 'JWT_ACCESS_TOKEN_SECRET',
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || 'JWT_REFRESH_TOKEN_SECRET',
  /*------------------------------------------------------------------------------------------*/
  CRYPTO_SECRET: process.env.CRYPTO_SECRET || 'CRYPTO_SECRET',
  /*------------------------------------------------------------------------------------------*/
  STRIPE_SECRET: process.env.STRIPE_SECRET,
  STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET,
  /*------------------------------------------------------------------------------------------*/
  GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  NOREPLY_ADDRESS: process.env.NOREPLY_ADDRESS || 'noreply@pclab.com',
}

const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:yyyy/mm/dd HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
})

export { config, log }
