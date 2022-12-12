import Stripe from 'stripe'
import { config } from './utilities'

const stripe = new Stripe(config.STRIPE_SECRET)

export default stripe
