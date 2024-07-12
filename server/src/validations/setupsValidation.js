import Joi from 'joi'

const createCommentValidation = Joi.object({
  comment: Joi.string().required().max(500),
})

const getComponentsValidation = Joi.object({
  moboCompat: Joi.string().valid('', 'atx', 'matx', 'itx'),
  cpuCompat: Joi.string().valid(
    '',
    'am5',
    'am4',
    'am3+',
    'lga2066',
    'lga1700',
    'lga1200',
    'lga1156',
    'lga1155',
    'lga1151',
    'lga1150',
  ),
  caseCompat: Joi.string().valid('', 'itx', 'matx', 'atx'),
  ramCompat: Joi.string().valid('', 'ddr5', 'ddr4', 'ddr3', 'ddr2'),
})

const createSetupValidation = Joi.object({
  description: Joi.string().allow('').max(1000),
})

const updateSetupValidation = Joi.object({
  description: Joi.string().allow('').max(1000),
})

export { createCommentValidation, getComponentsValidation, createSetupValidation, updateSetupValidation }
