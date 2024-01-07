import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import User from '../models/userModel'
import Setup from '../models/setupModel'
import Order from '../models/orderModel'
import { config } from '../config/utilities'
import {
  registerValidation,
  loginValidation,
  updateAccountValidation,
  confirmAccountValidation,
  sendPasswordResetValidation,
  resetPasswordValidation,
} from '../validations/authValidation'
import { getAccessToken, getRefreshToken } from '../functions/generateTokens'
import sendEmail from '../functions/sendEmail'
import { registerMessage, sendPasswordResetMessage } from '../messages/authMessages'

// POST - /auth/register
const register = async (req, res) => {
  if (req.cookies?.refreshToken) throw createError(409, 'Inny użytkownik jest zalogowany.')

  const validationResult = await registerValidation.validateAsync(req.body)

  const conflictUserEmail = await User.findOne({ email: validationResult.email.toLowerCase() }).exec()
  if (conflictUserEmail) throw createError(409, 'Istnieje już użytkownik o podanym adresie email.')
  const conflictUserNick = await User.findOne({ nick: validationResult.nick }).exec()
  if (conflictUserNick) throw createError(409, 'Istnieje już użytkownik o podanym nicku.')

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(validationResult.password, salt)
  const token = crypto.randomBytes(64).toString('hex')

  const createUser = new User({
    email: validationResult.email.toLowerCase(),
    nick: validationResult.nick,
    password: hashedPassword,
    token,
  })
  await createUser.save()

  await sendEmail(registerMessage(validationResult.email.toLowerCase(), validationResult.nick, token))

  return res.status(201).send({
    message:
      'Zarejestrowano pomyślnie. Teraz potwierdź rejestrację za pomocą otrzymanej wiadomości email, aby się zalogować.',
  })
}
// POST - /auth/login
const login = async (req, res) => {
  if (req.cookies?.refreshToken) {
    const checkedUser = await User.findOne({ 'refreshTokens.refreshToken': req.cookies.refreshToken }).exec()

    if (checkedUser) {
      checkedUser.refreshTokens = checkedUser.refreshTokens.filter(
        element => element.refreshToken !== req.cookies.refreshToken
      )
      await checkedUser.save()
    }

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: config.ENV === 'production' ? true : false })
    throw createError(409, 'Użytkownik jest zalogowany. Wyloguj się lub spróbuj ponownie.')
  }

  const validationResult = await loginValidation.validateAsync(req.body)

  const loggedUser = await User.findOne({ email: validationResult.email.toLowerCase() }).exec()
  if (!loggedUser) throw createError(404, 'Konto użytkownika nie istnieje lub zostało usunięte.')

  if (!loggedUser.confirmed) throw createError(401, 'Email nie został potwierdzony.')

  const checkPassword = await bcrypt.compare(validationResult.password, loggedUser.password)
  if (!checkPassword) throw createError(401, 'Błędny email lub hasło.')

  const accessToken = await getAccessToken(loggedUser.id, loggedUser.email, loggedUser.nick, loggedUser.isAdmin)
  if (!accessToken) throw createError(500, 'Błąd serwera.')
  const refreshToken = await getRefreshToken(loggedUser.id, loggedUser.email, loggedUser.nick, loggedUser.isAdmin)
  if (!refreshToken) throw createError(500, 'Błąd serwera.')

  loggedUser.refreshTokens = loggedUser.refreshTokens.filter(element => element.expirationDate > Date.now())
  loggedUser.refreshTokens.push({ refreshToken, expirationDate: Date.now() + 90 * 24 * 3600 * 1000 })
  await loggedUser.save()

  return res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: config.ENV === 'production' ? true : false,
      maxAge: 90 * 24 * 3600 * 1000, // 90 days
    })
    .status(200)
    .send({
      message: 'Zalogowano pomyślnie. Nastąpi automatyczne przekierowanie.',
      userInfo: {
        id: loggedUser.id,
        email: loggedUser.email,
        nick: loggedUser.nick,
        isAdmin: loggedUser.isAdmin,
      },
      accessToken: accessToken,
    })
}

