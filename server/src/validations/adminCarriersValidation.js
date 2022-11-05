import Joi from 'joi'

const createCarrierValidation = Joi.object({
  name: Joi.string().required().max(60),
  price: Joi.number().required().integer().min(0).max(9999),
})

const updateCarrierValidation = Joi.object({
  name: Joi.string().required().max(60),
  price: Joi.number().required().integer().min(0).max(9999),
})

export { createCarrierValidation, updateCarrierValidation }
