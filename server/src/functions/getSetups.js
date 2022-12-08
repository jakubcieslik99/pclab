const setupsAggregation = (priceFrom, priceTo) => {
  return [
    { $lookup: { from: 'components', localField: 'case', foreignField: '_id', as: 'case' } },
    { $unwind: { path: '$case', preserveNullAndEmptyArrays: true } },
    { $lookup: { from: 'components', localField: 'cpu', foreignField: '_id', as: 'cpu' } },
    { $unwind: { path: '$cpu', preserveNullAndEmptyArrays: true } },
    { $lookup: { from: 'components', localField: 'mobo', foreignField: '_id', as: 'mobo' } },
    { $unwind: { path: '$mobo', preserveNullAndEmptyArrays: true } },
    { $lookup: { from: 'components', localField: 'ram', foreignField: '_id', as: 'ram' } },
    { $unwind: { path: '$ram', preserveNullAndEmptyArrays: true } },
    { $lookup: { from: 'components', localField: 'gpu', foreignField: '_id', as: 'gpu' } },
    { $unwind: { path: '$gpu', preserveNullAndEmptyArrays: true } },
    { $lookup: { from: 'components', localField: 'psu', foreignField: '_id', as: 'psu' } },
    { $unwind: { path: '$psu', preserveNullAndEmptyArrays: true } },
    { $lookup: { from: 'components', localField: 'driveOne', foreignField: '_id', as: 'driveOne' } },
    { $unwind: { path: '$driveOne', preserveNullAndEmptyArrays: true } },
    { $lookup: { from: 'components', localField: 'driveTwo', foreignField: '_id', as: 'driveTwo' } },
    { $unwind: { path: '$driveTwo', preserveNullAndEmptyArrays: true } },
    { $lookup: { from: 'components', localField: 'driveThree', foreignField: '_id', as: 'driveThree' } },
    { $unwind: { path: '$driveThree', preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        price: {
          $sum: [
            '$case.price',
            '$cpu.price',
            '$mobo.price',
            '$ram.price',
            '$gpu.price',
            '$psu.price',
            '$driveOne.price',
            '$driveTwo.price',
            '$driveThree.price',
          ],
        },
      },
    },
    {
      $match: {
        price: {
          $gte: !isNaN(parseInt(priceFrom)) ? parseInt(priceFrom) : 0,
          $lte: !isNaN(parseInt(priceTo)) ? parseInt(priceTo) : 999999,
        },
      },
    },
    { $project: { _id: 1 } },
  ]
}

const setupsPriceComparision = (a, b, sorting) => {
  let aPrice = a.case.price
  a.cpu && (aPrice += a.cpu.price)
  a.mobo && (aPrice += a.mobo.price)
  a.ram && (aPrice += a.ram.price)
  a.gpu && (aPrice += a.gpu.price)
  a.psu && (aPrice += a.psu.price)
  a.driveOne && (aPrice += a.driveOne.price)
  a.driveTwo && (aPrice += a.driveTwo.price)
  a.driveThree && (aPrice += a.driveThree.price)

  let bPrice = b.case.price
  b.cpu && (bPrice += b.cpu.price)
  b.mobo && (bPrice += b.mobo.price)
  b.ram && (bPrice += b.ram.price)
  b.gpu && (bPrice += b.gpu.price)
  b.psu && (bPrice += b.psu.price)
  b.driveOne && (bPrice += b.driveOne.price)
  b.driveTwo && (bPrice += b.driveTwo.price)
  b.driveThree && (bPrice += b.driveThree.price)

  if (sorting === 'price_lowest') return aPrice < bPrice ? -1 : 1
  else if (sorting === 'price_highest') return bPrice < aPrice ? -1 : 1
  else return 0
}

export { setupsAggregation, setupsPriceComparision }
