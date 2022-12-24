import createError from 'http-errors'
import User from '../models/userModel.js'
import Order from '../models/orderModel.js'
import Setup from '../models/setupModel.js'

//GET - /user/getUser/:id
const getUser = async (req, res) => {
  const listedUser = await User.findById(req.params.id).select('nick').exec()
  if (!listedUser) throw createError(404, 'Podany użytkownik nie istnieje.')

  const listedUserSetups = await Setup.find({ user: req.params.id }).select('-addedBy -comments').exec()

  return res.status(200).send({ user: listedUser.nick, setups: listedUserSetups })
}
//GET - /user/getLoggedUser
const getLoggedUser = async (req, res) => {
  const { authenticatedUser } = res.locals

  const orders = await Order.find({ buyer: authenticatedUser.id }).select('orderedComponents totalPrice createdAt').exec()

  const user = await User.findById(authenticatedUser.id)
    .populate([{ path: 'likedSetups', select: '-comments' }])
    .select('likedSetups')
    .exec()

  let likedSetupsFiltered = []
  for (let likedSetup of user.likedSetups) {
    const creator = await User.findById(likedSetup.addedBy).select('nick').exec()
    //likedSetupsFiltered.push({ ...likedSetup._doc, addedBy: creator.nick })
    likedSetupsFiltered.push({ ...likedSetup, addedBy: creator.nick })
    /*creator
      ? likedSetupsFiltered.push({ ...likedSetup, addedBy: creator.nick })
      : likedSetupsFiltered.push({ ...likedSetup, addedBy: undefined })*/
  }

  return res.status(200).send({ orders, likedSetups: likedSetupsFiltered })
}

export { getUser, getLoggedUser }
