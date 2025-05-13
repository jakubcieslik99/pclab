const saveCarrierErrors = {
  carrierName: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 60, message: 'Maksymalna długość nazwy przewoźnika to 60 znaków.' },
  },
  carrierPrice: {
    required: { value: true, message: 'Pole wymagane.' },
    maxLength: { value: 5, message: 'Maksymalna wartość ceny to 99.99.' },
    pattern: { value: /^([0-9]+[.][0-9]{2})$/, message: 'Niepoprawny format ceny.' },
  },
}

export { saveCarrierErrors }
