import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const { STRIPE_SECRET_KEY } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY);

export default stripe;
