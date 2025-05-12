import { config } from '../config/utilities'

const placeOrderMessage = (to, nick, orderId) => {
  return {
    from: `PCLab 🖥️ <${config.NOREPLY_ADDRESS}>`,
    to,
    subject: '➕ Złożono zamówienie w serwisie PCLab 🖥️',
    text: `
      Witaj ${nick}! 
      Dziękujemy za złożenie zamówienia w PCLab.
      Pamiętaj, aby opłacić je w przeciągu 15 minut wybraną formą płatności.
      ${config.APP_URL}/order/${orderId}
    `,
    html: `
      <h1>Witaj ${nick}!</h1>
      <h4>Dziękujemy za złożenie zamówienia w PCLab.</h4>
      <p>Pamiętaj, aby opłacić je w przeciągu 15 minut wybraną formą płatności.</p>
      <a href="${config.APP_URL}/order/${orderId}">Przejdź do zamówienia</a>
    `,
  }
}

const canceledOrderMessage = (to, nick, orderId) => {
  return {
    from: `PCLab 🖥️ <${config.NOREPLY_ADDRESS}>`,
    to,
    subject: '❌ Anulowano zamówienie w serwisie PCLab 🖥️',
    text: `
      Witaj ${nick}! 
      Twoje zamówienie w PCLab zostało anulowane.
      Powodem anulowania Twojego zamówienia było nieopłacenie go w przeciągu 15 minut od momentu złożenia.
      ${config.APP_URL}/order/${orderId}
    `,
    html: `
      <h1>Witaj ${nick}!</h1>
      <h4>Twoje zamówienie w PCLab zostało anulowane.</h4>
      <p>Powodem anulowania Twojego zamówienia było nieopłacenie go w przeciągu 15 minut od momentu złożenia.</p>
      <a href="${config.APP_URL}/order/${orderId}">Przejdź do zamówienia</a>
    `,
  }
}

const successfulPaymentMessage = (to, nick, orderId) => {
  return {
    from: `PCLab 🖥️ <${config.NOREPLY_ADDRESS}>`,
    to,
    subject: '✔️ Opłacono zamówienie w serwisie PCLab 🖥️',
    text: `
      Witaj ${nick}! 
      Dziękujemy za opłacenie zamówienia w PCLab.
      Wszelkich informacji dotyczących statusu zamówienia możesz uzyskać na stronie zamówienia.
      ${config.APP_URL}/order/${orderId}
    `,
    html: `
      <h1>Witaj ${nick}!</h1>
      <h4>Dziękujemy za opłacenie zamówienia w PCLab.</h4>
      <p>Wszelkich informacji dotyczących statusu zamówienia możesz uzyskać na stronie zamówienia.</p>
      <a href="${config.APP_URL}/order/${orderId}">Przejdź do zamówienia</a>
    `,
  }
}

export { placeOrderMessage, canceledOrderMessage, successfulPaymentMessage }
