import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../../models/userModel'
import { config } from '../../config/utilities'
import { loginValidation } from '../../validations/adminAuthValidation'
import { getAccessToken, getRefreshToken } from '../../functions/generateTokens'

//POST - /admin/auth/login
const login = async (req, res) => {
  if (req.cookies?.refreshToken) throw createError(409, 'Użytkownik jest zalogowany.')

  const validationResult = await loginValidation.validateAsync(req.body)

  const loggedAdmin = await User.findOne({ email: validationResult.email.toLowerCase(), isAdmin: true }).exec()
  if (!loggedAdmin) throw createError(404, 'Konto administratora nie istnieje lub zostało usunięte.')

  if (!loggedAdmin.confirmed) throw createError(401, 'Email nie został potwierdzony.')

  const checkPassword = await bcrypt.compare(validationResult.password, loggedAdmin.password)
  if (!checkPassword) throw createError(401, 'Błędny email lub hasło.')

  const accessToken = await getAccessToken(loggedAdmin.id, loggedAdmin.email, loggedAdmin.nick, loggedAdmin.isAdmin)
  if (!accessToken) throw createError(500, 'Błąd serwera.')
  const refreshToken = await getRefreshToken(loggedAdmin.id, loggedAdmin.email, loggedAdmin.nick, loggedAdmin.isAdmin)
  if (!refreshToken) throw createError(500, 'Błąd serwera.')

  loggedAdmin.refreshTokens = loggedAdmin.refreshTokens.filter(element => element.expirationDate > Date.now())
  loggedAdmin.refreshTokens.push({ refreshToken, expirationDate: Date.now() + 90 * 24 * 3600 * 1000 })
  await loggedAdmin.save()

  return res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: config.ENV !== 'test' ? true : false,
      maxAge: 90 * 24 * 3600 * 1000, //90 days
    })
    .status(200)
    .send({
      message: 'Zalogowano pomyślnie. Nastąpi przekierowanie do panelu administratora.',
      userInfo: {
        id: loggedAdmin.id,
        email: loggedAdmin.email,
        nick: loggedAdmin.nick,
        isAdmin: loggedAdmin.isAdmin,
      },
      accessToken: accessToken,
    })
}

//GET - /admin/auth/refreshAccessToken
const refreshAccessToken = async (req, res) => {
  if (!req.cookies?.refreshToken) throw createError(401, 'Błąd autoryzacji.')

  const checkedAdmin = await User.findOne({ 'refreshTokens.refreshToken': req.cookies.refreshToken, isAdmin: true }).exec()
  if (!checkedAdmin) throw createError(401, 'Błąd autoryzacji.')

  jwt.verify(req.cookies.refreshToken, config.JWT_REFRESH_TOKEN_SECRET, async (error, decode) => {
    if (error || checkedAdmin.id !== decode.id) throw createError(401, 'Błąd autoryzacji.')

    const accessToken = await getAccessToken(decode.id, decode.email)
    if (!accessToken) throw createError(500, 'Błąd serwera.')

    return res.status(201).send({ accessToken })
  })
}
//GET - /admin/auth/logout
const logout = async (req, res) => {
  if (!req.cookies?.refreshToken) return res.sendStatus(204)

  const checkedAdmin = await User.findOne({ 'refreshTokens.refreshToken': req.cookies.refreshToken, isAdmin: true }).exec()
  if (!checkedAdmin)
    return res
      .clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: config.ENV !== 'test' ? true : false })
      .sendStatus(204)

  checkedAdmin.refreshTokens = checkedAdmin.refreshTokens.filter(
    element => element.refreshToken !== req.cookies.refreshToken
  )
  await checkedAdmin.save()

  return res
    .clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: config.ENV !== 'test' ? true : false })
    .sendStatus(204)
}

//temporary controller for testing purposes (GET - /admin/auth/tempRegister)
const tempRegister = async (_req, res) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash('admin123', salt)

  const registerUser = new User({
    email: 'admin@gmail.com',
    nick: 'Administrator',
    password: hashedPassword,
    isAdmin: true,
    token: null,
    confirmed: true,
  })
  await registerUser.save()

  console.log('Zarejestrowano pomyślnie.')
  return res.status(201).send({
    message: 'Zarejestrowano pomyślnie.',
  })
}

export { login, refreshAccessToken, logout, tempRegister }
