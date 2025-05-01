'use server';

import Stripe from 'stripe';
import { stripe } from '../../lib/stripe/config';
import { toDateTime } from '@/lib/utils';
import { createAdminClient } from '@/lib/supabase/admin';
import { SupabaseTables } from '@/constants/supabase';


const supabaseAdmin = await createAdminClient();


const upsertCustomerToSupabase = async (uuid: string, customerId: string) => {
    const { error: upsertError } = await supabaseAdmin
        .from(SupabaseTables.customers)
        .upsert([{ user_id: uuid, stripe_customer_id: customerId }], {
            onConflict: 'user_id'
        });

    if (upsertError)
        throw new Error(`Supabase customer record creation failed: ${upsertError.message}`);

    return customerId;
};

const createCustomerInStripe = async (uuid: string, email: string) => {
    const customerData = { metadata: { supabaseUUID: uuid }, email: email };
    const newCustomer = await stripe.customers.create(customerData);
    if (!newCustomer) throw new Error('Stripe customer creation failed.');

    return newCustomer.id;
};

const createOrRetrieveCustomer = async ({
    email,
    uuid
}: {
    email: string;
    uuid: string;
}) => {
    // Check if the customer already exists in Supabase
    const { data: existingSupabaseCustomer, error: queryError } =
        await supabaseAdmin
            .from(SupabaseTables.customers)
            .select('*')
            .eq('user_id', uuid)
            .limit(1);

    let customer = existingSupabaseCustomer?.[0];


    if (queryError) {
        throw new Error(`Supabase customer lookup failed: ${queryError.message}`);
    }

    // Retrieve the Stripe customer ID using the Supabase customer ID, with email fallback
    let stripeCustomerId: string | undefined;
    if (customer?.stripe_customer_id) {
        const existingStripeCustomer = await stripe.customers.retrieve(
            customer.stripe_customer_id
        );
        stripeCustomerId = existingStripeCustomer.id;
    } else {
        // If Stripe ID is missing from Supabase, try to retrieve Stripe customer ID by email
        const stripeCustomers = await stripe.customers.list({ email: email });
        stripeCustomerId =
            stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : undefined;
    }

    // If still no stripeCustomerId, create a new customer in Stripe
    const stripeIdToInsert = stripeCustomerId
        ? stripeCustomerId
        : await createCustomerInStripe(uuid, email);
    if (!stripeIdToInsert) throw new Error('Stripe customer creation failed.');

    if (customer && stripeCustomerId) {
        // If Supabase has a record but doesn't match Stripe, update Supabase record
        if (customer.stripe_customer_id !== stripeCustomerId) {
            const { error: updateError } = await supabaseAdmin
                .from(SupabaseTables.customers)
                .update({ stripe_customer_id: stripeCustomerId })
                .eq('user_id', uuid);

            if (updateError)
                throw new Error(
                    `Supabase customer record update failed: ${updateError.message}`
                );
            console.warn(
                `Supabase customer record mismatched Stripe ID. Supabase record updated.`
            );
        }
        // If Supabase has a record and matches Stripe, return Stripe customer ID
        return stripeCustomerId;
    } else {
        console.warn(
            `Supabase customer record was missing. A new record was created.`
        );

        // If Supabase has no record, create a new record and return Stripe customer ID
        const upsertedStripeCustomer = await upsertCustomerToSupabase(
            uuid,
            stripeIdToInsert
        );
        if (!upsertedStripeCustomer)
            throw new Error('Supabase customer record creation failed.');

        return upsertedStripeCustomer;
    }
};


const manageSubscriptionStatusChange = async (
    subscriptionId: string,
    customerId: string,
    createAction = false
) => {
    // Get customer's UUID from mapping table.
    const { data: customerData, error: noCustomerError } = await supabaseAdmin
        .from(SupabaseTables.customers)
        .select('user_id')
        .eq('stripe_customer_id', customerId)
        .single();

    if (noCustomerError)
        throw new Error(`Customer lookup failed: ${noCustomerError.message}`);

    const { user_id: uuid } = customerData!;

    const subscription: any = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['default_payment_method']
    });
    console.log('subscription', subscription);
    // Upsert the latest status of the subscription object.
    const subscriptionData: any = {
        subscription_id: subscription.id,
        user_id: uuid,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
        cancel_at_period_end: subscription.cancel_at_period_end,
        cancel_at: toDateTime(subscription.cancel_at),
        canceled_at: toDateTime(subscription.canceled_at),
        current_period_start: toDateTime(subscription?.current_period_start ?? 0),
        current_period_end: toDateTime(subscription?.current_period_end ?? 0),
        created: toDateTime(subscription.created),
        ended_at: toDateTime(subscription.ended_at),
        trial_start: toDateTime(subscription.trial_start),
        trial_end: toDateTime(subscription.trial_end),
    };

    const { error: upsertError } = await supabaseAdmin
        .from(SupabaseTables.subscriptions)
        .upsert([subscriptionData], {
            onConflict: 'user_id'
        });
    if (upsertError)
        throw new Error(`Subscription insert/update failed: ${upsertError.message}`);
    console.log(
        `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
    );

};


const copyBillingDetailsToCustomer = async (
    uuid: string,
    payment_method: Stripe.PaymentMethod
) => {
    const customer = payment_method.customer as string;
    const { name, phone, address } = payment_method.billing_details;
    if (!name || !phone || !address) return;
    await stripe.customers.update(customer, { name, phone, address });
    const { error: updateError } = await supabaseAdmin
        .from(SupabaseTables.users)
        .update({
            billing_address: { ...address },
            payment_method: { ...payment_method[payment_method.type] }
        })
        .eq('user_id', uuid);
    if (updateError) throw new Error(`Customer update failed: ${updateError.message}`);
};

export {
    createOrRetrieveCustomer,
    manageSubscriptionStatusChange
};
