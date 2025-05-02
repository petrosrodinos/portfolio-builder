import { createClient } from "@/lib/supabase/client";
import { SupabaseTables } from "@/constants/supabase";
import { AffiliateLink } from "@/interfaces/affiliate";
import { generateCode } from "@/lib/utils";
const supabase = createClient();

export const createAffiliateCode = async (user_id: string): Promise<AffiliateLink> => {
    try {
        const code = generateCode();
        const { data, error } = await supabase
            .from(SupabaseTables.affiliate_links)
            .insert({ user_id: user_id, code })
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

export const getAffiliateCode = async (user_id: string): Promise<AffiliateLink> => {
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



