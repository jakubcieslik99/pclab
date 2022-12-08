import createError from 'http-errors'
import { isValidObjectId } from 'mongoose'
import Setup from '../../models/setupModel.js'
import User from '../../models/userModel.js'
import Component from '../../models/componentModel.js'
import { setupsPriceComparision } from '../../functions/getSetups.js'

//GET - /admin/setups/getSetups
const getSetups = async (req, res) => {
  const page = req.query.page ? req.query.page : 1
  const limit = req.query.limit ? req.query.limit : 15

  let sort = {}
  if (req.query.sorting && req.query.sorting === 'least_popular') sort = { amount: 1 }
  else if (req.query.sorting && req.query.sorting === 'most_popular') sort = { amount: -1 }
  else if (req.query.sorting && req.query.sorting === 'worst_rating') sort = { amount: 1 }
  else if (req.query.sorting && req.query.sorting === 'best_rating') sort = { amount: -1 }
  else if (req.query.sorting && req.query.sorting === 'oldest') sort = { createdAt: 1 }
  else if (req.query.sorting && req.query.sorting === 'newest') sort = { createdAt: -1 }
  else sort = { createdAt: -1 }

  let query = {}

  let matchUsers = []
  let matchComponents = []
  if (req.query.searching) {
    matchUsers = await User.find({
      $or: [
        { _id: isValidObjectId(req.query.searching) ? req.query.searching : null },
        { nick: { $regex: req.query.searching, $options: 'i' } },
      ],
    })
      .select('_id')
      .exec()
    matchComponents = await Component.find({ title: { $regex: req.query.searching, $options: 'i' } })
      .select('_id')
      .exec()

    query = {
      ...query,
      ...{
        $or: [
          { _id: isValidObjectId(req.query.searching) ? req.query.searching : null },
          { description: { $regex: req.query.searching, $options: 'i' } },
          { addedBy: { $in: matchUsers } },
          { case: { $in: matchComponents } },
          { cpu: { $in: matchComponents } },
          { mobo: { $in: matchComponents } },
          { ram: { $in: matchComponents } },
          { gpu: { $in: matchComponents } },
          { psu: { $in: matchComponents } },
          { driveOne: { $in: matchComponents } },
          { driveTwo: { $in: matchComponents } },
          { driveThree: { $in: matchComponents } },
        ],
      },
    }
  }

  let listedSetups = await Setup.find(query)
    .populate([
      { path: 'addedBy', select: 'id nick' },
      { path: 'case', select: 'id title price amount' },
      { path: 'cpu', select: 'id title price amount' },
      { path: 'mobo', select: 'id title price amount' },
      { path: 'ram', select: 'id title price amount' },
      { path: 'gpu', select: 'id title price amount' },
      { path: 'psu', select: 'id title price amount' },
      { path: 'driveOne', select: 'id title price amount' },
      { path: 'driveTwo', select: 'id title price amount' },
      { path: 'driveThree', select: 'id title price amount' },
    ])
    .select('-comments')
    .sort(sort)
    .exec()
  const count = listedSetups.length

  if (req.query.sorting && req.query.sorting === 'price_highest')
    listedSetups.sort((a, b) => setupsPriceComparision(a, b, 'price_highest'))
  if (req.query.sorting && req.query.sorting === 'price_lowest')
    listedSetups.sort((a, b) => setupsPriceComparision(a, b, 'price_lowest'))

  return res.status(200).send({ count, setups: listedSetups.slice((page - 1) * limit, (page - 1) * limit + limit) })
}

//DELETE - /admin/setups/deleteSetup/:id
const deleteSetup = async (req, res) => {
  const deletedSetup = await Setup.findById(req.params.id).exec()
  if (!deletedSetup) throw createError(404, 'Podana konfiguracja nie istnieje.')

  if (deletedSetup.likes > 0) {
    const users = await User.find({ likedSetups: deletedSetup.id }).exec()
    for (const user of users) {
      user.likedSetups = user.likedSetups.filter(setup => setup.toString() !== deletedSetup.id)
      await user.save()
    }
  }

  await deletedSetup.remove()

  return res.status(200).send({ message: 'Usunięto konfigurację.' })
}

export { getSetups, deleteSetup }
