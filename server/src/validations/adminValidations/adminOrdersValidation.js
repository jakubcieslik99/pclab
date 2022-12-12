import Joi from 'joi'

const getOrdersValidation = Joi.object({
  filtering: Joi.array().items(Joi.string().valid('all', 'awaiting', 'sent', 'unpaid', 'paying', 'canceled', 'returned')),
})

const updateOrderValidation = Joi.object({
  status: Joi.string().valid('awaiting', 'sent', 'returned'),
  tracking: Joi.string().allow('').max(100),
})

export { getOrdersValidation, updateOrderValidation }
