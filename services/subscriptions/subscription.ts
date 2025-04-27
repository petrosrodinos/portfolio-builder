// 'use server';

import { createClient } from "@/lib/supabase/client";
// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";
import { cache } from "react";

// const createClient = async () => {
//     const cookieStore = await cookies()

//     return createServerClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//         {
//             cookies: {
//                 getAll() {
//                     return cookieStore.getAll()
//                 },
//                 setAll(cookiesToSet) {
//                     try {
//                         cookiesToSet.forEach(({ name, value, options }) =>
//                             cookieStore.set(name, value, options)
//                         )
//                     } catch {

//                     }
//                 },
//             },
//         }
//     )
// }

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