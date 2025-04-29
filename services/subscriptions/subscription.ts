import { createClient } from "@/lib/supabase/client";
import { cache } from "react";

const supabase = createClient();

export const getSubscription = cache(async () => {
    const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .maybeSingle();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return subscription;
});

export const getProducts = cache(async () => {
    const { data: products, error } = await supabase
        .from('products')
        .select('*, prices(*)')
        .eq('active', true)
        .eq('prices.active', true)
        .order('metadata->index')
        .order('unit_amount', { referencedTable: 'prices' });

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return products;
});