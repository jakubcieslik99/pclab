import createError from 'http-errors'
import { createDirectory, removeDirectory, saveFiles, filterFiles } from '../../functions/manageUploads'
import Component from '../../models/componentModel'
import {
  getComponentsValidation,
  createComponentValidation,
  updateComponentValidation,
} from '../../validations/adminComponentsValidation'

//GET - /admin/components/getComponents
const getComponents = async (req, res) => {
  const page = req.query.page ? req.query.page : 1
  const limit = req.query.limit ? req.query.limit : 15

  let query = {}
  if (req.query.searching) {
    query = { ...query, ...{ title: { $regex: req.query.searching, $options: 'i' } } }
  }
  if (req.query.filtering && req.query.filtering !== 'all') {
    let filtering = []
    req.query.filtering.split(',').forEach(element => filtering.push(element))

    const validationResult = await getComponentsValidation.validateAsync({ filtering })
    if (!validationResult.filtering.includes('all')) query = { ...query, ...{ type: { $in: validationResult.filtering } } }
  }

  let sort = {}
  if (req.query.sorting && req.query.sorting === 'price_highest') sort = { price: -1 }
  else if (req.query.sorting && req.query.sorting === 'price_lowest') sort = { price: 1 }
  else if (req.query.sorting && req.query.sorting === 'amount_highest') sort = { amount: -1 }
  else if (req.query.sorting && req.query.sorting === 'amount_lowest') sort = { amount: 1 }
  else if (req.query.sorting && req.query.sorting === 'oldest') sort = { createdAt: 1 }
  else if (req.query.sorting && req.query.sorting === 'newest') sort = { createdAt: -1 }
  else sort = { createdAt: -1 }

  const count = await Component.find(query).countDocuments().exec()
  const listedComponents = await Component.find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

  return res.status(200).send({ count, components: listedComponents })
}
//GET - /admin/components/getComponent/:id
const getComponent = async (req, res) => {
  const listedComponent = await Component.findById(req.params.id).populate.exec()
  if (!listedComponent) throw createError(404, 'Podany komponent nie istnieje.')

  return res.status(200).send({ component: listedComponent })
}

//POST - /admin/components/createComponent
const createComponent = async (req, res) => {
  const { uploads } = res.locals

  const validationResult = await createComponentValidation.validateAsync({
    title: req.body.title,
    type: req.body.type,
    moboCompat: req.body.moboCompat || '',
    cpuCompat: req.body.cpuCompat || '',
    caseCompat: req.body.caseCompat || '',
    ramCompat: req.body.ramCompat || '',
    url: req.body.url,
    price: req.body.price,
    amount: req.body.amount,
  })

  if (validationResult.type === 'case') {
    if (validationResult.moboCompat === '') throw createError(400, 'Kompatybilność z płytą główną jest wymagana.')
    validationResult.cpuCompat = ''
    validationResult.caseCompat = ''
    validationResult.ramCompat = ''
  } else if (validationResult.type === 'cpu') {
    if (validationResult.cpuCompat === '') throw createError(400, 'Kompatybilność z socketem procesora jest wymagana.')
    if (validationResult.ramCompat === '') throw createError(400, 'Kompatybilność z pamięcią RAM jest wymagana.')
    validationResult.moboCompat = ''
    validationResult.caseCompat = ''
  } else if (validationResult.type === 'mobo') {
    if (validationResult.cpuCompat === '') throw createError(400, 'Kompatybilność z socketem procesora jest wymagana.')
    if (validationResult.caseCompat === '') throw createError(400, 'Kompatybilność z obudową jest wymagana.')
    if (validationResult.ramCompat === '') throw createError(400, 'Kompatybilność z pamięcią RAM jest wymagana.')
    validationResult.moboCompat = ''
  } else if (validationResult.type === 'ram') {
    if (validationResult.ramCompat === '') throw createError(400, 'Kompatybilność z pamięcią RAM jest wymagana.')
    validationResult.moboCompat = ''
    validationResult.cpuCompat = ''
    validationResult.caseCompat = ''
  } else {
    validationResult.moboCompat = ''
    validationResult.cpuCompat = ''
    validationResult.caseCompat = ''
    validationResult.ramCompat = ''
  }

  const newComponent = new Component({
    title: validationResult.title,
    type: validationResult.type,
    moboCompat: validationResult.moboCompat,
    cpuCompat: validationResult.cpuCompat,
    caseCompat: validationResult.caseCompat,
    ramCompat: validationResult.ramCompat,
    url: validationResult.url,
    price: validationResult.price,
    images: [],
  })

  await createDirectory(`components/${newComponent.id}`)
  newComponent.images = await saveFiles(uploads, `components/${newComponent.id}`)

  await newComponent.save()

  return res.status(201).send({ message: 'Dodano nowy komponent.', component: newComponent })
}

