import { supabase } from "@/lib/supabase";
import { SupabaseTables, SupabaseBuckets } from "@/constants/supabase";
import { uploadFile } from "./storage";
import { PortfolioProfileBio } from "interfaces/portfolio";

export const upsertProfile = async (user_id: string, payload: PortfolioProfileBio): Promise<PortfolioProfileBio> => {
    try {
        let fileUrl = payload.resume as string;

        if (payload.resume && typeof payload.resume !== 'string') {
            fileUrl = await uploadFile(SupabaseBuckets.files, payload.resume as File, user_id, 'resume');
        }

        const { error, data } = await supabase
            .from(SupabaseTables.profiles)
            .upsert({ ...payload, user_id, resume: fileUrl }, { onConflict: 'user_id' })


        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error updating user', error);
        throw error;
    }
}

export const getProfile = async (user_id: string): Promise<PortfolioProfileBio> => {
    try {
        const { data, error } = await supabase
            .from(SupabaseTables.profiles)
            .select('*')
            .eq('user_id', user_id)
            .single();

        if (error) {
            throw error;
        }

        return data;


    } catch (error) {
        // console.error('Error getting profile', error);
        throw error;
    }
}