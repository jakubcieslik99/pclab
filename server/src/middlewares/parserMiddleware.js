import express from 'express'

const bodyParser = (req, res, next) => {
  if (req.originalUrl === '/admin/orders/stripeWebhook') next()
  else express.json({ limit: '3mb' })(req, res, next)
}

export default bodyParser