// PUT - /auth/updateAccount
const updateAccount = async (req, res) => {
  const { authenticatedUser } = res.locals

  const validationResult = await updateAccountValidation.validateAsync({
    email: req.body.email.toLowerCase(),
    nick: req.body.nick,
    password: req.body.password,
    newpassword: req.body.newpassword || '',
  })

  const conflictUserEmail = await User.findOne({ email: validationResult.email }).exec()
  if (conflictUserEmail && conflictUserEmail.id !== authenticatedUser.id)
    throw createError(409, 'Istnieje już użytkownik o podanym adresie email.')
  const conflictUserNick = await User.findOne({ nick: validationResult.nick }).exec()
  if (conflictUserNick && conflictUserNick.id !== authenticatedUser.id)
    throw createError(409, 'Istnieje już użytkownik o podanym nicku.')

  const updateUser = await User.findById(authenticatedUser.id).exec()
  if (!updateUser) throw createError(404, 'Podany użytkownik nie istnieje.')

  const checkPassword = await bcrypt.compare(validationResult.password, updateUser.password)
  if (!checkPassword) throw createError(401, 'Błędne hasło.')

  updateUser.email = validationResult.email
  updateUser.nick = validationResult.nick
  if (validationResult.newpassword !== '') {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(validationResult.newpassword, salt)
    updateUser.password = hashedPassword
  }

  const accessToken = await getAccessToken(updateUser.id, validationResult.email, validationResult.nick, updateUser.isAdmin)
  if (!accessToken) throw createError(500, 'Błąd serwera.')
  const refreshToken = await getRefreshToken(
    updateUser.id,
    validationResult.email,
    validationResult.nick,
    updateUser.isAdmin
  )
  if (!refreshToken) throw createError(500, 'Błąd serwera.')

  updateUser.refreshTokens = updateUser.refreshTokens.filter(
    element => element.expirationDate > Date.now() && element.refreshToken !== req.cookies.refreshToken
  )
  updateUser.refreshTokens.push({ refreshToken, expirationDate: Date.now() + 90 * 24 * 3600 * 1000 })

  const updatedUser = await updateUser.save()

  return res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: config.ENV === 'production' ? true : false,
      maxAge: 90 * 24 * 3600 * 1000, // 90 days
    })
    .status(200)
    .send({
      message: 'Zaktualizowano profil.',
      userInfo: {
        id: updatedUser.id,
        email: updatedUser.email,
        nick: updatedUser.nick,
        isAdmin: updatedUser.isAdmin,
      },
      accessToken: accessToken,
    })
}

// DELETE - /auth/deleteAccount
const deleteAccount = async (req, res) => {
  const { authenticatedUser } = res.locals

  const deletedUser = await User.findById(authenticatedUser.id).exec()
  if (!deletedUser) throw createError(404, 'Podany użytkownik nie istnieje.')

  const unfinishedOrders = await Order.find({
    buyer: authenticatedUser.id,
    status: { $ne: 'returned' },
    updatedAt: { $lt: new Date(new Date().now() - 14 * 24 * 3600 * 1000) }, // 14 days back
  }).exec()
  if (unfinishedOrders.length > 0)
    throw createError(402, 'Posiadasz zamówienie w realizacji. Twoje konto będzie można usunąć po jego zakończeniu.')

  for (const likedSetup of deletedUser.likedSetups) {
    const setup = await Setup.findById(likedSetup).exec()
    setup.likes = setup.likes - 1
    await setup.save()
  }

  const deletedSetups = await Setup.find({ addedBy: deletedUser.id }).exec()
  for (const deletedSetup of deletedSetups) {
    if (deletedSetup.likes > 0) {
      const users = await User.find({ likedSetups: deletedSetup.id }).exec()
      for (const user of users) {
        user.likedSetups = user.likedSetups.filter(setup => setup.toString() !== deletedSetup.id)
        await user.save()
      }
    }
    await deletedSetup.remove()
  }

  await deletedUser.remove()

  if (!req.cookies?.refreshToken) return res.status(200).send({ message: 'Usunięto konto z serwisu.' })
  return res
    .clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: config.ENV === 'production' ? true : false })
    .status(200)
    .send({ message: 'Usunięto konto z serwisu.' })
}

