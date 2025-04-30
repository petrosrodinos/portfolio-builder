'use server';

import { cache } from "react";
import { createAdminClient } from '@/lib/supabase/admin';
import { TRIAL_PERIOD_DAYS } from '@/constants/index';
import Stripe from "stripe";
import { SupabaseTables } from "@/constants/supabase";


const supabaseAdmin = await createAdminClient();

export const upsertProductRecord = async (product: Stripe.Product) => {
    const productData: any = {
        product_id: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? null,
        image: product.images?.[0] ?? null,
        // metadata: product.metadata
    };

    const { error: upsertError } = await supabaseAdmin
        .from(SupabaseTables.products)
        .upsert([productData], {
            onConflict: 'product_id'
        });
    if (upsertError)
        throw new Error(`Product insert/update failed: ${upsertError.message}`);
    console.log(`Product inserted/updated: ${product.id}`);
};

export const upsertPriceRecord = async (
    price: Stripe.Price,
    retryCount = 0,
    maxRetries = 3
) => {
    const priceData: any = {
        price_id: price.id,
        product_id: typeof price.product === 'string' ? price.product : '',
        active: price.active,
        currency: price.currency,
        type: price.type,
        unit_amount: price.unit_amount ?? null,
        interval: price.recurring?.interval ?? null,
        interval_count: price.recurring?.interval_count ?? null,
        trial_period_days: price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS
    };

    const { error: upsertError } = await supabaseAdmin
        .from(SupabaseTables.prices)
        .upsert([priceData], {
            onConflict: 'price_id'
        });

    if (upsertError?.message.includes('foreign key constraint')) {
        if (retryCount < maxRetries) {
            console.log(`Retry attempt ${retryCount + 1} for price ID: ${price.id}`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await upsertPriceRecord(price, retryCount + 1, maxRetries);
        } else {
            throw new Error(
                `Price insert/update failed after ${maxRetries} retries: ${upsertError.message}`
            );
        }
    } else if (upsertError) {
        throw new Error(`Price insert/update failed: ${upsertError.message}`);
    } else {
        console.log(`Price inserted/updated: ${price.id}`);
    }
};

export const deleteProductRecord = async (product: Stripe.Product) => {
    const { error: deletionError } = await supabaseAdmin
        .from(SupabaseTables.products)
        .delete()
        .eq('product_id', product.id);
    if (deletionError)
        throw new Error(`Product deletion failed: ${deletionError.message}`);
    console.log(`Product deleted: ${product.id}`);
};

export const deletePriceRecord = async (price: Stripe.Price) => {
    const { error: deletionError } = await supabaseAdmin
        .from(SupabaseTables.prices)
        .delete()
        .eq('price_id', price.id);
    if (deletionError) throw new Error(`Price deletion failed: ${deletionError.message}`);
    console.log(`Price deleted: ${price.id}`);
};

export const getSubscription = cache(async (userId: string) => {
    const { data: subscription, error } = await supabaseAdmin
        .from(SupabaseTables.subscriptions)
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return subscription;
});

export const getProducts = cache(async () => {
    const { data: products, error } = await supabaseAdmin
        .from(SupabaseTables.products)
        .select('*, prices(*)')
        .eq('active', true)
        .eq('prices.active', true)
        .order('unit_amount', { referencedTable: 'prices' });

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return products;
});