import { createClient } from "@/lib/supabase/client";
import { cache } from "react";

const supabase = createClient();

export const getSubscription = cache(async () => {
    const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .maybeSingle();

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

    return products;
});