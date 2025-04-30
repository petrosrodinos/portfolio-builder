'use server';

import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { calculateTrialEndUnixTimestamp, getURL } from '@/lib/utils';
import { createOrRetrieveCustomer } from './web_hooks';
import { stripe } from '@/lib/stripe/config';


export async function checkoutWithStripe(
  price: any,
  redirectPath: string
): Promise<string> {
  try {

    const supabase = await createClient();
    const {
      error,
      data: { user }
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error(error);
      throw new Error('Could not get user session.');
    }

    let customer: string;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user?.id || '',
        email: user?.email || ''
      });
    } catch (err) {
      console.error(err);
      throw new Error('Unable to access customer record.');
    }

    let params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer,
      customer_update: {
        address: 'auto'
      },
      line_items: [
        {
          price: price.price_id,
          quantity: 1
        }
      ],
      mode: 'subscription',
      subscription_data: {
        trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days)
      },
      cancel_url: getURL(redirectPath),
      success_url: getURL(redirectPath)
    };

    let session;
    try {
      session = await stripe.checkout.sessions.create(params);
    } catch (err) {
      console.error(err);
      throw new Error('Unable to create checkout session.');
    }

    if (session) {
      return session.id;
    } else {
      throw new Error('Unable to create checkout session.');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred.');
    };
  }
}

export async function createStripePortal(returnUrl: string) {
  try {
    const supabase = await createClient();
    const {
      error,
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      if (error) {
        console.error(error);
      }
      throw new Error('Could not get user session.');
    }

    let customer;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user.id || '',
        email: user.email || ''
      });
    } catch (error) {
      console.error(error);
      throw new Error('Unable to access customer record.');
    }


    if (!customer) {
      throw new Error('Could not get customer.');
    }

    try {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer,
        return_url: getURL(returnUrl)
      });
      if (!portalSession) {
        throw new Error('Could not create billing portal');
      }
      return portalSession.url;
    } catch (error) {
      console.error("ERROR 1", error);
      throw new Error('Could not create billing portal');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
