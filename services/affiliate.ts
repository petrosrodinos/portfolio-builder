import { createClient } from "@/lib/supabase/client";
import { SupabaseTables } from "@/constants/supabase";
import { AffiliateCode, UpsertAffiliateCode, ReferredUser } from "@/interfaces/affiliate";
import { generateCode } from "@/lib/utils";

const supabase = createClient();

export async function createAffiliateCode(payload: UpsertAffiliateCode): Promise<AffiliateCode> {
    try {
        const code = generateCode();

        const { data, error } = await supabase
            .from(SupabaseTables.affiliate_links)
            .upsert({ ...payload, code }, { onConflict: 'user_id' })
            .select('*')
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error creating affiliate link', error);
        throw error;
    }
};

export const getAffiliateCode = async (user_id: string): Promise<AffiliateCode> => {
    try {
        const { data, error } = await supabase
            .from(SupabaseTables.affiliate_links)
            .select('*')
            .eq('user_id', user_id)
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        // console.error('Error getting affiliate code', error);
        throw error;
    }
};

export async function getAffiliateCodeByCode(code: string): Promise<AffiliateCode> {
    try {
        const { data, error } = await supabase
            .from(SupabaseTables.affiliate_links)
            .select('*')
            .eq('code', code)
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error getting affiliate code', error);
        throw error;
    }
};

export async function getReferredUsers(user_id: string): Promise<ReferredUser[]> {
    try {
        const { data, error } = await supabase
            .from(SupabaseTables.referred_users)
            .select('*,users!referred_users_user_id_fkey(full_name,email,subscriptions(*,prices(*,products(*))))')
            .eq('referal_user_id', user_id);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error getting user referred users', error);
        throw error;
    }
}

export async function getAllReferredUsers(): Promise<Record<string, ReferredUser[]>> {
    try {
        const { data, error } = await supabase
            .from(SupabaseTables.referred_users)
            .select(`
                *,
                users!referred_users_user_id_fkey(full_name,email,subscriptions(*,prices(*,products(*)))),
                referrer:users!referred_users_referal_user_id_fkey(full_name,email)
            `);

        if (error) {
            throw error;
        }

        const groupedData = data.reduce((acc, user) => {
            const key = user.referal_user_id;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(user);
            return acc;
        }, {} as Record<string, ReferredUser[]>);

        return groupedData;
    } catch (error) {
        console.error('Error getting all referred users', error);
        throw error;
    }
}