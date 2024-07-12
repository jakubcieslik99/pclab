import { Schema, model } from 'mongoose'

const orderedComponentSchema = new Schema(
  {
    componentId: { type: Schema.Types.ObjectId, ref: 'Component', required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    moboCompat: { type: String, default: '' },
    cpuCompat: { type: String, default: '' },
    caseCompat: { type: String, default: '' },
    ramCompat: { type: String, default: '' },
    url: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
  },
  { _id: false },
)

const selectedCarrierSchema = new Schema(
  {
    carrier: { type: Schema.Types.ObjectId, ref: 'Carrier', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tracking: { type: String, default: '' },
  },
  { _id: false },
)

const shippingDetailsSchema = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    addresTwo: { type: String },
    postal: { type: String, required: true },
    city: { type: String, required: true },
  },
  { _id: false },
)

const orderSchema = new Schema(
  {
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderedSetup: { type: Schema.Types.ObjectId, ref: 'Setup', required: true },
    orderedComponents: [orderedComponentSchema],
    componentsPrice: { type: Number, required: true },
    selectedCarrier: selectedCarrierSchema,
    shippingDetails: shippingDetailsSchema,
    totalPrice: { type: Number, required: true },
    paymentTime: { type: Number, required: true },
    paymentIntent: { type: String, required: true },
    status: { type: String, default: 'unpaid' }, // unpaid / paying / canceled / awaiting / sent / returned
  },
  {
    timestamps: true,
  },
)

const orderModel = model('Order', orderSchema)

export default orderModel
