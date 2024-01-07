import createError from 'http-errors'
import User from '../../models/userModel.js'
import Setup from '../../models/setupModel.js'
import Order from '../../models/orderModel.js'
import { updateUserValidation } from '../../validations/adminValidations/adminUsersValidation.js'

// GET - /admin/users/getUsers
const getUsers = async (req, res) => {
  const page = req.query.page ? req.query.page : 1
  const limit = req.query.limit ? req.query.limit : 15

  let query = {}
  if (req.query.searching) {
    query = {
      ...query,
      ...{
        $or: [
          { id: { $regex: req.query.searching, $options: 'i' } },
          { nick: { $regex: req.query.searching, $options: 'i' } },
          { email: { $regex: req.query.searching, $options: 'i' } },
        ],
      },
    }
  }

  let sort = {}
  if (req.query.sorting && req.query.sorting === 'least_setups') sort = { setupsCount: 1 }
  else if (req.query.sorting && req.query.sorting === 'most_setups') sort = { setupsCount: -1 }
  else if (req.query.sorting && req.query.sorting === 'least_comments') sort = { commentsCount: 1 }
  else if (req.query.sorting && req.query.sorting === 'most_comments') sort = { commentsCount: -1 }
  else if (req.query.sorting && req.query.sorting === 'z_a') sort = { nick: -1 }
  else if (req.query.sorting && req.query.sorting === 'a_z') sort = { nick: -1 }
  else if (req.query.sorting && req.query.sorting === 'from_users') isAdmin = { amount: -1 }
  else if (req.query.sorting && req.query.sorting === 'from_admins') isAdmin = { amount: 1 }
  else if (req.query.sorting && req.query.sorting === 'oldest') sort = { createdAt: 1 }
  else if (req.query.sorting && req.query.sorting === 'newest') sort = { createdAt: -1 }
  else sort = { createdAt: -1 }

  const count = await User.find(query).countDocuments().exec()
  const listedUsers = await User.find(query)
    .select('-password -token -refreshTokens -refreshTokensAdmin')
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

  return res.status(200).send({ count, users: listedUsers })
}
// GET - /admin/users/getUser/:id
const getUser = async (req, res) => {
  const listedUser = await User.findById(req.params.id).select('-password -token -refreshTokens -refreshTokensAdmin').exec()
  if (!listedUser) throw createError(404, 'Podany użytkownik nie istnieje.')

  return res.status(200).send({ user: listedUser })
}

// PUT - /admin/users/updateUser/:id
const updateUser = async (req, res) => {
  const validationResult = await updateUserValidation.validateAsync(req.body)

  const updatedUser = await User.findById(req.params.id).select('-password -token -refreshTokens -refreshTokensAdmin').exec()
  if (!updatedUser) throw createError(404, 'Podany użytkownik nie istnieje.')

  updatedUser.isAdmin = validationResult.isAdmin === 'yes' ? true : false

  await updatedUser.save()

  return res.status(200).send({ message: 'Zaktualizowano użytkownika.', user: updatedUser })
}

// DELETE - /admin/users/deleteUser/:id
const deleteUser = async (req, res) => {
  const deletedUser = await User.findById(req.params.id).exec()
  if (!deletedUser) throw createError(404, 'Podany użytkownik nie istnieje.')

  const unfinishedOrders = await Order.find({
    buyer: req.params.id,
    status: { $ne: 'returned' },
    updatedAt: { $lt: new Date(new Date().getTime() - 14 * 24 * 3600 * 1000) },
  }).exec()
  if (unfinishedOrders.length > 0) throw createError(402, 'Podany użytkownik posiada zamówienie w realizacji.')

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

  return res.status(200).send({ message: 'Usunięto użytkownika oraz wszystkie stworzone przez niego zestawy.' })
}

export { getUsers, getUser, updateUser, deleteUser }
