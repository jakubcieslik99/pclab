import { Schema, model } from 'mongoose'

const carrierSchema = new Schema(
  { name: { type: String, required: true }, price: { type: Number, required: true } },
  { timestamps: true },
)

const carrierModel = model('Carrier', carrierSchema)

export default carrierModel
