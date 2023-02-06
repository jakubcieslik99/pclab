import createError from 'http-errors'

const rateLimiter = {
  windowMs: 30 * 1000,
  max: 30,
  handler: () => {
    throw createError(429, 'Zbyt dużo zapytań do serwera.')
  },
}
const adminRateLimiter = {
  windowMs: 30 * 1000,
  max: 90,
  handler: () => {
    throw createError(429, 'Zbyt dużo zapytań do serwera.')
  },
}

const speedLimiter = {
  windowMs: 30 * 1000,
  delayAfter: 25,
  delayMs: 200,
}
const adminSpeedLimiter = {
  windowMs: 30 * 1000,
  delayAfter: 80,
  delayMs: 200,
}

export { rateLimiter, adminRateLimiter, speedLimiter, adminSpeedLimiter }
