import Joi from 'joi'

const createCommentValidation = Joi.object({
  comment: Joi.string().required().max(500),
})

const createSetupValidation = Joi.object({
  description: Joi.string().allow('').max(1000),
})

const updateSetupValidation = Joi.object({
  description: Joi.string().allow('').max(1000),
})

export { createCommentValidation, createSetupValidation, updateSetupValidation }
