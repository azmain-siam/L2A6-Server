/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import config from "../config";

const stripe = new Stripe(config.stripe_secret as string);

const stripeCheckout = async (lineItems: any, transactionId: string) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${config.client_url}/payment/success?session_id={CHECKOUT_SESSION_ID}&transactionId=${transactionId}`,
    cancel_url: `${config.client_url}/payment/error?session_id={CHECKOUT_SESSION_ID}&transactionId=${transactionId}`,
  });
  return session.id;
};

// const stripeSession = async () => {
//   const session = await stripe.checkout.sessions.retrieve(
//     "cs_test_b1wu957UZbZAo6ylALi1US7zJwrbzFhewirzupZP7oo66nNmx2M6zVGtkp"
//   );
// };

// stripeSession();

export default stripeCheckout;
