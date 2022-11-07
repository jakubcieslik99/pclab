import { Schema, model } from 'mongoose'

const commentSchema = new Schema(
  {
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const setupSchema = new Schema(
  {
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    case: { type: Schema.Types.ObjectId, ref: 'Component', required: true },
    cpu: { type: Schema.Types.ObjectId, ref: 'Component' },
    mobo: { type: Schema.Types.ObjectId, ref: 'Component' },
    ram: { type: Schema.Types.ObjectId, ref: 'Component' },
    gpu: { type: Schema.Types.ObjectId, ref: 'Component' },
    psu: { type: Schema.Types.ObjectId, ref: 'Component' },
    driveOne: { type: Schema.Types.ObjectId, ref: 'Component' },
    driveTwo: { type: Schema.Types.ObjectId, ref: 'Component' },
    driveThree: { type: Schema.Types.ObjectId, ref: 'Component' },
    description: { type: String },
    likes: { type: Number, default: 0 },
    comments: [commentSchema],
    bought: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

const setupModel = model('Setup', setupSchema)

export default setupModel
