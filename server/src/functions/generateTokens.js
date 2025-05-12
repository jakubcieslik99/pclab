import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { config, log } from '../config/utilities'

const getAccessToken = (userId, userEmail, userNick, userIsAdmin) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: userId, email: userEmail, nick: userNick, isAdmin: userIsAdmin },
      config.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: '20m' },
      (error, token) => {
        if (error) {
          log.error(error.message)
          return reject(createError(500, 'Błąd serwera.'))
        }
        return resolve(token)
      },
    )
  })
}

const getRefreshToken = (userId, userEmail, userNick, userIsAdmin) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: userId, email: userEmail, nick: userNick, isAdmin: userIsAdmin },
      config.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: '90d' },
      (error, token) => {
        if (error) {
          log.error(error.message)
          return reject(createError(500, 'Błąd serwera.'))
        }
        return resolve(token)
      },
    )
  })
}

export { getAccessToken, getRefreshToken }
