import Joi from 'joi'

const loginValidation = Joi.object({
  email: Joi.string()
    .required()
    .max(60)
    .pattern(
      new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ),
    ),
  password: Joi.string().required().min(8).max(60),
})

export { loginValidation }
