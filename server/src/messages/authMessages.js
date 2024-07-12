import { config } from '../config/utilities'

const registerMessage = (to, nick, token) => {
  return {
    from: `PCLab 🖥️ <${config.NOREPLY_ADDRESS}>`,
    to,
    subject: '🛡️ Potwierdź rejestrację w serwisie PCLab 🖥️',
    text: `
      Witaj ${nick}! 
      Dziękujemy za rejestrację w PCLab. 
      Proszę skopiuj i wklej w przeglądarce poniższy link w celu potwierdzenia swojego konta w serwisie.
      ${config.APP_URL}/login?confirmToken=${token}
    `,
    html: `
      <h1>Witaj ${nick}!</h1>
      <h4>Dziękujemy za rejestrację w PCLab.</h4>
      <p>Proszę kliknij poniższy link w celu potwierdzenia swojego konta w serwisie.</p>
      <a href="${config.APP_URL}/login?confirmToken=${token}">Potwierdź</a>
    `,
  }
}

const sendPasswordResetMessage = (to, nick, token) => {
  return {
    from: `PCLab 🖥️ <${config.NOREPLY_ADDRESS}>`,
    to,
    subject: '🛡️ Zresetuj hasło w serwisie PCLab 🖥️',
    text: `
      Witaj ${nick}!
      Na Twoim koncie została wygenerowana prośba o zresetowanie hasła. Jeśli prośba nie została wygenerowana przez Ciebie, zignoruj tą wiadomość.
      Proszę skopiuj i wklej w przeglądarce poniższy link w celu zresetowania swojego hasła w serwisie.
      ${config.APP_URL}/login?resetToken=${token}
    `,
    html: `
      <h1>Witaj ${nick}!</h1>
      <h4>Na Twoim koncie została wygenerowana prośba o zresetowanie hasła. Jeśli prośba nie została wygenerowana przez Ciebie, zignoruj tą wiadomość. </h4>
      <p>Proszę kliknij poniższy link w celu zresetowania swojego hasła w serwisie.</p>
      <a href="${config.APP_URL}/login?resetToken=${token}">Ustaw nowe hasło</a>
    `,
  }
}

export { registerMessage, sendPasswordResetMessage }