// GET - /auth/refreshAccessToken
const refreshAccessToken = async (req, res) => {
  if (!req.cookies?.refreshToken) throw createError(401, 'Błąd autoryzacji.')

  const checkedUser = await User.findOne({ 'refreshTokens.refreshToken': req.cookies.refreshToken }).exec()
  if (!checkedUser) throw createError(401, 'Błąd autoryzacji.')

  jwt.verify(req.cookies.refreshToken, config.JWT_REFRESH_TOKEN_SECRET, async (error, decode) => {
    if (error || checkedUser.id !== decode.id) throw createError(401, 'Błąd autoryzacji.')

    const accessToken = await getAccessToken(decode.id, decode.email)
    if (!accessToken) throw createError(500, 'Błąd serwera.')

    return res.status(201).send({ accessToken })
  })
}
// GET - /auth/logout
const logout = async (req, res) => {
  if (!req.cookies?.refreshToken) return res.sendStatus(204)

  const checkedUser = await User.findOne({ 'refreshTokens.refreshToken': req.cookies.refreshToken }).exec()

  if (checkedUser) {
    checkedUser.refreshTokens = checkedUser.refreshTokens.filter(
      element => element.refreshToken !== req.cookies.refreshToken
    )
    await checkedUser.save()
  }

  return res
    .clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: config.ENV === 'production' ? true : false })
    .sendStatus(204)
}

// POST - /auth/confirmAccount
const confirmAccount = async (req, res) => {
  if (req.cookies?.refreshToken) throw createError(409, 'Użytkownik jest zalogowany.')

  const validationResult = await confirmAccountValidation.validateAsync(req.body)

  const confirmedUser = await User.findOne({ token: validationResult.token }).exec()
  if (!confirmedUser) throw createError(406, 'Błąd weryfikacji. Konto mogło zostać już potwierdzone.')

  confirmedUser.token = null
  confirmedUser.confirmed = true
  await confirmedUser.save()

  return res.status(200).send({ message: 'Potwierdzono konto pomyślnie. Teraz możesz się zalogować.' })
}
// POST - /auth/sendPasswordReset
const sendPasswordReset = async (req, res) => {
  if (req.cookies?.refreshToken) throw createError(409, 'Użytkownik jest zalogowany.')

  const validationResult = await sendPasswordResetValidation.validateAsync(req.body)

  const passwordResetRequestedUser = await User.findOne({ email: validationResult.email.toLowerCase() }).exec()
  if (!passwordResetRequestedUser) throw createError(404, 'Konto użytkownika nie istnieje.')

  if (!passwordResetRequestedUser.confirmed) throw createError(409, 'Email nie został jeszcze potwierdzony.')

  passwordResetRequestedUser.token = crypto.randomBytes(64).toString('hex')
  await passwordResetRequestedUser.save()

  await sendEmail(
    sendPasswordResetMessage(
      validationResult.email.toLowerCase(),
      passwordResetRequestedUser.nick,
      passwordResetRequestedUser.token
    )
  )

  return res.status(200).send({ message: 'Wysłano wiadomość z linkiem do resetowania hasła.' })
}
// POST - /auth/resetPassword
const resetPassword = async (req, res) => {
  if (req.cookies?.refreshToken) throw createError(409, 'Użytkownik jest zalogowany.')

  const validationResult = await resetPasswordValidation.validateAsync(req.body)

  const passwordResetUser = await User.findOne({ token: validationResult.token }).exec()
  if (!passwordResetUser) throw createError(406, 'Błąd resetowania hasła.')

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(validationResult.password, salt)

  passwordResetUser.token = null
  passwordResetUser.password = hashedPassword
  await passwordResetUser.save()

  return res.status(200).send({ message: 'Zmieniono hasło pomyślnie. Teraz możesz się zalogować.' })
}

export {
  register,
  login,
  updateAccount,
  deleteAccount,
  refreshAccessToken,
  logout,
  confirmAccount,
  sendPasswordReset,
  resetPassword,
}
