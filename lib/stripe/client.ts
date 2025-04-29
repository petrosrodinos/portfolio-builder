import { loadStripe, Stripe as StripeJs } from '@stripe/stripe-js';

let stripePromise: Promise<StripeJs | null>;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
            ''
        );
    }

    return stripePromise;
};