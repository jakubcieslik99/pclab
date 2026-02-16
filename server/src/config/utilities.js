import dotenv from 'dotenv'
import { InfisicalSDK } from '@infisical/sdk'
import logger from 'pino'

dotenv.config()

let config = {
  ENV: process.env.ENV || 'development',
  // Node.js
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 4000,
  API_URL: process.env.API_URL || 'http://localhost:4000',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  ADMINPANEL_URL: process.env.ADMINPANEL_URL || 'http://localhost:3001',
  // MongoDB
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_DB: process.env.MONGO_DB || 'database',
  MONGO_USER: process.env.MONGO_USER || 'root',
  // Other
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  NOREPLY_ADDRESS: process.env.NOREPLY_ADDRESS,
}

const loadConfig = async () => {
  const loadSecrets = async () => {
    const infisicalCredentials = {
      siteUrl: process.env.INFISICAL_URL,
      clientId: process.env.INFISICAL_CLIENT_ID,
      clientSecret: process.env.INFISICAL_CLIENT_SECRET,
      projectId: process.env.INFISICAL_PROJECT_ID,
    }

    if (process.env.ENV !== 'production') {
      return {
        MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'Passw0rd!',
        JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || 'JWT_ACCESS_TOKEN_SECRET',
        JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || 'JWT_REFRESH_TOKEN_SECRET',
        CRYPTO_SECRET: process.env.CRYPTO_SECRET || 'CRYPTO_SECRET',
        STRIPE_SECRET: process.env.STRIPE_SECRET,
        STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
      }
    }

    const client = new InfisicalSDK({ siteUrl: infisicalCredentials.siteUrl })

    await client
      .auth()
      .universalAuth.login({ clientId: infisicalCredentials.clientId, clientSecret: infisicalCredentials.clientSecret })
      .catch(error => {
        throw new Error(`Failed to log in to Infisical: ${error}`)
      })

    const { secrets } = await client
      .secrets()
      .listSecrets({
        environment: process.env.ENV,
        projectId: infisicalCredentials.projectId,
        recursive: false,
        secretPath: '/server',
      })
      .catch(error => {
        throw new Error(`Failed to fetch secrets from Infisical: ${error}`)
      })

    return secrets.reduce((acc, item) => {
      acc[item.secretKey] = item.secretValue
      return acc
    }, {})
  }

  const secrets = await loadSecrets()

  config = { ...config, ...secrets }
}

const log = logger({
  transport: { target: 'pino-pretty', options: { translateTime: 'SYS:yyyy/mm/dd HH:MM:ss', ignore: 'pid,hostname' } },
})

export { loadConfig, config, log }
