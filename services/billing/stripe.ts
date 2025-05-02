'use server';

import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { calculateTrialEndUnixTimestamp, getURL } from '@/lib/utils';
import { createOrRetrieveCustomer } from './web_hooks';
import { stripe } from '@/lib/stripe/config';
import { PUBLIC_SITE_URL, TRIAL_PERIOD_DAYS } from '@/constants/index';
import { SupabaseTables } from '@/constants/supabase';


export async function checkoutWithStripe(
  price_id: string,
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
      metadata: {
        user_id: user?.id || '',
        email: user?.email || '',
      },
      customer_update: {
        address: 'auto'
      },
      line_items: [
        {
          price: price_id,
          quantity: 1
        }
      ],
      mode: 'subscription',
      subscription_data: {
        trial_end: calculateTrialEndUnixTimestamp(TRIAL_PERIOD_DAYS)
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

export async function createCustomerInStripe(uuid: string, email: string) {
  const customerData = { metadata: { supabaseUUID: uuid }, email: email };
  const newCustomer = await stripe.customers.create(customerData);
  if (!newCustomer) throw new Error('Stripe customer creation failed.');

  return newCustomer.id;
};

export async function createAccountInStripeAndOnboard(user_id: string, email: string, stripe_account_id?: string) {

  const supabase = await createClient();

  let accountExist;
  if (stripe_account_id) {
    accountExist = await getAccount(stripe_account_id);
  }

  if (accountExist) {
    const loginLink = await stripe.accounts.createLoginLink(stripe_account_id);
    return { account_id: accountExist.id, account_link: loginLink.url };
  }

  const account = await stripe.accounts.create({
    type: 'express',
    email: email,
    capabilities: {
      transfers: { requested: true },
    },
  });

  const { error } = await supabase
    .from(SupabaseTables.affiliate_links)
    .upsert({ user_id, stripe_account_id: account.id }, { onConflict: 'user_id' })

  if (error) {
    throw error;
  }

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${PUBLIC_SITE_URL}/console/affiliate`,
    return_url: `${PUBLIC_SITE_URL}/console/affiliate`,
    type: 'account_onboarding',
  });

  return { account_id: account.id, account_link: accountLink.url };
};


export async function getAccount(account_id: string) {
  const account = await stripe.accounts.retrieve(account_id);
  return account;
}

export async function getAccountLoginLink(stripe_account_id: string): Promise<string | null> {
  const loginLink = await stripe.accounts.createLoginLink(stripe_account_id);

  return loginLink?.url;
}

export async function hasFinishedOnboarding(account_id: string): Promise<boolean> {
  const account = await getAccount(account_id);
  return account.charges_enabled && account.payouts_enabled;
}

export async function createTransfer(account_id: string, amount: number) {
  const transfer = await stripe.transfers.create({
    amount: amount,
    currency: 'usd',
    destination: account_id,
  });

  return transfer;
}

