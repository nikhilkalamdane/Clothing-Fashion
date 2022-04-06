import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51Kl9c8SC6KF99ceIIsZ2cLP6lOcxMNcRbHB0FUx0FcQjA9LGgNQ2x821WgnJMjQoOLRtPlMrJekfeIU289Gav0t300j2J4ZcpK"
);

// process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
