import createError from 'http-errors'
import Setup from '../../models/setupModel.js'

//GET - /admin/setups/getSetups
const getSetups = async (req, res) => {
  const page = req.query.page ? req.query.page : 1
  const limit = req.query.limit ? req.query.limit : 15

  let sort = {}
  if (req.query.sorting && req.query.sorting === 'price_highest') sort = { price: -1 }
  else if (req.query.sorting && req.query.sorting === 'price_lowest') sort = { price: 1 }
  else if (req.query.sorting && req.query.sorting === 'amount_highest') sort = { amount: -1 }
  else if (req.query.sorting && req.query.sorting === 'amount_lowest') sort = { amount: 1 }
  else if (req.query.sorting && req.query.sorting === 'oldest') sort = { createdAt: 1 }
  else if (req.query.sorting && req.query.sorting === 'newest') sort = { createdAt: -1 }
  else sort = { createdAt: -1 }

  const listedRawSetups = await Setup.find()
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
    .sort(sort)
    .exec()
  let count = listedRawSetups.length

  let listedFilteredSetups = []
  if (req.query.searching) {
    let countAllFiltered = 0
    let countListedFilteredSetups = 0

    for (const rawSetup of listedRawSetups) {
      if (
        rawSetup.addedBy.nick.toLowerCase().includes(req.query.searching.toLowerCase()) ||
        rawSetup.case.title.toLowerCase().includes(req.query.searching.toLowerCase()) ||
        rawSetup.cpu?.title.toLowerCase().includes(req.query.searching.toLowerCase()) ||
        rawSetup.mobo?.title.toLowerCase().includes(req.query.searching.toLowerCase()) ||
        rawSetup.ram?.title.toLowerCase().includes(req.query.searching.toLowerCase()) ||
        rawSetup.gpu?.title.toLowerCase().includes(req.query.searching.toLowerCase()) ||
        rawSetup.psu?.title.toLowerCase().includes(req.query.searching.toLowerCase()) ||
        rawSetup.driveOne?.title.toLowerCase().includes(req.query.searching.toLowerCase()) ||
        rawSetup.driveTwo?.title.toLowerCase().includes(req.query.searching.toLowerCase()) ||
        rawSetup.driveThree?.title.toLowerCase().includes(req.query.searching.toLowerCase()) ||
        rawSetup.id.toLowerCase().includes(req.query.searching.toLowerCase())
      ) {
        if (countAllFiltered >= (page - 1) * limit && countListedFilteredSetups < limit) {
          listedFilteredSetups.push(rawSetup)
          countListedFilteredSetups++
        }
        countAllFiltered++
      }
    }
    count = countAllFiltered
  }

  return res.status(200).send({ count, setups: req.query.searching ? listedFilteredSetups : listedRawSetups })
}

//DELETE - /admin/setups/deleteSetup/:id
const deleteSetup = async (req, res) => {
  const deletedSetup = await Setup.findById(req.params.id).exec()
  if (!deletedSetup) throw createError(404, 'Podana konfiguracja nie istnieje.')

  //find and delete setup from every user's liked setups

  await deletedSetup.remove()

  return res.status(200).send({ message: 'Usunięto konfigurację.' })
}

//temporary controller for testing purposes (GET - /admin/setups/tempAddSetup)
const tempAddSetup = async (_req, res) => {
  const newTempSetup = new Setup({
    addedBy: '6362e1ee0f9a75f9868285d7',
    case: '6366ca1dd133b03e57360aa1',
    cpu: '6366d9bad133b03e57360ab7',
  })

  await newTempSetup.save()

  return res.status(201).send({ message: 'Dodano nową konfigurację.', setup: newTempSetup })
}

export { getSetups, deleteSetup, tempAddSetup }
