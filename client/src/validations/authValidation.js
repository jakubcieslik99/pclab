const registerErrors = {
  registerEmail: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 60, message: 'Maksymalna długość adresu email to 60 znaków.' },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Niepoprawny format adresu email.',
    },
  },
  registerNick: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 30, message: 'Maksymalna długość nicku to 30 znaków.' },
    pattern: {
      value: /^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšśžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð_-]+$/,
      message: 'Niepoprawny format nicku.',
    },
  },
  registerPassword: {
    required: { value: true, message: 'Pole wymagane.' },
    minLength: { value: 8, message: 'Minimalna długość hasła to 8 znaków.' },
    maxLength: { value: 60, message: 'Maksymalna długość hasła to 60 znaków.' },
  },
  registerRepassword: { required: { value: true, message: 'Pole wymagane.' } },
  registerTerms: { required: { value: true, message: 'Pole wymagane.' } },
}

const loginErrors = {
  loginEmail: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 60, message: 'Maksymalna długość adresu email to 60 znaków.' },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Niepoprawny format adresu email.',
    },
  },
  loginPassword: {
    required: { value: true, message: 'Pole wymagane.' },
    minLength: { value: 8, message: 'Minimalna długość hasła to 8 znaków.' },
    maxLength: { value: 60, message: 'Maksymalna długość hasła to 60 znaków.' },
  },
}

const updateAccountErrors = {
  profileEmail: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 60, message: 'Maksymalna długość adresu email to 60 znaków.' },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Niepoprawny format adresu email.',
    },
  },
  profileNick: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 60, message: 'Maksymalna długość nicku to 30 znaków.' },
    pattern: {
      value: /^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšśžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð_-]+$/,
      message: 'Niepoprawny format nicku.',
    },
  },
  profilePassword: {
    required: { value: true, message: 'Pole wymagane.' },
    minLength: { value: 8, message: 'Minimalna długość hasła to 8 znaków.' },
    maxLength: { value: 60, message: 'Maksymalna długość hasła to 60 znaków.' },
  },
  profileNewpassword: {
    minLength: { value: 8, message: 'Minimalna długość hasła to 8 znaków.' },
    maxLength: { value: 60, message: 'Maksymalna długość hasła to 60 znaków.' },
  },
}

const sendPasswordResetErrors = {
  resetEmail: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 60, message: 'Maksymalna długość adresu email to 60 znaków.' },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Niepoprawny format adresu email.',
    },
  },
}

const resetPasswordErrors = {
  setPassword: {
    required: { value: true, message: 'Pole wymagane.' },
    minLength: { value: 8, message: 'Minimalna długość hasła to 8 znaków.' },
    maxLength: { value: 60, message: 'Maksymalna długość hasła to 60 znaków.' },
  },
  setRepassword: { required: { value: true, message: 'Pole wymagane.' } },
}

export { registerErrors, loginErrors, updateAccountErrors, sendPasswordResetErrors, resetPasswordErrors }
