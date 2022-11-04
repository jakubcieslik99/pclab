import { Schema, model } from 'mongoose'

const refreshTokenSchema = new Schema(
  {
    refreshToken: { type: String, required: true },
    expirationDate: { type: Date, required: true },
  },
  { _id: false }
)

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    nick: { type: String, required: true },
    password: { type: String, required: true },
    likedSetups: [{ type: Schema.Types.ObjectId, ref: 'Setup' }],
    isAdmin: { type: Boolean, default: false },
    token: { type: String /* | null*/ },
    confirmed: { type: Boolean, default: false },
    refreshTokens: [refreshTokenSchema],
  },
  {
    timestamps: true,
  }
)

const userModel = model('User', userSchema)

export default userModel
