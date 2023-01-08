import createError from 'http-errors'
import Order from '../models/orderModel'
import Setup from '../models/setupModel'
import Component from '../models/componentModel'
import Carrier from '../models/carrierModel'
import stripe from '../config/stripeOptions'
import { placeOrderValidation } from '../validations/ordersValidation'
import { runOrderSession } from '../functions/orderSessions'
import sendEmail from '../functions/sendEmail'
import { placeOrderMessage, canceledOrderMessage, successfulPaymentMessage } from '../messages/ordersMessages'

//GET - /orders/getOrder/:id
const getOrder = async (req, res) => {
  const { authenticatedUser } = res.locals

  const order = await Order.findById(req.params.id).populate('orderedComponents.componentId').select('-orderedSetup').exec()
  if (!order || order.buyer.toString() !== authenticatedUser.id) throw createError(404, 'Podane zamówienie nie istnieje.')

  let paymentKey = 'finalized'
  if (order.status === 'unpaid' || order.status === 'paying') {
    const paymentIntent = await stripe.paymentIntents.retrieve(order.paymentIntent)

    if (!paymentIntent) throw createError(500, 'Błąd zamówienia, nie może zostać ono zrealizowane.')
    else if (paymentIntent.status === 'processing') {
      if (order.status !== 'paying') {
        order.status = 'paying'
        await order.save()
      }
      paymentKey = 'processing'
    } else if (paymentIntent.status === 'succeeded') {
      order.status = 'awaiting'
      await order.save()

      await sendEmail(successfulPaymentMessage(authenticatedUser.email.toLowerCase(), authenticatedUser.nick, order.id))
    } else if (paymentIntent.status === 'canceled' || new Date().getTime() > order.paymentTime) {
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

      await sendEmail(canceledOrderMessage(authenticatedUser.email.toLowerCase(), authenticatedUser.nick, order.id))
    } else paymentKey = paymentIntent.client_secret
  }

  return res.status(200).send({ order, paymentKey })
}

//GET - /orders/getCarriers
const getCarriers = async (req, res) => {
  const listedCarriers = await Carrier.find().select('name price').exec()

  return res.status(200).send({ carriers: listedCarriers })
}

