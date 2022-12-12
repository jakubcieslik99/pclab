import schedule from 'node-schedule'
import stripe from '../config/stripeOptions'
import Order from '../models/orderModel'
import Component from '../models/componentModel'
import { log } from '../config/utilities'
import sendEmail from '../functions/sendEmail'
import { canceledOrderMessage, successfulPaymentMessage } from '../messages/ordersMessages'

const runOrderSession = async (orderId, paymentTime) => {
  const paymentDate = new Date(paymentTime)

  log.info(`Ran payment session for order "${orderId}"`)

  schedule.scheduleJob(paymentDate, async () => {
    const order = await Order.findById(orderId)
      .populate([{ path: 'buyer', select: 'email nick' }])
      .exec()
    if (order?.status === 'unpaid') {
      const paymentIntent = await stripe.paymentIntents.retrieve(order.paymentIntent)

      if (paymentIntent?.status === 'processing') {
        order.status = 'paying'
        await order.save()
      } else if (paymentIntent?.status === 'succeeded') {
        order.status = 'awaiting'
        await order.save()

        await sendEmail(successfulPaymentMessage(order.buyer.email.toLowerCase(), order.buyer.nick, order.id))
      } else if (paymentIntent) {
        paymentIntent.status !== 'canceled' && (await stripe.paymentIntents.cancel(paymentIntent.id))

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

        await sendEmail(canceledOrderMessage(order.buyer.email.toLowerCase(), order.buyer.nick, order.id))
      }
    }
  })
}

export { runOrderSession }
