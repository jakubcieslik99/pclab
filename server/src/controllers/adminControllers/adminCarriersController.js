import createError from 'http-errors'
import Carrier from '../../models/carrierModel'
import { createCarrierValidation, updateCarrierValidation } from '../../validations/adminValidations/adminCarriersValidation'

// GET - /admin/carriers/getCarriers
const getCarriers = async (req, res) => {
  const page = req.query.page ? req.query.page : 1
  const limit = req.query.limit ? req.query.limit : 15

  let query = {}
  if (req.query.searching) {
    query = { ...query, ...{ name: { $regex: req.query.searching, $options: 'i' } } }
  }

  let sort = {}
  if (req.query.sorting && req.query.sorting === 'price_highest') sort = { price: -1 }
  else if (req.query.sorting && req.query.sorting === 'price_lowest') sort = { price: 1 }
  else if (req.query.sorting && req.query.sorting === 'z_a') sort = { name: -1 }
  else if (req.query.sorting && req.query.sorting === 'a_z') sort = { name: 1 }
  else if (req.query.sorting && req.query.sorting === 'oldest') sort = { createdAt: 1 }
  else if (req.query.sorting && req.query.sorting === 'newest') sort = { createdAt: -1 }
  else sort = { createdAt: -1 }

  const count = await Carrier.find(query).countDocuments().exec()
  const listedCarriers = await Carrier.find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

  return res.status(200).send({ count, carriers: listedCarriers })
}

// POST - /admin/carriers/createCarrier
const createCarrier = async (req, res) => {
  const validationResult = await createCarrierValidation.validateAsync(req.body)

  const newCarrier = new Carrier({ name: validationResult.name, price: validationResult.price })

  await newCarrier.save()

  return res.status(201).send({ message: 'Dodano nowego przewoźnika.', carrier: newCarrier })
}

// PUT - /admin/carriers/updateCarrier/:id
const updateCarrier = async (req, res) => {
  const validationResult = await updateCarrierValidation.validateAsync(req.body)

  const updatedCarrier = await Carrier.findById(req.params.id).exec()
  if (!updatedCarrier) throw createError(404, 'Podany przewoźnik nie istnieje.')

  updatedCarrier.name = validationResult.name
  updatedCarrier.price = validationResult.price

  await updatedCarrier.save()

  return res.status(200).send({ message: 'Zaktualizowano przewoźnika.', carrier: updatedCarrier })
}

// DELETE - /admin/carriers/deleteCarrier/:id
const deleteCarrier = async (req, res) => {
  const deletedCarrier = await Carrier.findById(req.params.id).exec()
  if (!deletedCarrier) throw createError(404, 'Podany przewoźnik nie istnieje.')

  await deletedCarrier.deleteOne(deletedCarrier.id)

  return res
    .status(200)
    .send({
      message: 'Usunięto przewoźnika. Wcześniejsze zamówienia zawierające dostawę z jego użyciem pozostaną bez zmian.',
    })
}

export { getCarriers, createCarrier, updateCarrier, deleteCarrier }