//PUT - /admin/components/updateComponent/:id
const updateComponent = async (req, res) => {
  const { modifiedFiles, uploads } = res.locals

  const validationResult = await updateComponentValidation.validateAsync({
    title: req.body.title,
    type: req.body.type,
    moboCompat: req.body.moboCompat || '',
    cpuCompat: req.body.cpuCompat || '',
    caseCompat: req.body.caseCompat || '',
    ramCompat: req.body.ramCompat || '',
    url: req.body.url,
    price: req.body.price,
    amount: req.body.amount,
  })

  const updatedComponent = await Component.findById(req.params.id).exec()
  if (!updatedComponent) throw createError(404, 'Podany komponent nie istnieje.')

  if (validationResult.type === 'case') {
    if (validationResult.moboCompat === '') throw createError(400, 'Kompatybilność z płytą główną jest wymagana.')
    validationResult.cpuCompat = ''
    validationResult.caseCompat = ''
    validationResult.ramCompat = ''
  } else if (validationResult.type === 'cpu') {
    if (validationResult.cpuCompat === '') throw createError(400, 'Kompatybilność z socketem procesora jest wymagana.')
    if (validationResult.ramCompat === '') throw createError(400, 'Kompatybilność z pamięcią RAM jest wymagana.')
    validationResult.moboCompat = ''
    validationResult.caseCompat = ''
  } else if (validationResult.type === 'mobo') {
    if (validationResult.cpuCompat === '') throw createError(400, 'Kompatybilność z socketem procesora jest wymagana.')
    if (validationResult.caseCompat === '') throw createError(400, 'Kompatybilność z obudową jest wymagana.')
    if (validationResult.ramCompat === '') throw createError(400, 'Kompatybilność z pamięcią RAM jest wymagana.')
    validationResult.moboCompat = ''
  } else if (validationResult.type === 'ram') {
    if (validationResult.ramCompat === '') throw createError(400, 'Kompatybilność z pamięcią RAM jest wymagana.')
    validationResult.moboCompat = ''
    validationResult.cpuCompat = ''
    validationResult.caseCompat = ''
  } else {
    validationResult.moboCompat = ''
    validationResult.cpuCompat = ''
    validationResult.caseCompat = ''
    validationResult.ramCompat = ''
  }

  updatedComponent.title = validationResult.title
  updatedComponent.type = validationResult.type
  updatedComponent.moboCompat = validationResult.moboCompat
  updatedComponent.cpuCompat = validationResult.cpuCompat
  updatedComponent.caseCompat = validationResult.caseCompat
  updatedComponent.ramCompat = validationResult.ramCompat
  updatedComponent.url = validationResult.url
  updatedComponent.price = validationResult.price
  updatedComponent.amount = validationResult.amount

  updatedComponent.images = await filterFiles(modifiedFiles, uploads, `components/${updatedComponent.id}`)

  await updatedComponent.save()

  return res.status(200).send({ message: 'Zaktualizowano komponent.', component: updatedComponent })
}

//DELETE - /admin/components/deleteComponent/:id
const deleteComponent = async (req, res) => {
  const deletedComponent = await Component.findById(req.params.id).exec()
  if (!deletedComponent) throw createError(404, 'Podany komponent nie istnieje.')

  //find and delete every setup containing deleted component

  await removeDirectory(`components/${deletedComponent.id}`)

  await deletedComponent.remove()

  return res.status(200).send({ message: 'Usunięto komponent.' })
}

export { getComponents, getComponent, createComponent, updateComponent, deleteComponent }
