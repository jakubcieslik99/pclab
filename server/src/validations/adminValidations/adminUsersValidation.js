import Joi from 'joi'

const updateUserValidation = Joi.object({ isAdmin: Joi.string().valid('yes', 'no') })

export { updateUserValidation }
