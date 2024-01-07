import createError from 'http-errors'
import User from '../models/userModel'
import Order from '../models/orderModel'
import Setup from '../models/setupModel'

// GET - /user/getUser/:id
const getUser = async (req, res) => {
  const listedUser = await User.findById(req.params.id).select('nick').exec()
  if (!listedUser) throw createError(404, 'Podany użytkownik nie istnieje.')

  const listedUserSetups = await Setup.find({ addedBy: req.params.id })
    .populate([
      { path: 'addedBy', select: 'nick' },
      { path: 'case' },
      { path: 'cpu' },
      { path: 'mobo' },
      { path: 'ram' },
      { path: 'gpu' },
      { path: 'psu' },
      { path: 'driveOne' },
      { path: 'driveTwo' },
      { path: 'driveThree' },
      { path: 'comments.addedBy', select: 'nick' },
    ])
    .select('-comments')
    .exec()

  return res.status(200).send({ user: listedUser.nick, setups: listedUserSetups })
}
// GET - /user/getLoggedUser
const getLoggedUser = async (req, res) => {
  const { authenticatedUser } = res.locals

  const orders = await Order.find({ buyer: authenticatedUser.id }).select('orderedComponents totalPrice createdAt').exec()

  const user = await User.findById(authenticatedUser.id)
    .populate([{ path: 'likedSetups', select: '-comments' }])
    .select('likedSetups')
    .exec()

  let likedSetupsFiltered = []
  for (let likedSetup of user.likedSetups) {
    const setup = await Setup.findById(likedSetup.id)
      .populate([
        { path: 'addedBy', select: 'nick' },
        { path: 'case' },
        { path: 'cpu' },
        { path: 'mobo' },
        { path: 'ram' },
        { path: 'gpu' },
        { path: 'psu' },
        { path: 'driveOne' },
        { path: 'driveTwo' },
        { path: 'driveThree' },
        { path: 'comments.addedBy', select: 'nick' },
      ])
      .select('-comments')
      .exec()

    setup && likedSetupsFiltered.push(setup)
  }

  return res.status(200).send({ orders, likedSetups: likedSetupsFiltered })
}

export { getUser, getLoggedUser }
