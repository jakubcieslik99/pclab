import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../../models/userModel'
import { config } from '../../config/utilities'
import { loginValidation } from '../../validations/adminValidations/adminAuthValidation'
import { getAccessToken, getRefreshToken } from '../../functions/generateTokens'

// POST - /admin/auth/login
const login = async (req, res) => {
  if (req.cookies?.refreshTokenAdmin) {
    const checkedAdmin = await User.findOne({
      'refreshTokensAdmin.refreshToken': req.cookies.refreshTokenAdmin,
      isAdmin: true,
    }).exec()

    if (checkedAdmin) {
      checkedAdmin.refreshTokensAdmin = checkedAdmin.refreshTokensAdmin.filter(
        element => element.refreshToken !== req.cookies.refreshTokenAdmin,
      )
      await checkedAdmin.save()
    }

    res.clearCookie('refreshTokenAdmin', {
      httpOnly: true,
      sameSite: 'none',
      secure: config.ENV === 'production' ? true : false,
    })
    throw createError(409, 'Użytkownik jest zalogowany. Wyloguj się lub spróbuj ponownie.')
  }

  const validationResult = await loginValidation.validateAsync(req.body)

  const loggedAdmin = await User.findOne({ email: validationResult.email.toLowerCase(), isAdmin: true }).exec()
  if (!loggedAdmin) throw createError(404, 'Konto administratora nie istnieje lub zostało usunięte.')

  if (!loggedAdmin.confirmed) throw createError(401, 'Email nie został potwierdzony.')

  const checkPassword = await bcrypt.compare(validationResult.password, loggedAdmin.password)
  if (!checkPassword) throw createError(401, 'Błędny email lub hasło.')

  const accessToken = await getAccessToken(loggedAdmin.id, loggedAdmin.email, loggedAdmin.nick, loggedAdmin.isAdmin)
  if (!accessToken) throw createError(500, 'Błąd serwera.')
  const refreshTokenAdmin = await getRefreshToken(loggedAdmin.id, loggedAdmin.email, loggedAdmin.nick, loggedAdmin.isAdmin)
  if (!refreshTokenAdmin) throw createError(500, 'Błąd serwera.')

  loggedAdmin.refreshTokensAdmin = loggedAdmin.refreshTokensAdmin.filter(element => element.expirationDate > Date.now())
  loggedAdmin.refreshTokensAdmin.push({
    refreshToken: refreshTokenAdmin,
    expirationDate: Date.now() + 90 * 24 * 3600 * 1000,
  })
  await loggedAdmin.save()

  return res
    .cookie('refreshTokenAdmin', refreshTokenAdmin, {
      httpOnly: true,
      sameSite: 'none',
      secure: config.ENV === 'production' ? true : false,
      maxAge: 90 * 24 * 3600 * 1000, // 90 days
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

// GET - /admin/auth/refreshAccessToken
const refreshAccessToken = async (req, res) => {
  if (!req.cookies?.refreshTokenAdmin) throw createError(401, 'Błąd autoryzacji.')

  const checkedAdmin = await User.findOne({
    'refreshTokensAdmin.refreshToken': req.cookies.refreshTokenAdmin,
    isAdmin: true,
  }).exec()
  if (!checkedAdmin) throw createError(401, 'Błąd autoryzacji.')

  jwt.verify(req.cookies.refreshTokenAdmin, config.JWT_REFRESH_TOKEN_SECRET, async (error, decode) => {
    if (error || checkedAdmin.id !== decode.id) throw createError(401, 'Błąd autoryzacji.')

    const accessToken = await getAccessToken(decode.id, decode.email)
    if (!accessToken) throw createError(500, 'Błąd serwera.')

    return res.status(201).send({ accessToken })
  })
}
// GET - /admin/auth/logout
const logout = async (req, res) => {
  if (!req.cookies?.refreshTokenAdmin) return res.sendStatus(204)

  const checkedAdmin = await User.findOne({
    'refreshTokensAdmin.refreshToken': req.cookies.refreshTokenAdmin,
    isAdmin: true,
  }).exec()

  if (checkedAdmin) {
    checkedAdmin.refreshTokensAdmin = checkedAdmin.refreshTokensAdmin.filter(
      element => element.refreshToken !== req.cookies.refreshTokenAdmin,
    )
    await checkedAdmin.save()
  }

  return res
    .clearCookie('refreshTokenAdmin', {
      httpOnly: true,
      sameSite: 'none',
      secure: config.ENV === 'production' ? true : false,
    })
    .sendStatus(204)
}

export { login, refreshAccessToken, logout }
