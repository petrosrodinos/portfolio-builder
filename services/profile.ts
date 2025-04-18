import { supabase } from "@/lib/supabase";
import { SupabaseTables, SupabaseBuckets } from "@/constants/supabase";
import { uploadFile, deleteFile } from "./storage";
import { PortfolioProfileBio, UpdatePortfolioProfileBio, PortfolioResume } from "interfaces/portfolio";

export const upsertProfile = async (user_id: string, payload: UpdatePortfolioProfileBio): Promise<PortfolioProfileBio> => {
    try {
        let resume = payload.resume as PortfolioResume;

        console.log('payload', payload);

        if (payload.resume_to_delete) {
            await deleteFile(SupabaseBuckets.files, payload.resume_to_delete.name);
        }

        if (payload.resume && !('url' in payload.resume)) {
            resume = await uploadFile(SupabaseBuckets.files, payload.resume as File, user_id, 'resume');
        }

        delete payload.resume_to_delete;
        const { error, data } = await supabase
            .from(SupabaseTables.profiles)
            .upsert({
                ...payload, user_id, resume
            }, { onConflict: 'user_id' })


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