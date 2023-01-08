import createError from 'http-errors'
import { isValidObjectId } from 'mongoose'
import Setup from '../models/setupModel'
import User from '../models/userModel'
import Component from '../models/componentModel'
import {
  createCommentValidation,
  getComponentsValidation,
  createSetupValidation,
  updateSetupValidation,
} from '../validations/setupsValidation'
import { setupsAggregation, setupsPriceComparision } from '../functions/getSetups'

//GET - /setups/getSetups
const getSetups = async (req, res) => {
  const page = req.query.page ? req.query.page : 1
  const limit = req.query.limit ? req.query.limit : 12

  let sort = {}
  if (req.query.sorting && req.query.sorting === 'least_popular') sort = { bought: 1 }
  else if (req.query.sorting && req.query.sorting === 'most_popular') sort = { bought: -1 }
  else if (req.query.sorting && req.query.sorting === 'worst_rating') sort = { likes: 1 }
  else if (req.query.sorting && req.query.sorting === 'best_rating') sort = { likes: -1 }
  else if (req.query.sorting && req.query.sorting === 'oldest') sort = { createdAt: 1 }
  else if (req.query.sorting && req.query.sorting === 'newest') sort = { createdAt: -1 }
  else sort = { createdAt: -1 }

  let query = {}

  let matchUsers = []
  let matchComponents = []
  if (req.query.searching) {
    matchUsers = await User.find({ nick: { $regex: req.query.searching, $options: 'i' } })
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

  let matchSetups = []
  if (req.query.priceFrom || req.query.priceTo) {
    matchSetups = await Setup.aggregate(setupsAggregation(req.query.priceFrom, req.query.priceTo))

    query = { ...query, ...{ _id: { $in: matchSetups } } }
    //query = { ...query, ...{ _id: { $in: matchSetups.map(setup => setup._id) } } }
  }

  let listedSetups = await Setup.find(query)
    .populate([
      { path: 'addedBy', select: 'id nick' },
      { path: 'case', select: 'id title price amount images' },
      { path: 'cpu', select: 'id title price amount images' },
      { path: 'mobo', select: 'id title price amount images' },
      { path: 'ram', select: 'id title price amount images' },
      { path: 'gpu', select: 'id title price amount images' },
      { path: 'psu', select: 'id title price amount images' },
      { path: 'driveOne', select: 'id title price amount images' },
      { path: 'driveTwo', select: 'id title price amount images' },
      { path: 'driveThree', select: 'id title price amount images' },
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
//GET - /setups/getSetup/:id
const getSetup = async (req, res) => {
  const setup = await Setup.findById(req.params.id)
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
    .exec()
  if (!setup) throw createError(404, 'Podana konfiguracja nie istnieje.')

  return res.status(200).send({ setup })
}

//GET - /setups/getLikedSetups
const getLikedSetups = async (req, res) => {
  const { authenticatedUser } = res.locals

  const user = await User.findById(authenticatedUser.id).select('likedSetups').exec()

  return res.status(200).send({ likedSetups: user.likedSetups })
}

//POST - /setups/likeSetup/:id
const likeSetup = async (req, res) => {
  const { authenticatedUser } = res.locals

  const likedSetup = await Setup.findById(req.params.id).exec()
  if (!likedSetup) throw createError(404, 'Podana konfiguracja nie istnieje.')

  if (likedSetup.addedBy.toString() === authenticatedUser.id)
    throw createError(403, 'Nie można polubić swojej konfiguracji.')

  if (authenticatedUser.likedSetups.includes(likedSetup.id)) throw createError(403, 'Polubiono już tą konfigurację.')
  authenticatedUser.likedSetups.push(likedSetup.id)
  await authenticatedUser.save()
  likedSetup.likes++
  await likedSetup.save()

  return res.status(200).send({ likedSetups: authenticatedUser.likedSetups })
}

//DELETE - /setups/unlikeSetup/:id
const unlikeSetup = async (req, res) => {
  const { authenticatedUser } = res.locals

  const unlikedSetup = await Setup.findById(req.params.id).exec()
  if (!unlikedSetup) throw createError(404, 'Podana konfiguracja nie istnieje.')

  if (unlikedSetup.addedBy.toString() === authenticatedUser.id)
    throw createError(403, 'Nie można usunąć swojej konfiguracji z ulubionych.')

  if (!authenticatedUser.likedSetups.includes(unlikedSetup.id)) throw createError(403, 'Nie polubiono tej konfiguracji.')

  authenticatedUser.likedSetups = authenticatedUser.likedSetups.filter(setup => setup.toString() !== unlikedSetup.id)
  await authenticatedUser.save()
  unlikedSetup.likes--
  await unlikedSetup.save()

  return res.status(200).send({ likedSetups: authenticatedUser.likedSetups })
}

//POST - /setups/createComment/:id
const createComment = async (req, res) => {
  const { authenticatedUser } = res.locals

  const validationResult = await createCommentValidation.validateAsync(req.body)

  const setup = await Setup.findById(req.params.id).select('comments').exec()
  if (!setup) throw createError(404, 'Podana konfiguracja nie istnieje.')

  setup.comments.push({
    addedBy: authenticatedUser.id,
    comment: validationResult.comment,
  })

  await setup.save()

  const setupComments = await Setup.findById(req.params.id)
    .populate([{ path: 'comments.addedBy', select: 'nick' }])
    .select('comments')
    .exec()

  return res.status(200).send({ setupComments })
}

//GET - /setups/getComponents
const getComponents = async (req, res) => {
  const page = req.query.page ? req.query.page : 1
  const limit = 10

  if (!req.query.type) throw createError(422, 'Przesłano błędne dane.')

  let type = ''
  switch (req.query.type) {
    case 'case':
      type = 'case'
      break
    case 'cpu':
      type = 'cpu'
      break
    case 'mobo':
      type = 'mobo'
      break
    case 'ram':
      type = 'ram'
      break
    case 'gpu':
      type = 'gpu'
      break
    case 'psu':
      type = 'psu'
      break
    case 'drive':
      type = 'drive'
      break
    default:
      throw createError(422, 'Przesłano błędne dane.')
  }

  let query = { type, amount: { $gt: 0 } }
  if (req.query.searching) {
    query = { ...query, ...{ title: { $regex: req.query.searching, $options: 'i' } } }
  }

  const validationResult = await getComponentsValidation.validateAsync({
    moboCompat: req.query.moboCompat || '',
    cpuCompat: req.query.cpuCompat || '',
    caseCompat: req.query.caseCompat || '',
    ramCompat: req.query.ramCompat || '',
  })
  if (validationResult.moboCompat) query = { ...query, ...{ moboCompat: validationResult.moboCompat } }
  if (validationResult.cpuCompat) query = { ...query, ...{ cpuCompat: validationResult.cpuCompat } }
  if (validationResult.caseCompat) query = { ...query, ...{ caseCompat: validationResult.caseCompat } }
  if (validationResult.ramCompat) query = { ...query, ...{ ramCompat: validationResult.ramCompat } }

  const count = await Component.find(query).countDocuments().exec()
  const listedComponents = await Component.find(query)
    .sort()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

  return res.status(200).send({ count, components: listedComponents })
}

//POST - /setups/createSetup
const createSetup = async (req, res) => {
  const { authenticatedUser } = res.locals

  const validationResult = await createSetupValidation.validateAsync({ description: req.body.description || '' })

  let caseComponent, cpuComponent, moboComponent, ramComponent

  if (!req.body.case) throw createError(422, 'Przesłano błędne dane.')
  caseComponent = await Component.findById(req.body.case).select('type moboCompat amount').exec()
  if (!caseComponent) throw createError(404, 'Podana obudowa nie istnieje.')
  if (caseComponent.amount <= 0) throw createError(403, 'Podana obudowa nie jest aktualnie dostępna.')

  if (req.body.cpu) {
    cpuComponent = await Component.findById(req.body.cpu).select('type cpuCompat ramCompat amount').exec()
    if (!cpuComponent) throw createError(404, 'Podany procesor nie istnieje.')
    if (cpuComponent.amount <= 0) throw createError(403, 'Podany procesor nie jest aktualnie dostępny.')
  }
  if (req.body.mobo) {
    moboComponent = await Component.findById(req.body.mobo).select('type cpuCompat caseCompat ramCompat amount').exec()
    if (!moboComponent) throw createError(404, 'Podana płyta główna nie istnieje.')
    if (moboComponent.amount <= 0) throw createError(403, 'Podana płyta główna nie jest aktualnie dostępna.')
  }
  if (req.body.ram) {
    ramComponent = await Component.findById(req.body.ram).select('type ramCompat amount').exec()
    if (!ramComponent) throw createError(404, 'Podana pamięć RAM nie istnieje.')
    if (ramComponent.amount <= 0) throw createError(403, 'Podana pamięć RAM nie jest aktualnie dostępna.')
  }

  //check compatibility
  if (moboComponent) {
    if (caseComponent.moboCompat === 'matx' && moboComponent.caseCompat === 'atx') createError(422, 'Przesłano błędne dane.')
    if (caseComponent.moboCompat === 'itx' && moboComponent.caseCompat === 'atx') createError(422, 'Przesłano błędne dane.')
    if (caseComponent.moboCompat === 'itx' && moboComponent.caseCompat === 'matx') createError(422, 'Przesłano błędne dane.')
  }
  if (moboComponent && ramComponent && moboComponent.ramCompat !== ramComponent.ramCompat)
    throw createError(422, 'Przesłano błędne dane.')
  if (moboComponent && cpuComponent && moboComponent.cpuCompat !== cpuComponent.cpuCompat)
    throw createError(422, 'Przesłano błędne dane.')
  if (cpuComponent && ramComponent && cpuComponent.ramCompat !== ramComponent.ramCompat)
    throw createError(422, 'Przesłano błędne dane.')

  if (req.body.gpu) {
    const gpuComponent = await Component.findById(req.body.gpu).select('type amount').exec()
    if (!gpuComponent) throw createError(404, 'Podana karta graficzna nie istnieje.')
    if (gpuComponent.amount <= 0) throw createError(403, 'Podana karta graficzna nie jest aktualnie dostępna.')
  }
  if (req.body.psu) {
    const psuComponent = await Component.findById(req.body.psu).select('type amount').exec()
    if (!psuComponent) throw createError(404, 'Podany zasilacz nie istnieje.')
    if (psuComponent.amount <= 0) throw createError(403, 'Podany zasilacz nie jest aktualnie dostępny.')
  }
  if (req.body.driveOne) {
    const driveOneComponent = await Component.findById(req.body.driveOne).select('type amount').exec()
    if (!driveOneComponent) throw createError(404, 'Podany dysk nie istnieje.')
    if (driveOneComponent.amount <= 0) throw createError(403, 'Podany dysk nie jest aktualnie dostępny.')
  }
  if (req.body.driveTwo) {
    const driveTwoComponent = await Component.findById(req.body.driveTwo).select('type amount').exec()
    if (!driveTwoComponent) throw createError(404, 'Jeden z podanych dysków nie istnieje.')
    if (driveTwoComponent.amount <= 0) throw createError(403, 'Jeden z podanych dysków nie jest aktualnie dostępny.')
  }
  if (req.body.driveThree) {
    const driveThreeComponent = await Component.findById(req.body.driveThree).select('type amount').exec()
    if (!driveThreeComponent) throw createError(404, 'Jeden z podanych dysków nie istnieje.')
    if (driveThreeComponent.amount <= 0) throw createError(403, 'Jeden z podanych dysków nie jest aktualnie dostępny.')
  }

  const newSetup = new Setup({
    addedBy: authenticatedUser.id,
    case: req.body.case,
    cpu: req.body.cpu || null,
    mobo: req.body.mobo || null,
    ram: req.body.ram || null,
    gpu: req.body.gpu || null,
    psu: req.body.psu || null,
    driveOne: req.body.driveOne || null,
    driveTwo: req.body.driveTwo || null,
    driveThree: req.body.driveThree || null,
    description: validationResult.description,
  })

  await newSetup.save()

  return res.status(201).send({ message: 'Dodano nową konfigurację.', setup: newSetup })
}

//PUT - /setups/updateSetup/:id
const updateSetup = async (req, res) => {
  const { authenticatedUser } = res.locals

  const validationResult = await updateSetupValidation.validateAsync({ description: req.body.description || '' })

  const updatedSetup = await Setup.findById(req.params.id).exec()
  if (!updatedSetup) throw createError(404, 'Podana konfiguracja nie istnieje.')

  if (updatedSetup.addedBy.toString() !== authenticatedUser.id)
    throw createError(403, 'Brak uprawnień do edycji podanej konfiguracji.')

  let caseComponent, cpuComponent, moboComponent, ramComponent

  if (!req.body.case) throw createError(422, 'Przesłano błędne dane.')
  caseComponent = await Component.findById(req.body.case).select('type moboCompat amount').exec()
  if (!caseComponent) throw createError(404, 'Podana obudowa nie istnieje.')
  if (caseComponent.amount <= 0) throw createError(403, 'Podana obudowa nie jest aktualnie dostępna.')

  if (req.body.cpu) {
    cpuComponent = await Component.findById(req.body.cpu).select('type cpuCompat ramCompat amount').exec()
    if (!cpuComponent) throw createError(404, 'Podany procesor nie istnieje.')
    if (cpuComponent.amount <= 0) throw createError(403, 'Podany procesor nie jest aktualnie dostępny.')
  }
  if (req.body.mobo) {
    moboComponent = await Component.findById(req.body.mobo).select('type cpuCompat caseCompat ramCompat amount').exec()
    if (!moboComponent) throw createError(404, 'Podana płyta główna nie istnieje.')
    if (moboComponent.amount <= 0) throw createError(403, 'Podana płyta główna nie jest aktualnie dostępna.')
  }
  if (req.body.ram) {
    ramComponent = await Component.findById(req.body.ram).select('type ramCompat amount').exec()
    if (!ramComponent) throw createError(404, 'Podana pamięć RAM nie istnieje.')
    if (ramComponent.amount <= 0) throw createError(403, 'Podana pamięć RAM nie jest aktualnie dostępna.')
  }

  //check compatibility
  if (moboComponent) {
    if (caseComponent.moboCompat === 'matx' && moboComponent.caseCompat === 'atx') createError(422, 'Przesłano błędne dane.')
    if (caseComponent.moboCompat === 'itx' && moboComponent.caseCompat === 'atx') createError(422, 'Przesłano błędne dane.')
    if (caseComponent.moboCompat === 'itx' && moboComponent.caseCompat === 'matx') createError(422, 'Przesłano błędne dane.')
  }
  if (moboComponent && ramComponent && moboComponent.ramCompat !== ramComponent.ramCompat)
    throw createError(422, 'Przesłano błędne dane.')
  if (moboComponent && cpuComponent && moboComponent.cpuCompat !== cpuComponent.cpuCompat)
    throw createError(422, 'Przesłano błędne dane.')
  if (cpuComponent && ramComponent && cpuComponent.ramCompat !== ramComponent.ramCompat)
    throw createError(422, 'Przesłano błędne dane.')

  if (req.body.gpu) {
    const gpuComponent = await Component.findById(req.body.gpu).select('type amount').exec()
    if (!gpuComponent) throw createError(404, 'Podana karta graficzna nie istnieje.')
    if (gpuComponent.amount <= 0) throw createError(403, 'Podana karta graficzna nie jest aktualnie dostępna.')
  }
  if (req.body.psu) {
    const psuComponent = await Component.findById(req.body.psu).select('type amount').exec()
    if (!psuComponent) throw createError(404, 'Podany zasilacz nie istnieje.')
    if (psuComponent.amount <= 0) throw createError(403, 'Podany zasilacz nie jest aktualnie dostępny.')
  }
  if (req.body.driveOne) {
    const driveOneComponent = await Component.findById(req.body.driveOne).select('type amount').exec()
    if (!driveOneComponent) throw createError(404, 'Podany dysk nie istnieje.')
    if (driveOneComponent.amount <= 0) throw createError(403, 'Podany dysk nie jest aktualnie dostępny.')
  }
  if (req.body.driveTwo) {
    const driveTwoComponent = await Component.findById(req.body.driveTwo).select('type amount').exec()
    if (!driveTwoComponent) throw createError(404, 'Jeden z podanych dysków nie istnieje.')
    if (driveTwoComponent.amount <= 0) throw createError(403, 'Jeden z podanych dysków nie jest aktualnie dostępny.')
  }
  if (req.body.driveThree) {
    const driveThreeComponent = await Component.findById(req.body.driveThree).select('type amount').exec()
    if (!driveThreeComponent) throw createError(404, 'Jeden z podanych dysków nie istnieje.')
    if (driveThreeComponent.amount <= 0) throw createError(403, 'Jeden z podanych dysków nie jest aktualnie dostępny.')
  }

  updatedSetup.case = req.body.case
  updatedSetup.cpu = req.body.cpu || null
  updatedSetup.mobo = req.body.mobo || null
  updatedSetup.ram = req.body.ram || null
  updatedSetup.gpu = req.body.gpu || null
  updatedSetup.psu = req.body.psu || null
  updatedSetup.driveOne = req.body.driveOne || null
  updatedSetup.driveTwo = req.body.driveTwo || null
  updatedSetup.driveThree = req.body.driveThree || null
  updatedSetup.description = validationResult.description

  await updatedSetup.save()

  res.status(200).json({ message: 'Zaktualizowano konfigurację.', setup: updatedSetup })
}

//DELETE - /setups/deleteSetup/:id
const deleteSetup = async (req, res) => {
  const { authenticatedUser } = res.locals

  const deletedSetup = await Setup.findById(req.params.id).exec()
  if (!deletedSetup) throw createError(404, 'Podana konfiguracja nie istnieje.')

  if (deletedSetup.addedBy.toString() !== authenticatedUser.id)
    throw createError(403, 'Brak uprawnień do usunięcia podanej konfiguracji.')

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

export {
  getSetups,
  getSetup,
  getLikedSetups,
  likeSetup,
  unlikeSetup,
  createComment,
  getComponents,
  createSetup,
  updateSetup,
  deleteSetup,
}
