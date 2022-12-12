import Order from '../models/orderModel'
import Component from '../models/componentModel'
import Setup from '../models/setupModel'
import stripe from '../config/stripeOptions'
import sendEmail from '../functions/sendEmail'
import { canceledOrderMessage, successfulPaymentMessage } from '../messages/ordersMessages'

const handleOrder = async (paymentIntentId, status) => {
  const order = await Order.findOne({ paymentIntent: paymentIntentId })
    .populate([{ path: 'buyer', select: 'email nick' }])
    .exec()

  if (order && status === 'succeeded') {
    order.status = 'awaiting'
    await order.save()

    order.buyer.email &&
      (await sendEmail(successfulPaymentMessage(order.buyer.email.toLowerCase(), order.buyer.nick, order.id)))
  } else if (order && status === 'failed' && new Date().getTime() > order.paymentTime) {
    await stripe.paymentIntents.cancel(paymentIntentId)

    if (order.status !== 'canceled') {
      order.orderedComponents.forEach(async component => {
        const returnedComponent = await Component.findById(component.componentId).exec()
        if (returnedComponent) {
          returnedComponent.amount++
          await returnedComponent.save()
        }
      })
      const revertedSetup = await Setup.findById(order.orderedSetup).exec()
      if (revertedSetup) {
        revertedSetup.bought--
        await revertedSetup.save()
      }

      order.status = 'canceled'
      await order.save()

      order.buyer.email &&
        (await sendEmail(canceledOrderMessage(order.buyer.email.toLowerCase(), order.buyer.nick, order.id)))
    }
  } else if (order && status === 'refunded') {
    order.status = 'refunded'
    await order.save()
  } else if (!order) await stripe.refunds.create({ payment_intent: paymentIntentId })
}

export default handleOrder
