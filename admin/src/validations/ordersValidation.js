const updateOrderErrors = {
  orderStatus: {
    pattern: {
      value: /^\b(unpaid|paying|canceled|awaiting|sent|returned)\b/,
      message: 'Niepoprawny format statusu zamówienia.',
    },
  },
  orderTracking: {
    maxLength: {
      value: 100,
      message: 'Maksymalna długość numeru przesyłki to 100 znaków.',
    },
  },
}

export { updateOrderErrors }