//POST - /orders/placeOrder
const placeOrder = async (req, res) => {
  const { authenticatedUser } = res.locals

  const validationResult = await placeOrderValidation.validateAsync(req.body.shippingDetails)

  const unpaidOrders = await Order.find({ buyer: authenticatedUser.id, status: 'pending' }).exec()
  if (unpaidOrders.length > 0) throw createError(402, 'Posiadasz nieopłacone zamówienie. Opłać je zanim złożysz kolejne.')

  const carrier = await Carrier.findById(req.body.carrierId).select('name price').exec()
  if (!carrier) throw createError(404, 'Podany przewoźnik nie istnieje.')

  const selectedCarrier = {
    carrier: carrier.id,
    name: carrier.name,
    price: carrier.price,
    tracking: '',
  }

  const setup = await Setup.findById(req.body.setupId).select('-addedBy -description -likes -comments').exec()
  if (!setup) throw createError(404, 'Podany zestaw nie istnieje.')

  const setupCase = await Component.findById(setup.case).exec()
  const setupCpu = setup.cpu ? await Component.findById(setup.cpu).exec() : null
  const setupMobo = setup.mobo ? await Component.findById(setup.mobo).exec() : null
  const setupRam = setup.ram ? await Component.findById(setup.ram).exec() : null
  const setupGpu = setup.gpu ? await Component.findById(setup.gpu).exec() : null
  const setupPsu = setup.psu ? await Component.findById(setup.psu).exec() : null
  const setupDriveOne = setup.driveOne ? await Component.findById(setup.driveOne).exec() : null
  const setupDriveTwo = setup.driveTwo ? await Component.findById(setup.driveTwo).exec() : null
  const setupDriveThree = setup.driveThree ? await Component.findById(setup.driveThree).exec() : null

  let orderedComponents = []
  let componentsPrice = 0
  if (setupCase.amount > 0) {
    orderedComponents.push({
      componentId: setupCase.id,
      title: setupCase.title,
      type: setupCase.type,
      moboCompat: setupCase.moboCompat,
      url: setupCase.url,
      price: setupCase.price,
      images: setupCase.images,
    })
    componentsPrice += setupCase.price
    setupCase.amount--
  } else throw createError(400, 'Obudowa z wybranego zestawu nie jest aktualnie dostępna.')
  if (setupCpu && setupCpu.amount > 0) {
    orderedComponents.push({
      componentId: setupCpu.id,
      title: setupCpu.title,
      type: setupCpu.type,
      cpuCompat: setupCpu.cpuCompat,
      ramCompat: setupCpu.ramCompat,
      url: setupCpu.url,
      price: setupCpu.price,
      images: setupCpu.images,
    })
    componentsPrice += setupCpu.price
    setupCpu.amount--
  } else if (setupCpu) throw createError(400, 'Procesor z wybranego zestawu nie jest aktualnie dostępny.')
  if (setupMobo && setupMobo.amount > 0) {
    orderedComponents.push({
      componentId: setupMobo.id,
      title: setupMobo.title,
      type: setupMobo.type,
      cpuCompat: setupMobo.cpuCompat,
      caseCompat: setupMobo.caseCompat,
      ramCompat: setupMobo.ramCompat,
      url: setupMobo.url,
      price: setupMobo.price,
      images: setupMobo.images,
    })
    componentsPrice += setupMobo.price
    setupMobo.amount--
  } else if (setupMobo) throw createError(400, 'Płyta główna z wybranego zestawu nie jest aktualnie dostępna.')
  if (setupRam && setupRam.amount > 0) {
    orderedComponents.push({
      componentId: setupRam.id,
      title: setupRam.title,
      type: setupRam.type,
      ramCompat: setupRam.ramCompat,
      url: setupRam.url,
      price: setupRam.price,
      images: setupRam.images,
    })
    componentsPrice += setupRam.price
    setupRam.amount--
  } else if (setupRam) throw createError(400, 'Pamięć RAM z wybranego zestawu nie jest aktualnie dostępna.')
  if (setupGpu && setupGpu.amount > 0) {
    orderedComponents.push({
      componentId: setupGpu.id,
      title: setupGpu.title,
      type: setupGpu.type,
      url: setupGpu.url,
      price: setupGpu.price,
      images: setupGpu.images,
    })
    componentsPrice += setupGpu.price
    setupGpu.amount--
  } else if (setupGpu) throw createError(400, 'Karta graficzna z wybranego zestawu nie jest aktualnie dostępna.')
  if (setupPsu && setupPsu.amount > 0) {
    orderedComponents.push({
      componentId: setupPsu.id,
      title: setupPsu.title,
      type: setupPsu.type,
      url: setupPsu.url,
      price: setupPsu.price,
      images: setupPsu.images,
    })
    componentsPrice += setupPsu.price
    setupPsu.amount--
  } else if (setupPsu) throw createError(400, 'Zasilacz z wybranego zestawu nie jest aktualnie dostępny.')
  if (setupDriveOne && setupDriveOne.amount > 0) {
    orderedComponents.push({
      componentId: setupDriveOne.id,
      title: setupDriveOne.title,
      type: setupDriveOne.type,
      url: setupDriveOne.url,
      price: setupDriveOne.price,
      images: setupDriveOne.images,
    })
    componentsPrice += setupDriveOne.price
    setupDriveOne.amount--
  } else if (setupDriveOne) throw createError(400, 'Dysk z wybranego zestawu nie jest aktualnie dostępny.')
  if (setupDriveTwo && setupDriveTwo.amount > 0) {
    orderedComponents.push({
      componentId: setupDriveTwo.id,
      title: setupDriveTwo.title,
      type: setupDriveTwo.type,
      url: setupDriveTwo.url,
      price: setupDriveTwo.price,
      images: setupDriveTwo.images,
    })
    componentsPrice += setupDriveTwo.price
    setupDriveTwo.amount--
  } else if (setupDriveTwo) throw createError(400, 'Jeden z dysków z wybranego zestawu nie jest aktualnie dostępny.')
  if (setupDriveThree && setupDriveThree.amount > 0) {
    orderedComponents.push({
      componentId: setupDriveThree.id,
      title: setupDriveThree.title,
      type: setupDriveThree.type,
      url: setupDriveThree.url,
      price: setupDriveThree.price,
      images: setupDriveThree.images,
    })
    componentsPrice += setupDriveThree.price
    setupDriveThree.amount--
  } else if (setupDriveThree) throw createError(400, 'Jeden z dysków z wybranego zestawu nie jest aktualnie dostępny.')

  await setupCase.save()
  setupCpu && (await setupCpu.save())
  setupMobo && (await setupMobo.save())
  setupRam && (await setupRam.save())
  setupGpu && (await setupGpu.save())
  setupPsu && (await setupPsu.save())
  setupDriveOne && (await setupDriveOne.save())
  setupDriveTwo && (await setupDriveTwo.save())
  setupDriveThree && (await setupDriveThree.save())

  setup.bought++
  await setup.save()

  const totalPrice = componentsPrice + carrier.price

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice,
    currency: 'pln',
    payment_method_types: ['card', 'blik', 'p24'],
    receipt_email: authenticatedUser.email,
  })

  const newOrder = new Order({
    buyer: authenticatedUser.id,
    orderedSetup: setup.id,
    orderedComponents,
    componentsPrice,
    selectedCarrier,
    shippingDetails: validationResult,
    totalPrice,
    paymentTime: new Date().getTime() + 900000,
    paymentIntent: paymentIntent.id,
  })

  await newOrder.save()

  await sendEmail(placeOrderMessage(authenticatedUser.email.toLowerCase(), authenticatedUser.nick, newOrder.id))

  await runOrderSession(newOrder.id, newOrder.paymentTime)

  return res.status(200).send({ orderId: newOrder.id })
}

export { getOrder, getCarriers, placeOrder }
