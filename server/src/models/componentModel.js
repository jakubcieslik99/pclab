import { Schema, model } from 'mongoose'

const componentSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    moboCompat: { type: String, default: '' },
    cpuCompat: { type: String, default: '' },
    caseCompat: { type: String, default: '' },
    ramCompat: { type: String, default: '' },
    url: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    images: [{ type: String }],
  },
  {
    timestamps: true,
  },
)

const componentModel = model('Component', componentSchema)

export default componentModel
