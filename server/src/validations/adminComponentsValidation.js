import Joi from 'joi'

const getComponentsValidation = Joi.object({
  filtering: Joi.array().items(Joi.string().valid('all', 'case', 'cpu', 'mobo', 'ram', 'gpu', 'psu', 'drive')),
})

const createComponentValidation = Joi.object({
  title: Joi.string().required().max(60),
  type: Joi.string().valid('case', 'cpu', 'mobo', 'ram', 'gpu', 'psu', 'drive'),
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
    'lga1150'
  ),
  caseCompat: Joi.string().valid('', 'itx', 'matx', 'atx'),
  ramCompat: Joi.string().valid('', 'ddr5', 'ddr4', 'ddr3', 'ddr2'),
  url: Joi.string()
    .required()
    .max(300)
    .pattern(
      new RegExp(/^((https?:\/\/)?)[a-zA-Z0-9]{1}[a-zA-Z0-9-.]{0,}\.[a-z]{2,13}[a-zA-Z0-9:/?#[\]@!$%&'()*+,;=\-.]{0,}$/)
    ),
  price: Joi.number().required().integer().min(0).max(99999),
  amount: Joi.number().required().integer().min(0).max(999),
})

const updateComponentValidation = Joi.object({
  title: Joi.string().required().max(60),
  type: Joi.string().valid('case', 'cpu', 'mobo', 'ram', 'gpu', 'psu', 'drive'),
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
    'lga1150'
  ),
  caseCompat: Joi.string().valid('', 'itx', 'matx', 'atx'),
  ramCompat: Joi.string().valid('', 'ddr5', 'ddr4', 'ddr3', 'ddr2'),
  url: Joi.string()
    .required()
    .max(300)
    .pattern(
      new RegExp(/^((https?:\/\/)?)[a-zA-Z0-9]{1}[a-zA-Z0-9-.]{0,}\.[a-z]{2,13}[a-zA-Z0-9:/?#[\]@!$%&'()*+,;=\-.]{0,}$/)
    ),
  price: Joi.number().required().integer().min(0).max(99999),
  amount: Joi.number().required().integer().min(0).max(999),
})

export { getComponentsValidation, createComponentValidation, updateComponentValidation }
