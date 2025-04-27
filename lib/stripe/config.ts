import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
  {
    // @ts-ignore
    apiVersion: null,
    appInfo: {
      name: 'Portfolio-Builder',
      version: '0.0.1',
      url: 'https://github.com/petrosrodinos/portfolio-builder'
    }
  }
);
