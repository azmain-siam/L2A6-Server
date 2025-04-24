/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import config from "../config";

const stripe = new Stripe(config.stripe_secret as string);

const stripeCheckout = async (lineItems: any) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://dashboard.stripe.com/",
    cancel_url: "https://dashboard.stripe.com/",
  });
  return session.id;
};

export default stripeCheckout;
