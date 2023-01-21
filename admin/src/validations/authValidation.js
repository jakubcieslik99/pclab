const loginErrors = {
  loginEmail: {
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
  loginPassword: {
    required: {
      value: true,
      message: 'Pole wymagane.',
    },
    minLength: {
      value: 8,
      message: 'Minimalna długość hasła to 8 znaków.',
    },
    maxLength: {
      value: 60,
      message: 'Maksymalna długość hasła to 60 znaków.',
    },
  },
}

export { loginErrors }
