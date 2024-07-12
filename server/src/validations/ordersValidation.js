import Joi from 'joi'

const placeOrderValidation = Joi.object({
  email: Joi.string()
    .required()
    .max(60)
    .pattern(
      new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ),
    ),
  phone: Joi.string()
    .required()
    .pattern(new RegExp(/^([0-9]{9})$/)),
  firstname: Joi.string()
    .required()
    .max(30)
    .pattern(
      new RegExp(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšśžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      ),
    ),
  lastname: Joi.string()
    .required()
    .max(40)
    .pattern(
      new RegExp(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšśžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      ),
    ),
  address: Joi.string()
    .required()
    .max(50)
    .pattern(new RegExp(/^[a-zżźćńąśłęóA-ZŻŹĆŃĄŚŁĘÓ0-9 ,.'-]+$/)),
  addressTwo: Joi.string()
    .allow('')
    .max(30)
    .pattern(new RegExp(/^[a-zżźćńąśłęóA-ZŻŹĆŃĄŚŁĘÓ0-9 ,.'-]+$/)),
  postal: Joi.string()
    .required()
    .pattern(new RegExp(/^([0-9]{2}[-][0-9]{3})$/)),
  city: Joi.string()
    .required()
    .max(30)
    .pattern(new RegExp(/^[a-zżźćńąśłęóA-ZŻŹĆŃĄŚŁĘÓ -.()]+$/)),
})

export { placeOrderValidation }
