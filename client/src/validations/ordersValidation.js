const placeOrderErrors = {
  placeOrderEmail: {
    required: {
      value: true,
      message: 'Pole wymagane.',
    },
    maxLength: {
      value: 60,
      message: 'Maksymalna długość adresu email to 60 znaków.',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Niepoprawny format adresu email.',
    },
  },
  placeOrderPhone: {
    required: {
      value: true,
      message: 'Pole wymagane.',
    },
    pattern: {
      value: /^([0-9]{9})$/,
      message: 'Niepoprawny format numeru telefonu.',
    },
  },
  placeOrderFirstname: {
    required: {
      value: true,
      message: 'Pole wymagane.',
    },
    maxLength: {
      value: 30,
      message: 'Maksymalna długość imienia to 30 znaków.',
    },
    pattern: {
      value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšśžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      message: 'Niepoprawny format imienia.',
    },
  },
  placeOrderLastname: {
    required: {
      value: true,
      message: 'Pole wymagane.',
    },
    maxLength: {
      value: 40,
      message: 'Maksymalna długość nazwiska to 40 znaków.',
    },
    pattern: {
      value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšśžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      message: 'Niepoprawny format nazwiska.',
    },
  },
  placeOrderAddress: {
    required: {
      value: true,
      message: 'Pole wymagane.',
    },
    maxLength: {
      value: 50,
      message: 'Maksymalna długość adresu to 50 znaków.',
    },
    pattern: {
      value: /^[a-zżźćńąśłęóA-ZŻŹĆŃĄŚŁĘÓ0-9 ,.'-]+$/,
      message: 'Niepoprawny format adresu.',
    },
  },
  placeOrderAddressTwo: {
    maxLength: {
      value: 30,
      message: 'Maksymalna długość drugiej części adresu to 30 znaków.',
    },
    pattern: {
      value: /^[a-zżźćńąśłęóA-ZŻŹĆŃĄŚŁĘÓ0-9 ,.'-]+$/,
      message: 'Niepoprawny format drugiej części adresu.',
    },
  },
  placeOrderPostal: {
    required: {
      value: true,
      message: 'Pole wymagane.',
    },
    pattern: {
      value: /^([0-9]{2}[-][0-9]{3})$/,
      message: 'Niepoprawny format kodu pocztowego.',
    },
  },
  placeOrderCity: {
    required: {
      value: true,
      message: 'Pole wymagane.',
    },
    maxLength: {
      value: 30,
      message: 'Maksymalna długość miejscowości to 30 znaków.',
    },
    pattern: {
      value: /^[a-zżźćńąśłęóA-ZŻŹĆŃĄŚŁĘÓ -.()]+$/,
      message: 'Niepoprawny format miejscowości.',
    },
  },
  placeOrderCarrier: {
    required: {
      value: true,
      message: 'Pole wymagane.',
    },
  },
}

export { placeOrderErrors }
