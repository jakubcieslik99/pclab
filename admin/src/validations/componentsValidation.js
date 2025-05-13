const saveComponentErrors = {
  componentTitle: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 60, message: 'Maksymalna długość tytułu to 60 znaków.' },
  },
  componentURL: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 300, message: 'Maksymalna długość URL to 300 znaków.' },
    pattern: {
      value: /^((https?:\/\/)?)[a-zA-Z0-9]{1}[a-zA-Z0-9-.]{0,}\.[a-z]{2,13}[a-zA-Z0-9:/?#[\]@!$%&'()*+,;=\-._]{0,}$/,
      message: 'Niepoprawny format URL.',
    },
  },
  componentPrice: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 8, message: 'Maksymalna wartość ceny to 99999.99.' },
    pattern: { value: /^([0-9]+[.][0-9]{2})$/, message: 'Niepoprawny format ceny.' },
  },
  componentAmount: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 3, message: 'Maksymalna ilość sztuk to 999.' },
    pattern: { value: /^([0-9]+)$/, message: 'Niepoprawny format ilości sztuk.' },
  },
}

export { saveComponentErrors }
