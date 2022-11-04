import { Schema, model } from 'mongoose'

const componentSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    moboCompat: { type: String, required: true, default: '' },
    cpuCompat: { type: String, required: true, default: '' },
    caseCompat: { type: String, required: true, default: '' },
    ramCompat: { type: String, required: true, default: '' },
    url: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
)

const componentModel = model('Component', componentSchema)

export default componentModel
