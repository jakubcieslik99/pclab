import createError from 'http-errors'
import { isValidObjectId } from 'mongoose'
import Order from '../../models/orderModel'
import User from '../../models/userModel'
import { getOrdersValidation, updateOrderValidation } from '../../validations/adminValidations/adminOrdersValidation'
import stripe from '../../config/stripeOptions'
import { config, log } from '../../config/utilities'
import handleOrder from '../../functions/stripeWebhook'

// GET - /admin/orders/getOrders
const getOrders = async (req, res) => {
  const page = req.query.page ? req.query.page : 1
  const limit = req.query.limit ? req.query.limit : 15

  let sort = {}
  if (req.query.sorting && req.query.sorting === 'total_price_highest') sort = { amount: -1 }
  else if (req.query.sorting && req.query.sorting === 'total_price_lowest') sort = { amount: 1 }
  else if (req.query.sorting && req.query.sorting === 'oldest') sort = { createdAt: 1 }
  else if (req.query.sorting && req.query.sorting === 'newest') sort = { createdAt: -1 }
  else sort = { createdAt: -1 }

  let query = {}

  let matchUsers = []
  if (req.query.searching) {
    matchUsers = await User.find({ email: { $regex: req.query.searching, $options: 'i' } })
      .select('_id')
      .exec()

    query = {
      ...query,
      ...{
        $or: [
          { _id: isValidObjectId(req.query.searching) ? req.query.searching : null },
          { buyer: { $in: matchUsers } },
          { orderedSetup: isValidObjectId(req.query.searching) ? req.query.searching : null },
        ],
      },
    }
  }

  if (req.query.filtering && req.query.filtering !== 'all') {
    let filtering = []
    req.query.filtering.split(',').forEach(element => filtering.push(element))

    const validationResult = await getOrdersValidation.validateAsync({ filtering })
    if (!validationResult.filtering.includes('all')) query = { ...query, ...{ status: { $in: validationResult.filtering } } }
  }

  const count = await Order.find(query).countDocuments().exec()
  const listedOrders = await Order.find(query)
    .populate([{ path: 'buyer', select: 'email' }])
    .select('buyer orderedSetup totalPrice status createdAt')
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

  return res.status(200).send({ count, orders: listedOrders })
}
// GET - /admin/orders/getOrder/:id
const getOrder = async (req, res) => {
  const listedOrder = await Order.findById(req.params.id)
    .populate([{ path: 'buyer', select: 'email' }])
    .exec()
  if (!listedOrder) throw createError(404, 'Podane zamówienie nie istnieje.')

  return res.status(200).send({ order: listedOrder })
}

// PUT - /admin/orders/updateOrder
const updateOrder = async (req, res) => {
  const validationResult = await updateOrderValidation.validateAsync(req.body)

  const updatedOrder = await Order.findById(req.params.id)
    .populate([{ path: 'buyer', select: 'email' }])
    .exec()
  if (!updatedOrder) throw createError(404, 'Podane zamówienie nie istnieje.')

  if ((validationResult.status === 'awaiting' || validationResult.status === 'sent') && !validationResult.tracking)
    throw createError(406, 'Numer śledzenia przesyłki jest wymagany przy tym statusie.')

  updatedOrder.status = validationResult.status
  updatedOrder.selectedCarrier.tracking = validationResult.tracking

  await updatedOrder.save()

  return res.status(200).send({ message: 'Zaktualizowano zamówienie.', order: updatedOrder })
}

// POST - /admin/orders/stripeWebhook
const stripeWebhook = (req, res) => {
  let event = req.body

  if (config.STRIPE_ENDPOINT_SECRET) {
    const signature = req.headers['stripe-signature']

    try {
      event = stripe.webhooks.constructEvent(req.body, signature, config.STRIPE_ENDPOINT_SECRET)
    } catch (error) {
      log.error(error.message)
      return res.sendStatus(400)
    }
  }

  const paymentIntent = event.data.object
  switch (event.type) {
    case 'payment_intent.succeeded':
      log.info('Stripe payment succeeded')
      handleOrder(paymentIntent.id, 'succeeded')
      break
    case 'payment_intent.payment_failed':
      log.error('Stripe payment failed')
      handleOrder(paymentIntent.id, 'failed')
      break
    case 'charge.refunded':
      log.info('Stripe payment refunded/partially refunded')
      handleOrder(paymentIntent.payment_intent, 'refunded')
      break
    default:
  }

  res.status(200).send()
}

export { getOrders, getOrder, updateOrder, stripeWebhook }
