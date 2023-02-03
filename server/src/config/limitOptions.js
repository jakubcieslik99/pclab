import createError from 'http-errors'

const rateLimiter = {
  windowMs: 60 * 1000,
  max: 25,
  handler: () => {
    throw createError(429, 'Zbyt dużo zapytań do serwera.')
  },
}

const speedLimiter = {
  windowMs: 60 * 1000,
  delayAfter: 10,
  delayMs: 200,
}

export { rateLimiter, speedLimiter }
